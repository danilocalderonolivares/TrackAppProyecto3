import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubTarea } from 'app/shared/model/sub-tarea.model';

type EntityResponseType = HttpResponse<ISubTarea>;
type EntityArrayResponseType = HttpResponse<ISubTarea[]>;

@Injectable({ providedIn: 'root' })
export class SubTareaService {
    public resourceUrl = SERVER_API_URL + 'api/sub-tareas';

    constructor(protected http: HttpClient) {}

    create(subTarea: ISubTarea): Observable<EntityResponseType> {
        return this.http.post<ISubTarea>(this.resourceUrl, subTarea, { observe: 'response' });
    }

    update(subTarea: ISubTarea): Observable<EntityResponseType> {
        return this.http.put<ISubTarea>(this.resourceUrl, subTarea, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ISubTarea>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISubTarea[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
