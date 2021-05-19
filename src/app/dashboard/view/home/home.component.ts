import { Component, OnInit } from '@angular/core';
import {UserInterface} from '../../../auth/interfaces/login.interface';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getUserSelector} from '../../../auth/store/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: Observable<UserInterface> = this.store$.select(getUserSelector);
  constructor(private store$: Store) { }

  ngOnInit(): void {
  }
}
