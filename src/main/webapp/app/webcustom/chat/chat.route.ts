import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { UserRouteAccessService } from 'app/core';

const CHAT_ROUTE: Routes = [
    {
        path: 'chat',
        component: ChatComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_USER'],
            pageTitle: 'Chat'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(CHAT_ROUTE)],
    exports: [RouterModule]
})
export class GpsAppChatRouting {}
