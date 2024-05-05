const socket = io();

let user;
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('messageLogs');
let data;

socket.on('message', msgs => {
    data = msgs;
});

socket.on('messageLogs', data => {
    renderizar(data);
});

const renderizar = (msgs) => {
    let messages = '';

    msgs.forEach(message => {
        const isCurrentUser = message.user === user;
        const messageClass = isCurrentUser ? 'mymessage' : 'othermessage';
        messages = messages + `<div class= "${messageClass}">${message.user} : ${message.message}</div>`

    });
    log.innerHTML = messages;
    chatBox.scrollIntoView(false);
};


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

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            const message = chatBox.value;
            socket.emit('message', { user, message });
            chatBox.value = '';
        }
    }
});

socket.on('nuevo_user', () => {
    Swal.fire({
        text: 'Nuevo usuario conectado!',
        toast: true,
        position: 'top-right'

    });
});
