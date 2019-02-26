/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GpsAppTestModule } from '../../../test.module';
import { LogComponent } from 'app/entities/log/log.component';
import { LogService } from 'app/entities/log/log.service';
import { Log } from 'app/shared/model/log.model';

describe('Component Tests', () => {
    describe('Log Management Component', () => {
        let comp: LogComponent;
        let fixture: ComponentFixture<LogComponent>;
        let service: LogService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [LogComponent],
                providers: []
            })
                .overrideTemplate(LogComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Log('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.logs[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
