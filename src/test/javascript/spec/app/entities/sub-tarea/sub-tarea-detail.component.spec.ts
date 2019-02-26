/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpsAppTestModule } from '../../../test.module';
import { SubTareaDetailComponent } from 'app/entities/sub-tarea/sub-tarea-detail.component';
import { SubTarea } from 'app/shared/model/sub-tarea.model';

describe('Component Tests', () => {
    describe('SubTarea Management Detail Component', () => {
        let comp: SubTareaDetailComponent;
        let fixture: ComponentFixture<SubTareaDetailComponent>;
        const route = ({ data: of({ subTarea: new SubTarea('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GpsAppTestModule],
                declarations: [SubTareaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubTareaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubTareaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subTarea).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
