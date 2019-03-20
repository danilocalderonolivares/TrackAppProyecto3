import { Component, OnInit } from '@angular/core';
import { MapaService } from './mapa.service';
import { MouseEvent } from '@agm/core';

@Component({
    selector: 'jhi-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['mapa.component.css']
})
export class MapaComponent implements OnInit {
    zoom: number = 15;

    constructor(protected mapaService: MapaService) {}

    ngOnInit() {}

    onChoseLocation(event) {
        this.mapaService.lat = event.coords.lat;
        this.mapaService.lng = event.coords.lng;
    }

    setLabel(nombre: string, apellido: string) {
        return nombre.charAt(0) + apellido.charAt(0);
    }
}
