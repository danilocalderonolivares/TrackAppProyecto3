import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHorario } from 'app/shared/model/horario.model';
import { HorarioService } from './horario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'jhi-horario-update',
    templateUrl: './horario-update.component.html'
})
export class HorarioUpdateComponent implements OnInit {
    horario: IHorario;
    isSaving: boolean;
    horariosForm: FormGroup;

    constructor(protected horarioService: HorarioService, protected activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder) {}

    ngOnInit() {
        this.horariosForm = this._formBuilder.group({
            nombre: ['', Validators.required],
            lunesInicio: [''],
            lunesFin: [''],
            martesInicio: [''],
            martesFin: [''],
            miercolesInicio: [''],
            miercolesFin: [''],
            juevesInicio: [''],
            juevesFin: [''],
            viernesInicio: [''],
            viernesFin: [''],
            sabadoInicio: [''],
            sabadoFin: [''],
            domingoInicio: [''],
            domingoFin: ['']
        });

        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ horario }) => {
            this.horario = horario;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.horario.id !== undefined) {
            this.subscribeToSaveResponse(this.horarioService.update(this.horario));
        } else {
            this.subscribeToSaveResponse(this.horarioService.create(this.horario));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorario>>) {
        result.subscribe((res: HttpResponse<IHorario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
