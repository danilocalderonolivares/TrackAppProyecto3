"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        // console.log('Cliente desconectado');
    });
};

// Escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('new-message', (payload) => {
        io.emit('newMessage', payload);
    });
};
