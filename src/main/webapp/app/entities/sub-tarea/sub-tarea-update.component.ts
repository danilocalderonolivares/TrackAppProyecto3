import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ISubTarea } from 'app/shared/model/sub-tarea.model';
import { SubTareaService } from './sub-tarea.service';

@Component({
    selector: 'jhi-sub-tarea-update',
    templateUrl: './sub-tarea-update.component.html'
})
export class SubTareaUpdateComponent implements OnInit {
    subTarea: ISubTarea;
    isSaving: boolean;

    constructor(protected subTareaService: SubTareaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subTarea }) => {
            this.subTarea = subTarea;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.subTarea.id !== undefined) {
            this.subscribeToSaveResponse(this.subTareaService.update(this.subTarea));
        } else {
            this.subscribeToSaveResponse(this.subTareaService.create(this.subTarea));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubTarea>>) {
        result.subscribe((res: HttpResponse<ISubTarea>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
