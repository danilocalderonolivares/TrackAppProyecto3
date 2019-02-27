import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from './ruta.service';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { UbicacionService } from 'app/entities/ubicacion';

@Component({
    selector: 'jhi-ruta-update',
    templateUrl: './ruta-update.component.html'
})
export class RutaUpdateComponent implements OnInit {
    ruta: IRuta;
    isSaving: boolean;

    ubicacions: IUbicacion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected rutaService: RutaService,
        protected ubicacionService: UbicacionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ruta }) => {
            this.ruta = ruta;
        });
        this.ubicacionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUbicacion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUbicacion[]>) => response.body)
            )
            .subscribe((res: IUbicacion[]) => (this.ubicacions = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUbicacionById(index: number, item: IUbicacion) {
        return item.id;
    }
}
