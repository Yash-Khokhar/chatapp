const socket = io('http://localhost:8000',{transports:['websocket']});

//get dom elements in respective js variables

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

//audio that will play on receiving message

var audio =new Audio('ting.mp3');

//functions which will append event info to the container

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){

        audio.play();
    }

}


//ask user for his/her name and let server know

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//if new user joins, receive his/her name from server

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

//if server sends a message, receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

//if a user leave the chat, append the info to the container
socket.on('left', name=>{
    append(`${name} left the chat`, 'right')
})

//if the form get submitted, send server the messages

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value =''

})