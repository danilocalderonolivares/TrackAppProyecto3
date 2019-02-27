/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GpsAppTestModule } from '../../../test.module';
import { RecuperacionComponent } from 'app/entities/recuperacion/recuperacion.component';
import { RecuperacionService } from 'app/entities/recuperacion/recuperacion.service';
import { Recuperacion } from 'app/shared/model/recuperacion.model';

describe('Component Tests', () => {
    describe('Recuperacion Management Component', () => {
        let comp: RecuperacionComponent;
        let fixture: ComponentFixture<RecuperacionComponent>;
        let service: RecuperacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [RecuperacionComponent],
                providers: []
            })
                .overrideTemplate(RecuperacionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RecuperacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecuperacionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Recuperacion('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.recuperacions[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
