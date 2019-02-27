import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubTarea } from 'app/shared/model/sub-tarea.model';

@Component({
    selector: 'jhi-sub-tarea-detail',
    templateUrl: './sub-tarea-detail.component.html'
})
export class SubTareaDetailComponent implements OnInit {
    subTarea: ISubTarea;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subTarea }) => {
            this.subTarea = subTarea;
        });
    }

    previousState() {
        window.history.back();
    }
}
