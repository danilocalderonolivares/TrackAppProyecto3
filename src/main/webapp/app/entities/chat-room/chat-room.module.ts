import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';

import { GpsAppSharedModule } from 'app/shared';
import {
    ChatRoomComponent,
    ChatRoomDetailComponent,
    ChatRoomUpdateComponent,
    ChatRoomDeletePopupComponent,
    ChatRoomDeleteDialogComponent,
    chatRoomRoute,
    chatRoomPopupRoute
} from './';

const ENTITY_STATES = [...chatRoomRoute, ...chatRoomPopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ChatRoomComponent,
        ChatRoomDetailComponent,
        ChatRoomUpdateComponent,
        ChatRoomDeleteDialogComponent,
        ChatRoomDeletePopupComponent
    ],
    entryComponents: [ChatRoomComponent, ChatRoomUpdateComponent, ChatRoomDeleteDialogComponent, ChatRoomDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppChatRoomModule {}
