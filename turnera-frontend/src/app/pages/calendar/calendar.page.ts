import { Component, Signal, WritableSignal } from '@angular/core';
import { CalendarioComponent } from '../../components/calendario/calendario.component';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, computed, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-calendar',
  imports: [CalendarioComponent, MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, FormsModule],
  templateUrl: './calendar.page.html',
  styleUrl: './calendar.page.scss'
})
export class CalendarPage {

  currentDate: WritableSignal<Date> = signal(new Date());
  currentView: WritableSignal<string> = signal("dayGridMonth");

  onDateChange(newDate: Date) {
    this.currentDate.set(newDate);
  }


  readonly currentProfesional = model('');
  readonly profesionales = signal<string[]>([]);
  readonly allProfesionales: string[] = ['Juan Perez', 'Maria Rodriguez', 'Lucas Mandela'];
  readonly filteredProfesionales = computed(() => {
    const currentProfesional = this.currentProfesional().toLowerCase();
    return currentProfesional
      ? this.allProfesionales.filter(prof => prof.toLowerCase().includes(currentProfesional))
      : this.allProfesionales.slice();
  });

  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.profesionales.update(profs => [...profs, value]);
    }

    // Clear the input value
    this.currentProfesional.set(' ');
  }

  remove(profesional: string): void {
    this.profesionales.update(profs => {
      const index = profs.indexOf(profesional);
      if (index < 0) {
        return profs;
      }

      profs.splice(index, 1);
      this.announcer.announce(`Removed ${profesional}`);
      return [...profs];
    });
  }

  selected(event: MatAutocompleteSelectedEvent, input: any): void {

    this.profesionales.update(profs => [...profs, event.option.viewValue]);
    this.currentProfesional.set('');
    input.value = '';
    event.option.deselect();
  }
}
