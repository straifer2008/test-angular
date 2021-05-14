import { Inject, Injectable } from '@angular/core';
import { NAVIGATOR } from '../interfaces/nav.interface';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare var MediaRecorder: any;

@Injectable()
export class RecorderService {
  private mediaStream: MediaStream;
  private mediaOptions: {} = {
    video: true,
    audio: false,
    cursor: 'never',
    frameRate: 40,
  };
  private mediaRecorder: any;
  private chunks: BlobPart[] = [];
  private blob: any;
  private fileUrl: string;

  constructor(
    @Inject(NAVIGATOR) private navigator: Navigator,
  ) {}

  public record(): Observable<any> {
    return from(this.navigator.mediaDevices.getUserMedia(this.mediaOptions))
      .pipe(map((stream) => this.setStream(stream)));
  }

  public stop(): MediaStream {
    this.mediaRecorder.stop();
    this.mediaStream?.getTracks().forEach((track) => {
      track.stop();
    });

    return this.mediaStream;
  }

  public togglePlay(): void {
    if (this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
      console.log('PAUSE');
    } else if (this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
      console.log('RESUME');
    }
  }

  public getStream(): MediaStream {
    if (!this.mediaStream) {
      console.log('ERROR: mediaStream not exist');
    }

    return this.mediaStream;
  }

  private setStream(stream: MediaStream): any {
    this.mediaStream = stream;
    this.mediaRecorder = new MediaRecorder(this.mediaStream);
    this.mediaRecorder.start();

    this.mediaRecorder.ondataavailable = ({ data }) => {
      this.chunks.push(data);
    };

    this.mediaRecorder.onstop = () => {
      this.blob = new Blob(this.chunks, { type : 'video/webm; codecs=vp9' });
      this.chunks = [];
      this.fileUrl = URL.createObjectURL(this.blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = this.fileUrl;
      a.download = `${Date.now()}.webm`;
      a.click();
      window.URL.revokeObjectURL(this.fileUrl);
    };

    return this.mediaRecorder;
  }
}
