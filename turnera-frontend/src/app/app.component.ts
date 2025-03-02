import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { SidenavComponentNew } from './sidenav/sidenav.component';
import { HammerModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterModule,SidenavComponentNew, HammerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'turnera-frontend';
}
