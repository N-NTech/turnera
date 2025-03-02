import { Component, signal } from '@angular/core';
import { CalendarioComponent } from '../../components/calendario/calendario.component';

@Component({
  selector: 'app-list-turnos',
  imports: [CalendarioComponent],
  templateUrl: './list-turnos.component.html',
  styleUrl: './list-turnos.component.scss'
})
export class ListTurnosComponent {

  profesionales = signal(['Juan Perez', 'Maria Rodriguez', 'Lucas Mandela']);

}
