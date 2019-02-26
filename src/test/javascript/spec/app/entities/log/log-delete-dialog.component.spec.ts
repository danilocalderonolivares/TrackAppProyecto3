/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GpsAppTestModule } from '../../../test.module';
import { LogDeleteDialogComponent } from 'app/entities/log/log-delete-dialog.component';
import { LogService } from 'app/entities/log/log.service';

describe('Component Tests', () => {
    describe('Log Management Delete Component', () => {
        let comp: LogDeleteDialogComponent;
        let fixture: ComponentFixture<LogDeleteDialogComponent>;
        let service: LogService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [LogDeleteDialogComponent]
            })
                .overrideTemplate(LogDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LogDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogService);
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
