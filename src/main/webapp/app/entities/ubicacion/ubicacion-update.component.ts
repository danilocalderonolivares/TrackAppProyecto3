import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { UbicacionService } from './ubicacion.service';

@Component({
    selector: 'jhi-ubicacion-update',
    templateUrl: './ubicacion-update.component.html'
})
export class UbicacionUpdateComponent implements OnInit {
    ubicacion: IUbicacion;
    isSaving: boolean;

    constructor(protected ubicacionService: UbicacionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ubicacion }) => {
            this.ubicacion = ubicacion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ubicacion.id !== undefined) {
            this.subscribeToSaveResponse(this.ubicacionService.update(this.ubicacion));
        } else {
            this.subscribeToSaveResponse(this.ubicacionService.create(this.ubicacion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUbicacion>>) {
        result.subscribe((res: HttpResponse<IUbicacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
