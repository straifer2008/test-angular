import {Component, Input, OnInit, Optional} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss']
})
export class AuthInputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() type = 'text';
  @Input() @Optional() name?: string;
  @Input() @Optional() id?: string;
  @Input() @Optional() label?: string;
  @Input() @Optional() error?: string;
  @Input() @Optional() className?: string;
  public inputInFocus: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
