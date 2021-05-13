import { Component, OnInit } from '@angular/core';
import {ModalService} from '../shared/services/modal.service';
import {AuthService} from '../auth/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public modalService: ModalService,
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }
}
