/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpsAppTestModule } from '../../../test.module';
import { TipoEmpleadoDetailComponent } from 'app/entities/tipo-empleado/tipo-empleado-detail.component';
import { TipoEmpleado } from 'app/shared/model/tipo-empleado.model';

describe('Component Tests', () => {
    describe('TipoEmpleado Management Detail Component', () => {
        let comp: TipoEmpleadoDetailComponent;
        let fixture: ComponentFixture<TipoEmpleadoDetailComponent>;
        const route = ({ data: of({ tipoEmpleado: new TipoEmpleado('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [TipoEmpleadoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TipoEmpleadoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoEmpleadoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tipoEmpleado).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
