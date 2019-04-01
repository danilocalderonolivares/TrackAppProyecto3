import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChat } from 'app/shared/model/chat.model';
import { AccountService } from 'app/core';
import { ChatService } from './chat.service';

@Component({
    selector: 'jhi-chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {
    chats: IChat[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected chatService: ChatService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.chatService
            .query()
            .pipe(
                filter((res: HttpResponse<IChat[]>) => res.ok),
                map((res: HttpResponse<IChat[]>) => res.body)
            )
            .subscribe(
                (res: IChat[]) => {
                    this.chats = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInChats();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IChat) {
        return item.id;
    }

    registerChangeInChats() {
        this.eventSubscriber = this.eventManager.subscribe('chatListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
