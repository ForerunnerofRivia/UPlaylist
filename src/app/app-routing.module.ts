import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GoogleConnectionComponent } from './google-connection/google-connection.component';
import { YToSpotComponent } from './y-to-spot/y-to-spot.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'googleLogin', component: GoogleConnectionComponent},
  { path: 'ytospot', component: YToSpotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
