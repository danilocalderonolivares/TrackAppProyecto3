import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from './empleado.service';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { UbicacionService } from 'app/entities/ubicacion';
import { IHorario } from 'app/shared/model/horario.model';
import { HorarioService } from 'app/entities/horario';
import { ITipoEmpleado } from 'app/shared/model/tipo-empleado.model';
import { TipoEmpleadoService } from 'app/entities/tipo-empleado';

@Component({
    selector: 'jhi-empleado-update',
    templateUrl: './empleado-update.component.html'
})
export class EmpleadoUpdateComponent implements OnInit {
    empleado: IEmpleado;
    isSaving: boolean;

    ubicacions: IUbicacion[];

    horarios: IHorario[];

    tipoempleados: ITipoEmpleado[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected empleadoService: EmpleadoService,
        protected ubicacionService: UbicacionService,
        protected horarioService: HorarioService,
        protected tipoEmpleadoService: TipoEmpleadoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ empleado }) => {
            this.empleado = empleado;
        });
        this.ubicacionService
            .query({ filter: 'empleado-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IUbicacion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUbicacion[]>) => response.body)
            )
            .subscribe(
                (res: IUbicacion[]) => {
                    if (!this.empleado.ubicacion || !this.empleado.ubicacion.id) {
                        this.ubicacions = res;
                    } else {
                        this.ubicacionService
                            .find(this.empleado.ubicacion.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IUbicacion>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IUbicacion>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IUbicacion) => (this.ubicacions = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.horarioService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IHorario[]>) => mayBeOk.ok),
                map((response: HttpResponse<IHorario[]>) => response.body)
            )
            .subscribe((res: IHorario[]) => (this.horarios = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoEmpleadoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITipoEmpleado[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITipoEmpleado[]>) => response.body)
            )
            .subscribe((res: ITipoEmpleado[]) => (this.tipoempleados = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.empleado.id !== undefined) {
            this.subscribeToSaveResponse(this.empleadoService.update(this.empleado));
        } else {
            this.subscribeToSaveResponse(this.empleadoService.create(this.empleado));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>) {
        result.subscribe((res: HttpResponse<IEmpleado>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUbicacionById(index: number, item: IUbicacion) {
        return item.id;
    }

    trackHorarioById(index: number, item: IHorario) {
        return item.id;
    }

    trackTipoEmpleadoById(index: number, item: ITipoEmpleado) {
        return item.id;
    }
}
