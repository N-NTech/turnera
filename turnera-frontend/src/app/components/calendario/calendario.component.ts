import { ChangeDetectorRef, Component, computed, effect, input, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput, DateInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

class EventInputCustom implements EventInput {
  id?: string | undefined;
  title?: string | undefined;
  start?: DateInput | undefined;
  end?: DateInput | undefined;
  profesional?: string;
}

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export let INITIAL_EVENTS: EventInputCustom[] = [
  {
    id: createEventId(),
    title: 'Instalacion aire acondicionado',
    start: TODAY_STR,
    profesional: 'Juan Perez',
  },
  {
    id: createEventId(),
    title: 'Corte y confeccion',
    start: TODAY_STR + 'T09:00:00',
    end: TODAY_STR + 'T11:00:00',
    profesional: 'Maria Rodriguez',
  },
  {
    id: createEventId(),
    title: 'Uñas y esmaltado',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00',
    profesional: 'Juan Perez',
  }
];

export function createEventId() {
  return String(eventGuid++);
}


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'], 
})

export class CalendarioComponent {
  profesionales = input<string[]>([]);

  private events = computed(() => {
    if (this.profesionales().length === 0) {
      return INITIAL_EVENTS;
    }
    return INITIAL_EVENTS.filter(event => 
      this.profesionales().includes(event.profesional || '')
    );
  });

  calendarVisible = signal(true);
  calendarOptions = computed<CalendarOptions>(() => ({
    locale: esLocale,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    events: this.events(), // Usamos directamente el computed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    themeSystem: 'standard',
  }));

  constructor(private changeDetector: ChangeDetectorRef) {}

  currentEvents = signal<EventApi[]>([]);


  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); 
  }
}
