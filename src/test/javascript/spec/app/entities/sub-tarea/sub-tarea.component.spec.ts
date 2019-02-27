/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GpsAppTestModule } from '../../../test.module';
import { SubTareaComponent } from 'app/entities/sub-tarea/sub-tarea.component';
import { SubTareaService } from 'app/entities/sub-tarea/sub-tarea.service';
import { SubTarea } from 'app/shared/model/sub-tarea.model';

describe('Component Tests', () => {
    describe('SubTarea Management Component', () => {
        let comp: SubTareaComponent;
        let fixture: ComponentFixture<SubTareaComponent>;
        let service: SubTareaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [SubTareaComponent],
                providers: []
            })
                .overrideTemplate(SubTareaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubTareaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubTareaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SubTarea('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.subTareas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
