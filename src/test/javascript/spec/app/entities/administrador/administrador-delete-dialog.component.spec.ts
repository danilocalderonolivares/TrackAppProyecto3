/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GpsAppTestModule } from '../../../test.module';
import { AdministradorDeleteDialogComponent } from 'app/entities/administrador/administrador-delete-dialog.component';
import { AdministradorService } from 'app/entities/administrador/administrador.service';

describe('Component Tests', () => {
    describe('Administrador Management Delete Component', () => {
        let comp: AdministradorDeleteDialogComponent;
        let fixture: ComponentFixture<AdministradorDeleteDialogComponent>;
        let service: AdministradorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [AdministradorDeleteDialogComponent]
            })
                .overrideTemplate(AdministradorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AdministradorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdministradorService);
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
