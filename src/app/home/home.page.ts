import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent , IonList, IonItem, IonThumbnail, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonIcon} from '@ionic/angular/standalone';
import { DataapiService } from '../dataapi.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,],
})
export class HomePage {
  constructor() {}

  
  
}
