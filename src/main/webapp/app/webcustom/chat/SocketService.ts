import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { Mensaje } from 'app/shared/model/mensaje.model';

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Mensaje): void {
        this.socket.emit('new-message', message);
    }

    public onMessage(): Observable<Mensaje> {
        return new Observable<Mensaje>(observer => {
            this.socket.on('new-message', (data: Mensaje) => observer.next(data));
        });
    }
}
