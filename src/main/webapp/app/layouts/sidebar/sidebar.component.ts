import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../content/scss/animations';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    animations: fuseAnimations
})
export class SidebarComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
