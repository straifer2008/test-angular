import {Component, Input, OnInit, Optional} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {authErrorAction} from '../../store/auth.actions';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  @Input() @Optional() error?: Observable<string>;
  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  clearError(): void {
    this.store$.dispatch(authErrorAction({ message: null }));
  }
}
