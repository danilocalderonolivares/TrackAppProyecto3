import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IChatRoom } from 'app/shared/model/chat-room.model';
import { ChatRoomService } from './chat-room.service';

@Component({
    selector: 'jhi-chat-room-update',
    templateUrl: './chat-room-update.component.html'
})
export class ChatRoomUpdateComponent implements OnInit {
    chatRoom: IChatRoom;
    isSaving: boolean;

    constructor(protected chatRoomService: ChatRoomService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ chatRoom }) => {
            this.chatRoom = chatRoom;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.chatRoom.id !== undefined) {
            this.subscribeToSaveResponse(this.chatRoomService.update(this.chatRoom));
        } else {
            this.subscribeToSaveResponse(this.chatRoomService.create(this.chatRoom));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IChatRoom>>) {
        result.subscribe((res: HttpResponse<IChatRoom>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
