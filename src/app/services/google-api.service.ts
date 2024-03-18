import { Injectable } from '@angular/core';
import googleConnection from '../../assets/client_secret_.json';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import {  HttpClient } from '@angular/common/http';

export interface PlaylistResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  items: Playlist[];
}

export interface Playlist {
  kind: string;
  etag: string;
  id: string;
  snippet: PlaylistSnippet;
}

export interface PlaylistSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  localized: Localized;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Localized {
  title: string;
  description: string;
}
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
  scope: 'openid profile email https://www.googleapis.com/auth/youtube.readonly',
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
            console.log("google-api.service(loggedInSubject):True");
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

  getUserPlaylists(): Observable<Playlist[]> {
    const accessToken = this.oauthservice.getAccessToken();
    //console.log("Access token:"+ accessToken +" Granted Scopes: "+this.oauthservice.getGrantedScopes());
    const url = 'https://www.googleapis.com/youtube/v3/playlists';
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    const params = {
      part: 'snippet',
      mine: true,
    };
  
    return this.httpClient.get<PlaylistResponse>(url, { headers, params }).pipe(
      map(response => response.items),
      catchError(error => {
        console.error("CUSTOM ERROR: "+error);
        return of([]);
      })
    );
  }

  getPlaylistVideo(){}
  


}
