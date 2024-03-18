import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GoogleConnectionComponent } from './google-connection/google-connection.component';
import { YToSpotComponent } from './y-to-spot/y-to-spot.component';
import { YoutubeplaylistviewComponent } from './youtubeplaylistview/youtubeplaylistview.component';
import { IsConnectedGuard } from './is-connected-guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'googleLogin', component: GoogleConnectionComponent},
  { path: 'ytospot', component: YToSpotComponent},
  { path: 'playlistview', component: YoutubeplaylistviewComponent, canActivate: [IsConnectedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
