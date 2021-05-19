import {ElementRef, Inject, Injectable} from '@angular/core';
import {NAVIGATOR} from '../interfaces/nav.interface';
import {BehaviorSubject, from, Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {MediaRecordingOptions} from '../../shared/interfaces/recording.interfeace';

@Injectable()
export class RecorderService {
  private mediaRecorder: any;
  private mediaStream: MediaStream;
  private defaultOptions: MediaRecordingOptions = {video: true, audio: true, cursor: 'never', frameRate: 40};
  public recordingStatus: BehaviorSubject<'recording' | 'paused' | 'stopped' | 'loading'> = new BehaviorSubject('stopped');

  constructor(@Inject(NAVIGATOR) private navigator: Navigator) {}

  private static getBlob(data: any[]): Blob {
    return new Blob(data, {type: this.getVideoFormatByBrowser()});
  }

  private static getVideoFormatByBrowser(): string {
    let format = 'video/mp4';
    const browsers = navigator.userAgent.toLowerCase();

    if (browsers.indexOf('safari') !== -1) {
      if (browsers.indexOf('chrome') > -1) {
        format = 'video/webm';
      } else {
        format = 'video/mp4';
      }
    }

    return format;
  }

  private setVideoStreamToVideoRef(video: ElementRef, stream: MediaStream): void {
    if (video && video.nativeElement) {
      video.nativeElement.srcObject = stream;
      video.nativeElement.muted = true;
      video.nativeElement.onloadedmetadata = () => video.nativeElement.play();
    }
  }

  private setStream(stream: MediaStream, video?: ElementRef): Observable<Blob> {
    const data = [];
    const options = {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      mimeType: RecorderService.getVideoFormatByBrowser()
    };
    this.mediaStream = stream;
    // @ts-ignore
    this.mediaRecorder = new MediaRecorder(stream, options);
    this.mediaRecorder.ondataavailable = (e) => data.push(e.data);
    this.mediaRecorder.start();
    this.setVideoStreamToVideoRef(video, stream);

    const promise: Promise<Blob> = new Promise((resolve, reject) => {
      this.mediaRecorder.onstop = () => {
        const blob = RecorderService.getBlob(data);
        video.nativeElement.srcObject = null;
        video.nativeElement.muted = false;
        this.recordingStatus.next('stopped');
        resolve(blob);
      };
      this.mediaRecorder.onerror = event => reject(event.name);
    });

    return from(promise);
  }

  private mergeAudioFromMic(videoStream: MediaStream, options: MediaRecordingOptions): Observable<MediaStream> {
    if (options?.audio) {
      return from(this.navigator.mediaDevices.getUserMedia({audio: true, video: false})).pipe(
        map((audioStream) => {
          const [videoTrack] = videoStream.getVideoTracks();
          const [audioTrack] = audioStream.getAudioTracks();

          videoStream.addTrack(audioTrack);
          this.mediaStream = new MediaStream([videoTrack, audioTrack]);

          return this.mediaStream;
        })
      );
    } else {
      return of(videoStream);
    }
  }

  public record(video?: ElementRef, options?: MediaRecordingOptions): Observable<Blob> {
    const recordingOptions = {...this.defaultOptions, ...options};
    this.recordingStatus.next('loading');

    return from(this.navigator.mediaDevices.getUserMedia(recordingOptions))
      .pipe(
        tap(() => this.recordingStatus.next('recording')),
        switchMap((stream) => this.setStream(stream, video)),
        catchError(({message}) => {
          this.recordingStatus.next('stopped');
          return throwError(message);
        }),
      );
  }

  public recordScreen(video?: ElementRef, options?: MediaRecordingOptions): Observable<Blob> {
    const recordingOptions = {...this.defaultOptions, ...options};
    this.recordingStatus.next('loading');
    // @ts-ignore
    return from(this.navigator.mediaDevices.getDisplayMedia(recordingOptions))
      .pipe(
        tap(() => this.recordingStatus.next('recording')),
        switchMap((stream: MediaStream) => this.mergeAudioFromMic(stream, recordingOptions)),
        switchMap((screenStream: MediaStream) => this.setStream(screenStream, video)),
        catchError(({message}) => {
          this.recordingStatus.next('stopped');
          return throwError(message);
        })
      );
  }

  public stop(): MediaStream {
    if (!this.mediaRecorder) {
      return null;
    }

    this.mediaRecorder?.stop();
    this.getStream()?.getTracks().forEach((track) => {
      track.stop();
    });

    return this.mediaStream;
  }

  // @ts-ignore
  public togglePlay(): MediaRecorder {
    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder.pause();
    } else if (this.mediaRecorder?.state === 'paused') {
      this.mediaRecorder.resume();
    }

    this.recordingStatus.next(this.mediaRecorder?.state);
    return this.mediaRecorder;
  }

  public getStream(): MediaStream {
    if (!this.mediaStream) {
      console.log('ERROR: mediaStream not exist');
    }

    return this.mediaStream;
  }
}
