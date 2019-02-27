import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecuperacion } from 'app/shared/model/recuperacion.model';

@Component({
    selector: 'jhi-recuperacion-detail',
    templateUrl: './recuperacion-detail.component.html'
})
export class RecuperacionDetailComponent implements OnInit {
    recuperacion: IRecuperacion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ recuperacion }) => {
            this.recuperacion = recuperacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
