import { Component } from '@angular/core';
import { GoogleAPIService } from '../services/google-api.service';

@Component({
  selector: 'app-youtubeplaylistview',
  templateUrl: './youtubeplaylistview.component.html',
  styleUrls: ['./youtubeplaylistview.component.scss']
})
export class YoutubeplaylistviewComponent {
  userPlaylist: any;
  constructor(private gAPI: GoogleAPIService){
  }


  
}
