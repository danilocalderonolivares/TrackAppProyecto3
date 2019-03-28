/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GpsAppTestModule } from '../../../test.module';
import { TipoEmpleadoComponent } from 'app/entities/tipo-empleado/tipo-empleado.component';
import { TipoEmpleadoService } from 'app/entities/tipo-empleado/tipo-empleado.service';
import { TipoEmpleado } from 'app/shared/model/tipo-empleado.model';

describe('Component Tests', () => {
    describe('TipoEmpleado Management Component', () => {
        let comp: TipoEmpleadoComponent;
        let fixture: ComponentFixture<TipoEmpleadoComponent>;
        let service: TipoEmpleadoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [TipoEmpleadoComponent],
                providers: []
            })
                .overrideTemplate(TipoEmpleadoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoEmpleadoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoEmpleadoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoEmpleado('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipoEmpleados[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
