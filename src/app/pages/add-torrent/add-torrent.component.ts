import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-torrent',
  templateUrl: './add-torrent.component.html',
  styleUrls: ['./add-torrent.component.scss']
})
export class AddTorrentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigate(['home'], {skipLocationChange: true});
  }
}
