import { Component, OnInit } from '@angular/core';
import { GoogleAPIService, UserInfo } from '../services/google-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-connection',
  templateUrl: './google-connection.component.html',
  styleUrls: ['./google-connection.component.scss']
})
export class GoogleConnectionComponent implements OnInit {
  isloggedin: boolean = false;
  userInfo?: UserInfo;
  playlists: string[] = [];

  constructor(private gAPI: GoogleAPIService, private router: Router){

  }

  ngOnInit(): void {
    this.gAPI.userProfileSubject.subscribe( info => {
      this.userInfo = info;
    })
    this.gAPI.loggedIn$.subscribe((loggedIn: boolean) => {
      this.isloggedin = loggedIn;
      console.log("google-connection(this.isloggedin):"+this.isloggedin);
      if(this.isloggedin){
        this.router.navigate(['/ytospot']);
      }
    });
    this.gAPI.startConnection();
  }
}
