import './vendor.ts';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { ChatService } from 'app/webcustom/chat/chat.service';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { GpsAppSharedModule } from 'app/shared';
import { GpsAppCoreModule } from 'app/core';
import { GpsAppAppRoutingModule } from './app-routing.module';
import { GpsAppHomeModule } from './home/home.module';
import { GpsAppAccountModule } from './account/account.module';
import { GpsAppEntityModule } from './entities/entity.module';
import * as moment from 'moment';
import { GpsAppWebCustomModule } from './webcustom/web-custom.module';

// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LandingComponent } from './layouts/landing/landing.component';
import { MapService } from './shared/map/map.service';
import { FormsModule } from '@angular/forms';
import { SocketService } from 'app/webcustom/chat/SocketService';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000
        }),
        GpsAppSharedModule.forRoot(),
        GpsAppCoreModule,
        GpsAppHomeModule,
        GpsAppAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        GpsAppEntityModule,
        GpsAppWebCustomModule,
        GpsAppAppRoutingModule,
        FormsModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        SidebarComponent,
        LandingComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        MapService,
        ChatService,
        SocketService
    ],
    bootstrap: [JhiMainComponent]
})
export class GpsAppAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}

platformBrowserDynamic()
    .bootstrapModule(GpsAppAppModule)
    .then(ref => {
        // Ensure Angular destroys itself on hot reloads.
        if (window['ngRef']) {
            window['ngRef'].destroy();
        }
        window['ngRef'] = ref;

        // Otherwise, log the boot error
    })
    .catch(err => console.error(err));
