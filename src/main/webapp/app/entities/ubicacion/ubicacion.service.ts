import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUbicacion } from 'app/shared/model/ubicacion.model';

type EntityResponseType = HttpResponse<IUbicacion>;
type EntityArrayResponseType = HttpResponse<IUbicacion[]>;

@Injectable({ providedIn: 'root' })
export class UbicacionService {
    public resourceUrl = SERVER_API_URL + 'api/ubicacions';

    constructor(protected http: HttpClient) {}

    create(ubicacion: IUbicacion): Observable<EntityResponseType> {
        return this.http.post<IUbicacion>(this.resourceUrl, ubicacion, { observe: 'response' });
    }

    update(ubicacion: IUbicacion): Observable<EntityResponseType> {
        return this.http.put<IUbicacion>(this.resourceUrl, ubicacion, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IUbicacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUbicacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
