import { Component } from '@angular/core';
import { GoogleAPIService } from '../services/google-api.service';
import {Playlist} from '../services/google-api.service';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-youtubeplaylistview',
  templateUrl: './youtubeplaylistview.component.html',
  styleUrls: ['./youtubeplaylistview.component.scss']
})
export class YoutubeplaylistviewComponent {
  isGoogleloggedin: boolean = false;
  playlists: Playlist[] = [];
  constructor(private gAPI: GoogleAPIService){
  }

  ngOnInit(): void {
    this.gAPI.getUserPlaylists().subscribe((playlists) => {
      this.playlists = playlists;
    });
  }

  
}
