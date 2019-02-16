import { NgModule } from '@angular/core';

import { GpsAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [GpsAppSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [GpsAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class GpsAppSharedCommonModule {}
