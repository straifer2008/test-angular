import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecorderService } from '../../services/recorder.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  public stream: SafeUrl;
  constructor(
    public recorderService: RecorderService,
  ) { }

  ngOnInit(): void {
  }

  onRecord(): void {
    this.recorderService.record().subscribe((mediaRecorder) => {
      this.stream = mediaRecorder.stream;
    });
  }
}
