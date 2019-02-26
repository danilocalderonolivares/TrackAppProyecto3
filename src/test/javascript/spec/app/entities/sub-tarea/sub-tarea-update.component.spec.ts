/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GpsAppTestModule } from '../../../test.module';
import { SubTareaUpdateComponent } from 'app/entities/sub-tarea/sub-tarea-update.component';
import { SubTareaService } from 'app/entities/sub-tarea/sub-tarea.service';
import { SubTarea } from 'app/shared/model/sub-tarea.model';

describe('Component Tests', () => {
    describe('SubTarea Management Update Component', () => {
        let comp: SubTareaUpdateComponent;
        let fixture: ComponentFixture<SubTareaUpdateComponent>;
        let service: SubTareaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [SubTareaUpdateComponent]
            })
                .overrideTemplate(SubTareaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubTareaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubTareaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new SubTarea('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.subTarea = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new SubTarea();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.subTarea = entity;
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
