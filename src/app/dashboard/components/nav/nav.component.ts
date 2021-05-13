import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() navClick: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public menuClick(menuItem: any): void {
    this.navClick.emit(menuItem);
  }
}
