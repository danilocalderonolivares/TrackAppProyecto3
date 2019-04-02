/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { MensajeService } from 'app/entities/mensaje/mensaje.service';
import { IMensaje, Mensaje } from 'app/shared/model/mensaje.model';

describe('Service Tests', () => {
    describe('Mensaje Service', () => {
        let injector: TestBed;
        let service: MensajeService;
        let httpMock: HttpTestingController;
        let elemDefault: IMensaje;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MensajeService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Mensaje('ID', 'AAAAAAA', currentDate, false, false);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        fechaEnvio: currentDate.format(DATE_FORMAT)
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

            it('should create a Mensaje', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID',
                        fechaEnvio: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fechaEnvio: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Mensaje(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Mensaje', async () => {
                const returnedFromService = Object.assign(
                    {
                        texto: 'BBBBBB',
                        fechaEnvio: currentDate.format(DATE_FORMAT),
                        visto: true,
                        borrado: true
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        fechaEnvio: currentDate
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

            it('should return a list of Mensaje', async () => {
                const returnedFromService = Object.assign(
                    {
                        texto: 'BBBBBB',
                        fechaEnvio: currentDate.format(DATE_FORMAT),
                        visto: true,
                        borrado: true
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fechaEnvio: currentDate
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

            it('should delete a Mensaje', async () => {
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
