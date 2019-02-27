import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRuta } from 'app/shared/model/ruta.model';

@Component({
    selector: 'jhi-ruta-detail',
    templateUrl: './ruta-detail.component.html'
})
export class RutaDetailComponent implements OnInit {
    ruta: IRuta;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ruta }) => {
            this.ruta = ruta;
        });
    }

    previousState() {
        window.history.back();
    }
}
