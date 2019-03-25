/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GpsAppTestModule } from '../../../test.module';
import { TipoEmpleadoDeleteDialogComponent } from 'app/entities/tipo-empleado/tipo-empleado-delete-dialog.component';
import { TipoEmpleadoService } from 'app/entities/tipo-empleado/tipo-empleado.service';

describe('Component Tests', () => {
    describe('TipoEmpleado Management Delete Component', () => {
        let comp: TipoEmpleadoDeleteDialogComponent;
        let fixture: ComponentFixture<TipoEmpleadoDeleteDialogComponent>;
        let service: TipoEmpleadoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [TipoEmpleadoDeleteDialogComponent]
            })
                .overrideTemplate(TipoEmpleadoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoEmpleadoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoEmpleadoService);
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
