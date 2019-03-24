import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Observable, from } from 'rxjs';
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

    view: string = 'month';

    locale: string = 'es';

    viewDate: Date = new Date();

    tareas$: Observable<Array<CalendarEvent<{ tarea: ITarea }>>> = from([]);

    activeDayIsOpen: boolean = false;

    constructor(private http: HttpClient, protected tareaService: TareaService, protected jhiAlertService: JhiAlertService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll() {
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
            map(({ results }: { results: ITarea[] }) => {
                console.log('*****************', results);
                if (results) {
                    return results.map((film: ITarea) => {
                        console.log(film);
                        const calendarEventToAdd: CalendarEvent = {
                            title: film.title,
                            start: new Date(film.inicio + getTimezoneOffsetString(this.viewDate)),
                            color: colors.yellow,
                            allDay: true,
                            meta: {
                                film
                            }
                        };
                        return calendarEventToAdd;
                    });
                }
                return [];
            })
        );
    }

    /*fetchEvents(): void {
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
            .set(
                'primary_release_date.gte',
                format(getStart(this.viewDate), 'YYYY-MM-DD')
            )
            .set(
                'primary_release_date.lte',
                format(getEnd(this.viewDate), 'YYYY-MM-DD')
            )
            .set('api_key', '0ec33936a68018857d727958dca1424f');

        this.events$ = this.http
            .get('https://api.themoviedb.org/3/discover/movie', { params })
            .pipe(
                map(({ results }: { results: Film[] }) => {
                    return results.map((film: Film) => {
                        return {
                            title: film.title,
                            start: new Date(
                                film.release_date + getTimezoneOffsetString(this.viewDate)
                            ),
                            color: colors.yellow,
                            allDay: true,
                            meta: {
                                film
                            }
                        };
                    });
                })
            );
    }*/

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
}
