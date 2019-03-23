import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GpsAppRoutingCalendario } from '../calendar.route';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarHeader } from '../calendar-header/calendar-header.module';
import { CalendarComponent } from './calendar-layout.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

registerLocaleData(localeEs);

@NgModule({
    imports: [
        CommonModule,
        GpsAppRoutingCalendario,
        HttpClientModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        CalendarHeader
    ],
    declarations: [CalendarComponent],
    exports: [CalendarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarCompModule {}
