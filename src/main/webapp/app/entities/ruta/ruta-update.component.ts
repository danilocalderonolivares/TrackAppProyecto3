import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from './ruta.service';

@Component({
    selector: 'jhi-ruta-update',
    templateUrl: './ruta-update.component.html'
})
export class RutaUpdateComponent implements OnInit {
    ruta: IRuta;
    isSaving: boolean;

    constructor(protected rutaService: RutaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ruta }) => {
            this.ruta = ruta;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ruta.id !== undefined) {
            this.subscribeToSaveResponse(this.rutaService.update(this.ruta));
        } else {
            this.subscribeToSaveResponse(this.rutaService.create(this.ruta));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRuta>>) {
        result.subscribe((res: HttpResponse<IRuta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
