import { Component, OnInit } from '@angular/core';
import {ModalService} from '../shared/services/modal.service';
import {AuthService} from '../auth/services/login.service';
import { NavInterfaceItem } from './interfaces/nav.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public menus: NavInterfaceItem[] = [
    {
      id: 1,
      text: 'File',
      children: [
        { id: 11, text: 'Settings', link: '/settings' },
        { id: 12, text: 'Account', link: '/account' },
        {
          id: 13,
          text: 'Logout',
          callback: () => this.modalService.open( 'logoutModal')
        },
      ]
    },
    {
      id: 2,
      text: 'Pages',
      children: [
        { id: 11, text: 'Dashboard', link: '/' },
        { id: 12, text: 'Statistics', link: '/statistics' },
      ]
    }
  ];

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
