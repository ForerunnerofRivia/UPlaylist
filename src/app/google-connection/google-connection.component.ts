import { Component, OnInit } from '@angular/core';
import { GoogleAPIService, UserInfo } from '../services/google-api.service';

@Component({
  selector: 'app-google-connection',
  templateUrl: './google-connection.component.html',
  styleUrls: ['./google-connection.component.scss']
})
export class GoogleConnectionComponent implements OnInit {
  isloggedin: boolean = false;
  userInfo?: UserInfo;
  playlists: string[] = [];

  constructor(private gAPI: GoogleAPIService){

  }

  ngOnInit(): void {
    this.gAPI.userProfileSubject.subscribe( info => {
      this.userInfo = info;
    })
    this.gAPI.loggedIn$.subscribe((loggedIn: boolean) => {
      this.isloggedin = loggedIn;
      console.log("Value of "+this.isloggedin);
      if(this.isloggedin){
        //send message to ytospot on the other window
        console.log("Sending message to ytospot");
        window.opener.postMessage({ type: 'CONN_STATUS', data: true }, '*');
        //log and close this winfow
        console.log("User logged in, closing window");
        window.close();
      }   
    });
    this.gAPI.startConnection();
  }

  isLoggedIn(): boolean{
    return this.gAPI.isLoggedIn();
  }

  logout() {
    this.gAPI.signOut();
  }
}
