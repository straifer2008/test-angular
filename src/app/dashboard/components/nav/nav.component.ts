import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavInterfaceItem } from '../../interfaces/nav.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() menus: NavInterfaceItem[];
  constructor() { }

  ngOnInit(): void {
  }
}
