import { Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ListTurnosComponent } from './pages/list-turnos/list-turnos.component';
import { ProfesionalesComponent } from './pages/profesionales/profesionales.component';

export const routes: Routes = [

    {path: 'home', component: CalendarComponent},
    {path: 'listTurnos', component: ListTurnosComponent},
    {path: 'profesionales', component: ProfesionalesComponent},
    {path: '**', component: CalendarComponent }
];
