import {Component, OnInit} from '@angular/core';
import {addSpeeddialAnimations} from './add-speed-dial.animations';
import {MatDialog} from '@angular/material/dialog';
import {AddUrlTorrentsDialogComponent} from '../../dialogs/add-url-torrents-dialog/add-url-torrents-dialog.component';
import {AddFileTorrentsDialogComponent} from '../../dialogs/add-file-torrents-dialog/add-file-torrents-dialog.component';

export enum TogglerState {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
}

@Component({
  selector: 'app-add-speed-dial',
  templateUrl: './add-speed-dial.component.html',
  styleUrls: ['./add-speed-dial.component.scss'],
  animations: addSpeeddialAnimations
})
export class AddSpeedDialComponent {

  fabButtons = [
    {
      icon: 'note_add',
      action: 'file'
    },
    {
      icon: 'link',
      action: 'url'
    },

  ];
  buttons: any[] = [];
  fabTogglerState = TogglerState.INACTIVE;

  constructor(
    private dialog: MatDialog
  ) {
  }

  handleAction(action: string): void {
    switch (action) {
      case 'file': {
        this.dialog.open(AddFileTorrentsDialogComponent, {
          width: '700px'
        });
        break;
      }
      case 'url': {
        this.dialog.open(AddUrlTorrentsDialogComponent, {
          width: '700px'
        });
        break;
      }
    }

    this.onToggleFab();
  }

  showItems(): void {
    this.fabTogglerState = TogglerState.ACTIVE;
    this.buttons = this.fabButtons;
  }

  hideItems(): void {
    this.fabTogglerState = TogglerState.INACTIVE;
    this.buttons = [];
  }

  onToggleFab(): void {
    this.buttons.length ? this.hideItems() : this.showItems();
  }
}
