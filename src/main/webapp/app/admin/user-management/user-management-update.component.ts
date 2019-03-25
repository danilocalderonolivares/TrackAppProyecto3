import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from 'app/core';
import { Empleado, IEmpleado } from 'app/shared/model/empleado.model';
import { IUbicacion, Ubicacion } from 'app/shared/model/ubicacion.model';
import { Horario, IHorario } from 'app/shared/model/horario.model';
import { ITipoEmpleado, TipoEmpleado } from 'app/shared/model/tipo-empleado.model';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EmpleadoService } from 'app/entities/empleado';
import { UbicacionService } from 'app/entities/ubicacion';
import { HorarioService } from 'app/entities/horario';
import { TipoEmpleadoService } from 'app/entities/tipo-empleado';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-user-mgmt-update',
    templateUrl: './user-management-update.component.html'
})
export class UserMgmtUpdateComponent implements OnInit {
    user: User;
    authorities: any[];
    isSaving: boolean;
    customUser: IEmpleado;
    ubicacions: IUbicacion[];
    horarios: IHorario[];
    tipoempleados: ITipoEmpleado[];
    selectedSchedule: IHorario;
    selectedType: ITipoEmpleado;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        protected ubicacionService: UbicacionService,
        protected horarioService: HorarioService,
        protected tipoEmpleadoService: TipoEmpleadoService,
        protected jhiAlertService: JhiAlertService,
        protected empleadoService: EmpleadoService
    ) {}

    ngOnInit() {
        this.setCustomUserValues();
        this.isSaving = false;
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });

        this.loadCustomUserData();
        this.authorities = [];
        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
        });
    }

    setCustomUserValues() {
        this.setDropdownsValue();
        const ubicacion = new Ubicacion('', 1, 1, '');
        const empleados: Empleado[] = [];
        const tipoEmpleado = new TipoEmpleado('', '', empleados);
        const horario = new Horario('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', empleados);
        this.customUser = new Empleado('', '', '', '', ubicacion, horario, tipoEmpleado);
    }

    setDropdownsValue() {
        this.ubicacionService
            .query({ filter: 'empleado-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IUbicacion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUbicacion[]>) => response.body)
            )
            .subscribe(
                (res: IUbicacion[]) => {
                    if (!this.customUser.ubicacion || !this.customUser.ubicacion.id) {
                        this.ubicacions = res;
                    } else {
                        this.ubicacionService
                            .find(this.customUser.ubicacion.id)
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
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.user.langKey = 'en';
            this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.saveCustomUserInfo(result);
        this.previousState();
    }

    private saveCustomUserInfo(result) {
        if (this.user.id !== null) {
            this.customUser.tipo = this.selectedType;
            this.customUser.horarios = this.selectedSchedule;
            this.empleadoService.update(this.customUser).subscribe(res => console.log(res), res => console.log(res));
        } else {
            this.customUser.id = null;
            this.customUser.tipo = this.selectedType;
            this.customUser.horarios = this.selectedSchedule;
            this.customUser.idUsuarioRelacion = result.body.id;
            this.empleadoService.create(this.customUser).subscribe(res => console.log(res), res => console.log(res));
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    private loadCustomUserData() {
        if (this.user.id !== null) {
            this.empleadoService.findUserByIdRelationship(this.user.id).subscribe(res => {
                this.customUser = res.body as IEmpleado;
                this.selectedType = this.customUser.tipo;
                this.selectedSchedule = this.customUser.horarios;
            });
        }
    }
}
