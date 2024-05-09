const socket = io();

let user;
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('messageLogs');
let data;

socket.on('message', msgs => {//Recibe mensajes nuevos del servidor y actualiza la variable data.
    data = msgs;
});

socket.on('messageLogs', data => {// Recibe el historial de mensajes del servidor y llama a la función renderizar para mostrar los mensajes en el cliente.
    renderizar(data);
});

const renderizar = (msgs) => {
    let messages = '';

    msgs.forEach(message => {// se itera sobre cada mensaje
        const isCurrentUser = message.user === user;//Para cada mensaje, se compara el nombre de usuario (message.user) con el nombre de usuario actual (user)
        const messageClass = isCurrentUser ? 'mymessage' : 'othermessage';//Si el mensaje fue enviado por el usuario actual, se asigna la clase CSS 'mymessage'; de lo contrario, se asigna la clase 'othermessage'.
        messages = messages + `<div class= "${messageClass}">${message.user} : ${message.message}</div>`//muestra el nombre de usuario y el contenido del mensaje.

    });
    log.innerHTML = messages;
    chatBox.scrollIntoView(false);//ventana del chat se desplace hacia abajo, para que el usuario pueda ver el mensaje más reciente
};

//SweetAlert para mostrar un cuadro de diálogo y solicitar al usuario que se registre con su dirección de correo electrónico
Swal.fire({
    title: "Registrese",
    input: "email",
    text: "Registrese con su correo electronico",
    inputValidator: (value) => {
        if (!value)
            return 'Debes registrarte par continuar';

        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailReg.test(value))
            return 'Ingrese una direccion de correo valida';

        return null;
    },
    allowOutsideClick: false
}).then(result => {
    if (result.isConfirmed) {
        user = result.value;
        renderizar(data);
    }
});

chatBox.addEventListener('keyup', evt => {//escucha del evento donde el ususrio escribio su mensaje
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            const message = chatBox.value;
            socket.emit('message', { user, message });
            chatBox.value = '';//limpiar chat
        }
    }
});

//aviso de nuevo usuario conectado
socket.on('nuevo_user', () => {
    Swal.fire({
        text: 'Nuevo usuario conectado!',
        toast: true,
        position: 'top-right'

    });
});
