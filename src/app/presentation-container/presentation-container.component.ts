import {Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { GoogleAPIService } from '../services/google-api.service';



@Component({
  selector: 'app-presentation-container',
  templateUrl: './presentation-container.component.html',
  styleUrls: ['./presentation-container.component.scss'],
})

export class PresentationContainerComponent {
  @Input() imgpath!: string;
  @Input() imgpath2! : string;
  @Input() title!: string;

  constructor(private gAPI: GoogleAPIService){}

}
