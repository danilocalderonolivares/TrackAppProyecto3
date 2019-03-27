import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRuta } from 'app/shared/model/ruta.model';

@Component({
    selector: 'jhi-ruta-detail',
    templateUrl: './ruta-detail.component.html'
})
export class RutaDetailComponent implements OnInit, OnDestroy {
    ruta: IRuta;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ruta }) => {
            this.ruta = ruta;
        });
    }

    ngOnDestroy() {
        localStorage.removeItem('currentUbications');
    }

    previousState() {
        window.history.back();
    }
}
