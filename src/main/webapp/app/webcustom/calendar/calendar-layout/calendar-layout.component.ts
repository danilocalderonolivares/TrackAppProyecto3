import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from './colors';
import { ITarea } from 'app/shared/model/tarea.model';
import { TareaService } from 'app/entities/tarea/tarea.service';
import { JhiAlertService } from 'ng-jhipster';

import { SERVER_API_URL } from 'app/app.constants';

function getTimezoneOffsetString(date: Date): string {
    const timezoneOffset = date.getTimezoneOffset();
    const hoursOffset = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(2, '0');
    const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    const direction = timezoneOffset > 0 ? '-' : '+';
    return `T00:00:00${direction}${hoursOffset}${minutesOffset}`;
}

@Component({
    selector: 'jhi-app-calendar',
    templateUrl: './calendar-layout.component.html'
})
export class CalendarComponent implements OnInit {
    public resourceUrl = SERVER_API_URL + 'api/tareas';

    view = 'month';

    locale = 'es';

    viewDate: Date = new Date();

    tareas$: Observable<Array<CalendarEvent<{ tarea: ITarea }>>>;

    activeDayIsOpen = false;

    constructor(private http: HttpClient, protected tareaService: TareaService, protected jhiAlertService: JhiAlertService) {}

    ngOnInit(): void {
        this.fetchEvents();
    }

    fetchEvents() {
        console.log('*************************LOAD ALL *************************');

        const getStart: any = {
            month: startOfMonth,
            week: startOfWeek,
            day: startOfDay
        }[this.view];

        const getEnd: any = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay
        }[this.view];

        const params = new HttpParams()
            .set('inicio.gte', format(getStart(this.viewDate), 'YYYY-MM-DD'))
            .set('fin.lte', format(getEnd(this.viewDate), 'YYYY-MM-DD'));

        this.tareas$ = this.http.get(this.resourceUrl, { params }).pipe(
            map((res: ITarea[]) => {
                if (res) {
                    return res.map((tarea: ITarea) => {
                        const calendarEventToAdd: CalendarEvent = {
                            title: tarea.title,
                            start: new Date(tarea.inicio + getTimezoneOffsetString(this.viewDate)),
                            end: new Date(tarea.fin + getTimezoneOffsetString(this.viewDate)),
                            color: colors.yellow,
                            meta: {
                                tarea
                            }
                        };
                        return calendarEventToAdd;
                    });
                }
                return [];
            })
        );
    }

    dayClicked({ date, events }: { date: Date; events: Array<CalendarEvent<{ tarea: ITarea }>> }): void {
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    eventClicked(event: CalendarEvent<{ tarea: ITarea }>): void {
        console.log(event.meta.tarea.id);
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
