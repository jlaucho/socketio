// Requires

const express = require('express');
const path  = require('path');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
const publicPath = path.resolve(__dirname, '../public');

// Inicializar variables
const app = express();
const server = http.createServer( app );

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

//Carpeta Publica
app.use( express.static( publicPath ) );
let io = socketIO(server);

io.on('connection', ( client )=>{
    console.log('Usuario Conectado');

    client.on('disconnect', ()=>{
        console.log('Usuario desconectado');
    });
    client.on('enviarMensaje', ( request, callback )=>{
        if( request.nombre ) {
            console.log( `Hola ${ request.nombre }` );
        }else{
            console.log( `Hola anonimo` );
            callback();
        }
    });
    client.emit('enviarMensaje', {
        mensaje: `Hola Jesus`
    });
});
//Rutas

// Escuchar peticiones
server.listen(port, ( error ) => {
    if ( error ) throw new Error (error);

    console.log(`Express server corriendo en el puerto ${ port }: \x1b[32m%s\x1b[0m`, 'online');
});