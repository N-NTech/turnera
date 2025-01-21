import { Component } from '@angular/core';
import { CalendarioComponent } from '../../components/calendario/calendario.component';

@Component({
  selector: 'app-calendar',
  imports: [CalendarioComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
