import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import {ModalService} from './services/modal.service';
import { VideoRecorderComponent } from './components/video-recorder/video-recorder.component';



@NgModule({
  declarations: [
    ModalComponent,
    VideoRecorderComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ModalService
  ],
    exports: [
        ModalComponent,
        VideoRecorderComponent
    ]
})
export class SharedModule { }
