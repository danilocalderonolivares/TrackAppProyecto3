/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GpsAppTestModule } from '../../../test.module';
import { TipoEmpleadoUpdateComponent } from 'app/entities/tipo-empleado/tipo-empleado-update.component';
import { TipoEmpleadoService } from 'app/entities/tipo-empleado/tipo-empleado.service';
import { TipoEmpleado } from 'app/shared/model/tipo-empleado.model';

describe('Component Tests', () => {
    describe('TipoEmpleado Management Update Component', () => {
        let comp: TipoEmpleadoUpdateComponent;
        let fixture: ComponentFixture<TipoEmpleadoUpdateComponent>;
        let service: TipoEmpleadoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [TipoEmpleadoUpdateComponent]
            })
                .overrideTemplate(TipoEmpleadoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoEmpleadoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoEmpleadoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TipoEmpleado('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tipoEmpleado = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TipoEmpleado();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tipoEmpleado = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
