/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GpsAppTestModule } from '../../../test.module';
import { RecuperacionUpdateComponent } from 'app/entities/recuperacion/recuperacion-update.component';
import { RecuperacionService } from 'app/entities/recuperacion/recuperacion.service';
import { Recuperacion } from 'app/shared/model/recuperacion.model';

describe('Component Tests', () => {
    describe('Recuperacion Management Update Component', () => {
        let comp: RecuperacionUpdateComponent;
        let fixture: ComponentFixture<RecuperacionUpdateComponent>;
        let service: RecuperacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [RecuperacionUpdateComponent]
            })
                .overrideTemplate(RecuperacionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RecuperacionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecuperacionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Recuperacion('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.recuperacion = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Recuperacion();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.recuperacion = entity;
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
