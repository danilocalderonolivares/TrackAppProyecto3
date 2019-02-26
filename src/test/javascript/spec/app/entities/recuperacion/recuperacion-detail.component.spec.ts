/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpsAppTestModule } from '../../../test.module';
import { RecuperacionDetailComponent } from 'app/entities/recuperacion/recuperacion-detail.component';
import { Recuperacion } from 'app/shared/model/recuperacion.model';

describe('Component Tests', () => {
    describe('Recuperacion Management Detail Component', () => {
        let comp: RecuperacionDetailComponent;
        let fixture: ComponentFixture<RecuperacionDetailComponent>;
        const route = ({ data: of({ recuperacion: new Recuperacion('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [RecuperacionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RecuperacionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RecuperacionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.recuperacion).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
