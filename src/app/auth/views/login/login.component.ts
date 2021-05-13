import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {getTokenAction, loginAction} from '../../store/auth.actions';
import {LoginInterface} from '../../interfaces/login.interface';
import {getAuthErrorSelector} from '../../store/auth.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('eve.holt@reqres.in', [Validators.email, Validators.required]),
    password: new FormControl('cityslicka', [Validators.required])
  });
  public viewClass: 'expanded' | 'collapsed' | 'default' = 'default';
  public error: Observable<string> = this.store$.select(getAuthErrorSelector);

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  public onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return null;
    }

    const { email, password }: LoginInterface = form.value;

    this.store$.dispatch(getTokenAction({ email, password }));
  }
}
