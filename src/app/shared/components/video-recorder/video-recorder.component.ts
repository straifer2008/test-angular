import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ModalService} from '../../services/modal.service';
import {RecorderService} from '../../services/recorder.service';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.scss']
})
export class VideoRecorderComponent implements OnInit, OnDestroy {
  @ViewChild('videoRef') videoRef: ElementRef;
  private subscription: Subscription = new Subscription();
  public errorText = 'Some error';
  public showSettings: boolean;
  public src: SafeUrl;
  public recordingOptions: { audio: boolean; recordingScreen: boolean; } = { audio: true, recordingScreen: false };
  public viewClass: 'collapsed' | 'expanded' | 'default' = 'collapsed';
  public recordingStatus: BehaviorSubject<'recording' | 'paused' | 'stopped' | 'loading'> = this.recorderService.recordingStatus;
  constructor(
    private recorderService: RecorderService,
    private modalService: ModalService,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onRecord(): void {
    if (this.recordingOptions.recordingScreen) {
      this.subscription.add(this.recorderService.recordScreen(this.videoRef, {audio: this.recordingOptions.audio}).subscribe(
        (blob) => this.src = this.setFileUrls(blob),
        (error) => this.showErrorModal(error)
      ));
    } else {
      this.subscription.add(this.recorderService.record(this.videoRef, {audio: this.recordingOptions.audio}).subscribe(
        (blob) => this.src = this.setFileUrls(blob),
        (error) => this.showErrorModal(error)
      ));
    }
  }

  public onStop(): void {
    this.recorderService.stop();
  }

  public togglePause(): void {
    this.recorderService.togglePlay();
  }

  public removeFile(): void {
    this.src = this.videoRef.nativeElement.src = null;
  }

  private showErrorModal(err: string): void {
    const modalId = 'RecorderError';
    this.errorText = err.toString();
    this.modalService.open(modalId);
  }

  private setFileUrls(url: Blob): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(url));
  }
}
