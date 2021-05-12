import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, switchMap, catchError, tap} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {authErrorAction, getTokenAction, loginAction, setUserAction} from './auth.actions';
import {AuthService} from '../services/login.service';
import {Router} from '@angular/router';
import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class AuthEffects {
  login$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(getTokenAction),
    switchMap(({email, password}) => this.authService.login({ email, password }).pipe(
      map(loginAction),
      catchError(({ message }: HttpErrorResponse) => of(authErrorAction({ message })))
    ))
  ));

  getLoggedUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({ token }) => this.authService.getUser(token)
      .pipe(
        map(setUserAction),
        catchError(({ message }: HttpErrorResponse) => of(authErrorAction({ message })))
      )
    ),
    tap((action) => this.router.navigate(['/'])),
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
  }
}
