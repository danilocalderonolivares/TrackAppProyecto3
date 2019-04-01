import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from './ruta.service';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { UbicacionService } from 'app/entities/ubicacion';
import { MapService } from 'app/shared/map/map.service';

@Component({
    selector: 'jhi-ruta-update',
    templateUrl: './ruta-update.component.html'
})
export class RutaUpdateComponent implements OnInit, OnDestroy {
    ruta: IRuta;
    isSaving: boolean;
    ubicaciones: IUbicacion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected rutaService: RutaService,
        protected ubicacionService: UbicacionService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected mapService: MapService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ruta }) => {
            this.ruta = ruta;
        });
        if (this.ruta.id !== undefined) {
            this.ubicaciones = this.ruta.ubicaciones;
            this.rutaService.onEdition = true;
            if (JSON.parse(localStorage.getItem('currentUbications')) !== null) {
                this.ubicaciones = JSON.parse(localStorage.getItem('currentUbications'));
            }
        } else {
            if (JSON.parse(localStorage.getItem('currentUbications')) === null) {
                this.router.navigate(['ruta/add-ubications']);
            } else {
                this.ubicaciones = JSON.parse(localStorage.getItem('currentUbications'));
            }
        }
    }

    ngOnDestroy(): void {
        localStorage.removeItem('currentUbications');
    }

    previousState() {
        this.router.navigate(['ruta']);
        localStorage.removeItem('currentUbications');
        this.rutaService.onEdition = false;
    }

    save() {
        this.isSaving = true;
        this.setUbicaciones();
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

    setUbicaciones() {
        this.ruta.ubicaciones = this.ubicaciones;
    }

    onUbicationClicked() {
        this.mapService.ubications = this.ubicaciones;
        this.router.navigate(['ruta/add-ubications']);
    }
}
