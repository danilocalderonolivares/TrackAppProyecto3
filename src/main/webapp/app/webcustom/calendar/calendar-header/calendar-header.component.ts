import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'jhi-app-calendar-header',
    templateUrl: './calendar-header.component.html'
})
export class CalendarHeaderComponent {
    @Input() view: string;

    @Input() viewDate: Date;

    @Input() locale = 'es';

    @Output() viewChange: EventEmitter<string> = new EventEmitter();

    @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
