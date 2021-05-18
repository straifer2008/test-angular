import {ElementRef, Inject, Injectable} from '@angular/core';
import { NAVIGATOR } from '../interfaces/nav.interface';
import {BehaviorSubject, from, Observable, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {MediaRecordingOptions} from '../../shared/interfaces/recording.interfeace';
import { logger } from 'codelyzer/util/logger';

@Injectable()
export class RecorderService {
  private mediaStream: MediaStream;
  private mediaOptions: MediaRecordingOptions = {
    video: true,
    audio: true,
    cursor: 'never',
    frameRate: 40,
  };
  private mediaRecorder: any;
  public recordingStatus: BehaviorSubject<'recording' | 'paused' | 'stopped' | 'loading'> = new BehaviorSubject('stopped');

  constructor(
    @Inject(NAVIGATOR) private navigator: Navigator,
  ) {}

  private static getBlob(data: any[]): Blob {
    return new Blob(data, { type : this.getVideoFormatByBrowser() });
  }

  private static downloadFile(chunks: any[], fileName?: string): void {
    const blob: Blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName || 'test.webm';
    a.click();
    window.URL.revokeObjectURL(url);
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

  private mediaDevicesList(): Promise<[]> {
    // @ts-ignore
    return this.navigator.mediaDevices.enumerateDevices().then(console.log);
  }

  private setVideoStreamToVideoRef(video: ElementRef, stream: MediaStream): void {
    if (video && video.nativeElement) {
      video.nativeElement.srcObject = stream;
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
        this.recordingStatus.next('stopped');
        resolve(blob);
      };
      this.mediaRecorder.onerror = event => reject(event.name);
    });

    return from(promise);
  }

  public record(video?: ElementRef, options?: MediaRecordingOptions): Observable<Blob> {
    this.recordingStatus.next('loading');
    return from(this.navigator.mediaDevices.getUserMedia({...this.mediaOptions, ...options}))
      .pipe(
        tap(() => this.recordingStatus.next('recording')),
        switchMap((stream) => this.setStream(stream, video)),
        catchError(({message}) => {
          this.recordingStatus.next('stopped');
          return throwError(message);
        }),
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
