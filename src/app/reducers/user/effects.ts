import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthFakeService} from '../../shared/services/auth-fake.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {UserActions} from './actions';
import {EMPTY} from 'rxjs';
import {IRegister} from '../../shared/interfaces/auth';

@Injectable()
export class UserEffects {
  userLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loginUser.type),
      mergeMap((data: IRegister) => this.authFakeService.login(data)
        .pipe(
          map((user) => UserActions.loginUserSuccess(user)),
          catchError(e => EMPTY),
        ))
    );
  });

  constructor(
    private actions$: Actions,
    private authFakeService: AuthFakeService
  ) {
  }
}
