import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import {MatRippleModule} from '@angular/material/core';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatListModule, 
    RouterLink,
    MatRippleModule
  
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}
