import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss']
})
export class AuthInputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() name?: string;
  @Input() id?: string;
  @Input() label?: string;
  @Input() error?: string;
  @Input() className?: string;
  @Input() type = 'text';
  public inputInFocus: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
