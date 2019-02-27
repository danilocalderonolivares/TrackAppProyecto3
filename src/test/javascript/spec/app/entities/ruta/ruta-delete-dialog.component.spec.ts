/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GpsAppTestModule } from '../../../test.module';
import { RutaDeleteDialogComponent } from 'app/entities/ruta/ruta-delete-dialog.component';
import { RutaService } from 'app/entities/ruta/ruta.service';

describe('Component Tests', () => {
    describe('Ruta Management Delete Component', () => {
        let comp: RutaDeleteDialogComponent;
        let fixture: ComponentFixture<RutaDeleteDialogComponent>;
        let service: RutaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [RutaDeleteDialogComponent]
            })
                .overrideTemplate(RutaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RutaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RutaService);
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
