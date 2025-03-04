import { Routes } from '@angular/router';
import { CalendarPage } from './pages/calendar/calendar.page';
import { ListTurnosComponent } from './pages/list-turnos/list-turnos.component';
import { ProfesionalesComponent } from './pages/profesionales/profesionales.component';

export const routes: Routes = [

    {path: '', component: CalendarPage},
    {path: 'home', component: CalendarPage},
    {path: 'listTurnos', component: ListTurnosComponent},
    {path: 'profesionales', component: ProfesionalesComponent},
    {path: '**', component: CalendarPage }
];
