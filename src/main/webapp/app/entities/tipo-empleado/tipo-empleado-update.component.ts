import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITipoEmpleado } from 'app/shared/model/tipo-empleado.model';
import { TipoEmpleadoService } from './tipo-empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'jhi-tipo-empleado-update',
    templateUrl: './tipo-empleado-update.component.html'
})
export class TipoEmpleadoUpdateComponent implements OnInit {
    tipoEmpleado: ITipoEmpleado;
    isSaving: boolean;
    tipoEmpleadoForm: FormGroup;

    constructor(
        protected tipoEmpleadoService: TipoEmpleadoService,
        protected activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.tipoEmpleadoForm = this._formBuilder.group({
            nombre: ['', Validators.required]
        });

        this.activatedRoute.data.subscribe(({ tipoEmpleado }) => {
            this.tipoEmpleado = tipoEmpleado;
        });

        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoEmpleado }) => {
            this.tipoEmpleado = tipoEmpleado;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoEmpleado.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoEmpleadoService.update(this.tipoEmpleado));
        } else {
            this.subscribeToSaveResponse(this.tipoEmpleadoService.create(this.tipoEmpleado));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoEmpleado>>) {
        result.subscribe((res: HttpResponse<ITipoEmpleado>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
