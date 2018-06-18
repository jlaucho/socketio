const { io } = require('../server');

io.on('connection', ( client )=>{
    console.log('Usuario Conectado');

    client.on('disconnect', ()=>{
        console.log('Usuario desconectado');
    });
    client.on('enviarMensaje', ( data, callback )=>{
        // client.emit('enviarMensaje', {
        //     mensaje: `Hola ${ data.nombre }`
        // });
        client.broadcast.emit('enviarMensaje', data);
    });
    client.emit('enviarMensaje', {
        mensaje: `Hola Jesus`,
        tipo: 'Administrador'
    });
});