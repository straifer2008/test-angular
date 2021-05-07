import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';
import {Subscription} from 'rxjs';
import {AuthFakeService} from '../../services/auth-fake.service';
import {IUser, IUserAuth0} from '../../interfaces/auth';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent implements OnInit, OnDestroy {
  public user: IUserAuth0;
  public fakeUser: IUser;
  public loading: boolean;
  private subscriptions: Subscription = new Subscription();
  public fakeLoginForm = new FormGroup({
    email: new FormControl('eve.holt@reqres.in', [Validators.required, Validators.email]),
    password: new FormControl('cityslicka', [Validators.required, Validators.min(4)]),
  });

  constructor(
    public auth: AuthService,
    private fakeAuth: AuthFakeService,
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.auth.user$.subscribe((profile: IUserAuth0) => this.user = profile));
    const token = this.fakeAuth.getToken();

    if (token) {
      this.subscriptions.add(this.fakeAuth.getUser(token).subscribe((user) => this.fakeUser = user));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public login(): void {
    this.auth.loginWithRedirect();
  }

  public logout(): void {
    this.auth.logout({
      returnTo: this.doc.location.origin
    });
  }

  public fakeLogin(): void {
    if (this.fakeLoginForm.valid) {
      this.loading = true;
      this.subscriptions.add(this.fakeAuth.login(this.fakeLoginForm.value)
        .subscribe(
          (user) => this.fakeUser = user,
          (err) => { console.error(err); this.fakeUser = null; },
          () => this.loading = false
        )
      );
    }
  }

  public fakeLogout(): void {
    this.fakeAuth.logout();
    this.fakeUser = null;
  }
}
