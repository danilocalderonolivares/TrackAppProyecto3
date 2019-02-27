/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpsAppTestModule } from '../../../test.module';
import { LogDetailComponent } from 'app/entities/log/log-detail.component';
import { Log } from 'app/shared/model/log.model';

describe('Component Tests', () => {
    describe('Log Management Detail Component', () => {
        let comp: LogDetailComponent;
        let fixture: ComponentFixture<LogDetailComponent>;
        const route = ({ data: of({ log: new Log('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [LogDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LogDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LogDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.log).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
