/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { HorarioService } from 'app/entities/horario/horario.service';
import { IHorario, Horario } from 'app/shared/model/horario.model';

describe('Service Tests', () => {
    describe('Horario Service', () => {
        let injector: TestBed;
        let service: HorarioService;
        let httpMock: HttpTestingController;
        let elemDefault: IHorario;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(HorarioService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Horario(
                'ID',
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                currentDate
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        lunesInico: currentDate.format(DATE_FORMAT),
                        lunesFin: currentDate.format(DATE_FORMAT),
                        martesInico: currentDate.format(DATE_FORMAT),
                        martesFin: currentDate.format(DATE_FORMAT),
                        miercolesInico: currentDate.format(DATE_FORMAT),
                        miercolesFin: currentDate.format(DATE_FORMAT),
                        juevesInico: currentDate.format(DATE_FORMAT),
                        juevesFin: currentDate.format(DATE_FORMAT),
                        viernesInico: currentDate.format(DATE_FORMAT),
                        viernesFin: currentDate.format(DATE_FORMAT),
                        sabadoInico: currentDate.format(DATE_FORMAT),
                        sabadoFin: currentDate.format(DATE_FORMAT),
                        domingoInico: currentDate.format(DATE_FORMAT),
                        domingoFin: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find('123')
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Horario', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID',
                        lunesInico: currentDate.format(DATE_FORMAT),
                        lunesFin: currentDate.format(DATE_FORMAT),
                        martesInico: currentDate.format(DATE_FORMAT),
                        martesFin: currentDate.format(DATE_FORMAT),
                        miercolesInico: currentDate.format(DATE_FORMAT),
                        miercolesFin: currentDate.format(DATE_FORMAT),
                        juevesInico: currentDate.format(DATE_FORMAT),
                        juevesFin: currentDate.format(DATE_FORMAT),
                        viernesInico: currentDate.format(DATE_FORMAT),
                        viernesFin: currentDate.format(DATE_FORMAT),
                        sabadoInico: currentDate.format(DATE_FORMAT),
                        sabadoFin: currentDate.format(DATE_FORMAT),
                        domingoInico: currentDate.format(DATE_FORMAT),
                        domingoFin: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        lunesInico: currentDate,
                        lunesFin: currentDate,
                        martesInico: currentDate,
                        martesFin: currentDate,
                        miercolesInico: currentDate,
                        miercolesFin: currentDate,
                        juevesInico: currentDate,
                        juevesFin: currentDate,
                        viernesInico: currentDate,
                        viernesFin: currentDate,
                        sabadoInico: currentDate,
                        sabadoFin: currentDate,
                        domingoInico: currentDate,
                        domingoFin: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Horario(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Horario', async () => {
                const returnedFromService = Object.assign(
                    {
                        lunesInico: currentDate.format(DATE_FORMAT),
                        lunesFin: currentDate.format(DATE_FORMAT),
                        martesInico: currentDate.format(DATE_FORMAT),
                        martesFin: currentDate.format(DATE_FORMAT),
                        miercolesInico: currentDate.format(DATE_FORMAT),
                        miercolesFin: currentDate.format(DATE_FORMAT),
                        juevesInico: currentDate.format(DATE_FORMAT),
                        juevesFin: currentDate.format(DATE_FORMAT),
                        viernesInico: currentDate.format(DATE_FORMAT),
                        viernesFin: currentDate.format(DATE_FORMAT),
                        sabadoInico: currentDate.format(DATE_FORMAT),
                        sabadoFin: currentDate.format(DATE_FORMAT),
                        domingoInico: currentDate.format(DATE_FORMAT),
                        domingoFin: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        lunesInico: currentDate,
                        lunesFin: currentDate,
                        martesInico: currentDate,
                        martesFin: currentDate,
                        miercolesInico: currentDate,
                        miercolesFin: currentDate,
                        juevesInico: currentDate,
                        juevesFin: currentDate,
                        viernesInico: currentDate,
                        viernesFin: currentDate,
                        sabadoInico: currentDate,
                        sabadoFin: currentDate,
                        domingoInico: currentDate,
                        domingoFin: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Horario', async () => {
                const returnedFromService = Object.assign(
                    {
                        lunesInico: currentDate.format(DATE_FORMAT),
                        lunesFin: currentDate.format(DATE_FORMAT),
                        martesInico: currentDate.format(DATE_FORMAT),
                        martesFin: currentDate.format(DATE_FORMAT),
                        miercolesInico: currentDate.format(DATE_FORMAT),
                        miercolesFin: currentDate.format(DATE_FORMAT),
                        juevesInico: currentDate.format(DATE_FORMAT),
                        juevesFin: currentDate.format(DATE_FORMAT),
                        viernesInico: currentDate.format(DATE_FORMAT),
                        viernesFin: currentDate.format(DATE_FORMAT),
                        sabadoInico: currentDate.format(DATE_FORMAT),
                        sabadoFin: currentDate.format(DATE_FORMAT),
                        domingoInico: currentDate.format(DATE_FORMAT),
                        domingoFin: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        lunesInico: currentDate,
                        lunesFin: currentDate,
                        martesInico: currentDate,
                        martesFin: currentDate,
                        miercolesInico: currentDate,
                        miercolesFin: currentDate,
                        juevesInico: currentDate,
                        juevesFin: currentDate,
                        viernesInico: currentDate,
                        viernesFin: currentDate,
                        sabadoInico: currentDate,
                        sabadoFin: currentDate,
                        domingoInico: currentDate,
                        domingoFin: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Horario', async () => {
                const rxPromise = service.delete('123').subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
