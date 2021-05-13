import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }
}
