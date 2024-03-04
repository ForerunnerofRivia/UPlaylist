import { Component } from '@angular/core';
import { GoogleAPIService } from '../services/google-api.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule, ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-y-to-spot',
  templateUrl: './y-to-spot.component.html',
  styleUrls: ['./y-to-spot.component.scss']
})
export class YToSpotComponent {
  isGoogleloggedin: boolean = false;
  constructor(private gAPI: GoogleAPIService){}

  ngOnInit(): void {
    this.gAPI.loggedIn$.subscribe((loggedIn: boolean) => {
      this.isGoogleloggedin = loggedIn;
    });
  }

  onGoogleLoginBtnClick(){
    window.open(window.location.origin+'/googleLogin',"Ratting","width=550,height=700,toolbar=0,status=0,");
  }
  
  isGoogleLoggedIn(): boolean{
    return this.gAPI.isLoggedIn();
  }

  isSpotifyLoggedIn(): boolean{
    return false;
  }
  
  onSpotifyLoginBtnClick(){

  }

  
}
