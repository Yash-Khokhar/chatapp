//Node server which will handel Node server

const io= require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    //if any new user join , let other users connected to the  server know!
    socket.on('new-user-joined', name =>{
      
        users[socket.id]= name;
        socket.broadcast.emit('user-joined', name)
      
    });
    //if someone sends a message , broadcast it to other people

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    //if someone leaves the chat , let other knows
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})