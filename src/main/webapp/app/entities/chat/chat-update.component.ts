import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IChat } from 'app/shared/model/chat.model';
import { ChatService } from './chat.service';

@Component({
    selector: 'jhi-chat-update',
    templateUrl: './chat-update.component.html'
})
export class ChatUpdateComponent implements OnInit {
    chat: IChat;
    isSaving: boolean;

    constructor(protected chatService: ChatService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ chat }) => {
            this.chat = chat;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.chat.id !== undefined) {
            this.subscribeToSaveResponse(this.chatService.update(this.chat));
        } else {
            this.subscribeToSaveResponse(this.chatService.create(this.chat));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IChat>>) {
        result.subscribe((res: HttpResponse<IChat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
