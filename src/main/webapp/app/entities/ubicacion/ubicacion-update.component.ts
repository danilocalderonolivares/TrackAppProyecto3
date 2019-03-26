import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { UbicacionService } from './ubicacion.service';
import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from 'app/entities/ruta';

@Component({
    selector: 'jhi-ubicacion-update',
    templateUrl: './ubicacion-update.component.html'
})
export class UbicacionUpdateComponent implements OnInit {
    ubicacion: IUbicacion;
    isSaving: boolean;

    rutas: IRuta[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ubicacionService: UbicacionService,
        protected rutaService: RutaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ubicacion }) => {
            this.ubicacion = ubicacion;
        });
        this.rutaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRuta[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRuta[]>) => response.body)
            )
            .subscribe((res: IRuta[]) => (this.rutas = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRutaById(index: number, item: IRuta) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
