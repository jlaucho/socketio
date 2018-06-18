var socket = io();
    socket.on('connect', function (){
        console.log('Conectado al servidor');
    });
    socket.on('disconnect', function(){
        console.log('Desconectado del servidor');
    });
    socket.emit('enviarMensaje', {
        nombre: "Jesus",
        apellido: "Laucho",
        tipo: "Administrador"
    },function(argument){
        console.log('No se pudo identificar');
    });
    socket.on('enviarMensaje', function( mensaje ) {
        console.log( mensaje );
    });