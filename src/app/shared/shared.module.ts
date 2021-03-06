import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import {ModalService} from './services/modal.service';
import { VideoRecorderComponent } from './components/video-recorder/video-recorder.component';
import {FormsModule} from '@angular/forms';
import {RecorderService} from './services/recorder.service';



@NgModule({
  declarations: [
    ModalComponent,
    VideoRecorderComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ],
  providers: [
    ModalService,
    RecorderService,
  ],
  exports: [
      ModalComponent,
      VideoRecorderComponent
  ]
})
export class SharedModule { }
