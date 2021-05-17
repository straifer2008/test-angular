import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RecorderService} from '../../../dashboard/services/recorder.service';
import {ModalService} from '../../services/modal.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.scss']
})
export class VideoRecorderComponent implements OnInit, OnDestroy {
  @ViewChild('videoRef') videoRef: ElementRef;
  public errorText = 'Some error';
  public recordingStatus: BehaviorSubject<'recording' | 'paused' | 'stopped' | 'loading'> = this.recorderService.recordingStatus;
  private subscription: Subscription = new Subscription();
  public src: SafeUrl;
  public viewClass = 'collapsed';
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
    this.subscription.add(this.recorderService.record(this.videoRef).subscribe(
      (blob) => this.src = this.setFileUrls(blob),
      (error) => this.showErrorModal(error)
    ));
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
