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
  classNames?: string[] | undefined;
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
  allDay?: boolean | undefined;
  profesional?: string;
  cliente?: string;
  display?: string | undefined;
  className?: (string | string[]) | undefined;
}

function getBackgroundColorByProfesional(profesional: string) {
  let output = ''
  switch (profesional) {
    case 'Juan Perez':
      output = 'red';
      break;
    case 'Maria Rodriguez':
      output = 'green';
      break;
    case 'Lucas Mandela':
      output = 'blue';
      break;
    default:
      output = 'gray';
  }

  return output
}

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const TOMORROW_STR = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of tomorrow

export let INITIAL_EVENTS: EventInputCustom[] = [
  {
    id: createEventId(),
    title: 'Instalacion aire acondicionado',
    start: TODAY_STR + 'T16:00:00',
    end: TODAY_STR + 'T20:00:00',
    profesional: 'Juan Perez',
    cliente: 'Lucia Lucero',
    backgroundColor: getBackgroundColorByProfesional("Juan Perez"),
    display: 'block',
  },
  {
    id: createEventId(),
    title: 'Corte y confeccion',
    start: TODAY_STR + 'T09:00:00',
    end: TODAY_STR + 'T11:00:00',
    profesional: 'Maria Rodriguez',
    cliente: 'Nicolas Arcamone',
    backgroundColor: getBackgroundColorByProfesional("Maria Rodriguez"),
    display: 'block',

  },
  {
    id: createEventId(),
    title: 'Uñas y esmaltado',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00',
    profesional: 'Juan Perez',
    cliente: 'Evelyn Gorria',
    backgroundColor: getBackgroundColorByProfesional("Juan Perez"),
    display: 'block',
  },
  {
    id: createEventId(),
    title: 'Prueba de sonido',
    start: TODAY_STR + 'T11:00:00',
    end: TODAY_STR + 'T12:00:00',
    profesional: 'Lucas Mandela',
    cliente: 'Pablos Lopes',
    backgroundColor: getBackgroundColorByProfesional("Lucas Mandela"),
    display: 'block',
  },
  {
    id: createEventId(),
    title: 'Prueba de imagen',
    start: TODAY_STR + 'T11:00:00',
    end: TODAY_STR + 'T12:00:00',
    profesional: 'Maria Rodriguez',
    cliente: 'Dina Choque',
    display: 'block',
  },
  {
    id: createEventId(),
    title: 'Evento dia siguiente',
    start: TOMORROW_STR + 'T11:00:00',
    end: TOMORROW_STR + 'T12:00:00',
    profesional: 'Maria Rodriguez',
    cliente: 'Dina Choque',
    display: 'block',
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
    themeSystem: 'bootstrap5',
    //eventBorderColor: 'black', // Tambien altera el "punto" de la agenda
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
    displayEventTime: false, //No muestra la hora del evento
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
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
