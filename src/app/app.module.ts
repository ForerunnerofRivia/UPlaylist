import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ParallaxDirective } from './parallax.directive';
import { PresentationContainerComponent } from './presentation-container/presentation-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http'; 
import { OAuthModule } from 'angular-oauth2-oidc';
import { GoogleConnectionComponent } from './google-connection/google-connection.component';
import { YToSpotComponent } from './y-to-spot/y-to-spot.component';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ParallaxDirective,
    PresentationContainerComponent,
    GoogleConnectionComponent,
    YToSpotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
