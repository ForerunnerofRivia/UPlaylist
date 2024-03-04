import { Component } from '@angular/core';
import { GoogleAPIService, UserInfo } from '../services/google-api.service';

@Component({
  selector: 'app-google-connection',
  templateUrl: './google-connection.component.html',
  styleUrls: ['./google-connection.component.scss']
})
export class GoogleConnectionComponent {
  isloggedin: boolean = false;
  userInfo?: UserInfo;
  playlists: string[] = [];

  constructor(private gAPI: GoogleAPIService){
    gAPI.userProfileSubject.subscribe( info => {
      this.userInfo = info;
    })

    gAPI.startConnection();
    
    
  }
  ngOnInit(): void {
    this.gAPI.loggedIn$.subscribe((loggedIn: boolean) => {
      this.isloggedin = loggedIn;
      if(this.isloggedin){
        window.close();
      }   
    });
  }

  isLoggedIn(): boolean{
    return this.gAPI.isLoggedIn();
  }

  logout() {
    this.gAPI.signOut();
  }
}
