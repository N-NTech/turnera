import { Component, signal, WritableSignal } from '@angular/core';
import { CalendarioComponent } from '../../components/calendario/calendario.component';

@Component({
  selector: 'app-list-turnos',
  imports: [CalendarioComponent],
  templateUrl: './list-turnos.component.html',
  styleUrl: './list-turnos.component.scss'
})
export class ListTurnosComponent {

  profesionales = signal(['Juan Perez', 'Maria Rodriguez', 'Lucas Mandela']);
  currentView: WritableSignal<string> = signal('listDay');
  currentDate: WritableSignal<Date> = signal(new Date());

  onDateChange(newDate: Date) {
    this.currentDate.set(newDate);
  }

  onViewChange(newView: string) {
    this.currentView.set(newView);
  }

}
