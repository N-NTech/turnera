import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { SidenavComponentNew } from './sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule,SidenavComponentNew],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'turnera-frontend';
}
