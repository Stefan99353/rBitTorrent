import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SidenavService} from '../../../services/sidenav/sidenav.service';

@Component({
  selector: 'app-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.scss']
})
export class HomeToolbarComponent implements OnInit {

  @Input() enableActions = false;

  @Output() resumeTorrents = new EventEmitter<void>();
  @Output() pauseTorrents = new EventEmitter<void>();
  @Output() deleteTorrents = new EventEmitter<void>();

  constructor(public sidenavService: SidenavService) {
  }

  ngOnInit(): void {
  }

}
