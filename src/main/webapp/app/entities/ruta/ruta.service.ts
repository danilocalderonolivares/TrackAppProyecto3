import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRuta, Ruta } from 'app/shared/model/ruta.model';
import { IUbicacion, Ubicacion } from 'app/shared/model/ubicacion.model';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<IRuta>;
type EntityArrayResponseType = HttpResponse<IRuta[]>;

@Injectable({ providedIn: 'root' })
export class RutaService {
    public resourceUrl = SERVER_API_URL + 'api/rutas';
    public onEdition: boolean = false;
    public ruta: IRuta;

    constructor(protected http: HttpClient) {
        this.ruta = new Ruta();
    }

    create(ruta: IRuta): Observable<EntityResponseType> {
        return this.http.post<IRuta>(this.resourceUrl, ruta, { observe: 'response' });
    }

    update(ruta: IRuta): Observable<EntityResponseType> {
        return this.http.put<IRuta>(this.resourceUrl, ruta, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IRuta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRuta[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
