import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRecuperacion } from 'app/shared/model/recuperacion.model';
import { RecuperacionService } from './recuperacion.service';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';

@Component({
    selector: 'jhi-recuperacion-update',
    templateUrl: './recuperacion-update.component.html'
})
export class RecuperacionUpdateComponent implements OnInit {
    recuperacion: IRecuperacion;
    isSaving: boolean;

    empleados: IEmpleado[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected recuperacionService: RecuperacionService,
        protected empleadoService: EmpleadoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ recuperacion }) => {
            this.recuperacion = recuperacion;
        });
        this.empleadoService
            .query({ filter: 'recuperacion-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEmpleado[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmpleado[]>) => response.body)
            )
            .subscribe(
                (res: IEmpleado[]) => {
                    if (!this.recuperacion.empleado || !this.recuperacion.empleado.id) {
                        this.empleados = res;
                    } else {
                        this.empleadoService
                            .find(this.recuperacion.empleado.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IEmpleado>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IEmpleado>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IEmpleado) => (this.empleados = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.recuperacion.id !== undefined) {
            this.subscribeToSaveResponse(this.recuperacionService.update(this.recuperacion));
        } else {
            this.subscribeToSaveResponse(this.recuperacionService.create(this.recuperacion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecuperacion>>) {
        result.subscribe((res: HttpResponse<IRecuperacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEmpleadoById(index: number, item: IEmpleado) {
        return item.id;
    }
}
