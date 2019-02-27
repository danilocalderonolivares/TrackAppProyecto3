/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GpsAppTestModule } from '../../../test.module';
import { SubTareaDeleteDialogComponent } from 'app/entities/sub-tarea/sub-tarea-delete-dialog.component';
import { SubTareaService } from 'app/entities/sub-tarea/sub-tarea.service';

describe('Component Tests', () => {
    describe('SubTarea Management Delete Component', () => {
        let comp: SubTareaDeleteDialogComponent;
        let fixture: ComponentFixture<SubTareaDeleteDialogComponent>;
        let service: SubTareaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [SubTareaDeleteDialogComponent]
            })
                .overrideTemplate(SubTareaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubTareaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubTareaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
