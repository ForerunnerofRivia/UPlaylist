import { Injectable } from '@angular/core';
import googleConnection from '../../assets/client_secret_.json';
import { AuthConfig, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';


export interface Web {
  client_id: string
  project_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_secret: string
  redirect_uris: string[]
  javascript_origins: string[]
}
export interface Root {
  web: Web
}

export interface UserInfo {
  info: {
    sub: string,
    email: string,
    name: string,
    picture: string
  }
}

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: googleConnection.web.redirect_uris[0],
  clientId: googleConnection.web.client_id,
  scope: 'openid profile email https://www.googleapis.com/auth/youtube',
  responseType: 'token id_token',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh',
  silentRefreshTimeout: 5000,
  timeoutFactor: 0.75,
  sessionChecksEnabled: true,
  showDebugInformation: true,
  clearHashAfterLogin: true,
  nonceStateSeparator: 'semicolon', // Real semicolon gets mangled by IdentityServer's URI encoding
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAPIService {
  loggedInSubject: Subject<boolean> = new Subject<boolean>();
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
  playlists: any[] = [];
  userProfileSubject = new Subject<UserInfo>();
  googleCon:Root = googleConnection;
  oauthservice:OAuthService;

  constructor(private readonly oAuthService:OAuthService, private httpClient: HttpClient) { 
    this.oauthservice=oAuthService;
  }

  startConnection(){
    this.oauthservice.configure(oAuthConfig);
    this.oauthservice.loadDiscoveryDocument().then(()=>{
      this.oauthservice.tryLoginImplicitFlow().then(()=>{
        if(!this.oauthservice.hasValidAccessToken()){
          this.oauthservice.initLoginFlow()
        } else {
          this.oauthservice.loadUserProfile().then((userProfile) => {
            
            this.userProfileSubject.next(userProfile as UserInfo);
            this.loggedInSubject.next(true);
          })
        }
      })
    })
  }

  
  isLoggedIn(){
    return this.oauthservice.hasValidAccessToken();
  }

  signOut(){
    this.oauthservice.logOut();
  }

  getPlaylists(){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.oauthservice.getAccessToken()}`);
    this.httpClient.get<any>('https://www.googleapis.com/youtube/v3/playlists', { headers }).subscribe(
      playlists => {
        this.playlists = playlists.items;
        console.log(this.playlists);
      },
      error => {
        console.error('Failed to load playlists', error);
      }
    );
  }

  getSongsOfPlaylists(){

  
  }
}
