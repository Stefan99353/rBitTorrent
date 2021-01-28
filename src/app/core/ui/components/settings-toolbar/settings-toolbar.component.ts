import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings-toolbar',
  templateUrl: './settings-toolbar.component.html',
  styleUrls: ['./settings-toolbar.component.scss']
})
export class SettingsToolbarComponent implements OnInit {
  settingsChanged = false;

  @Input() saveActive = false;
  @Output() save = new EventEmitter<void>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.save.emit();
  }

  back(): void {
    this.router.navigate(['home'], {skipLocationChange: true});
  }
}
