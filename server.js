const io = require('socket.io')(3000, {
    cors: {
        origin: '*',
    }
});

const users = {};

io.on("connection", socket => {

    // When a new user joins, save their name
    socket.on("new-user", name => {
        users[socket.id] = name;
        socket.broadcast.emit("user-connected", name);
    });

    // When a user sends a message, broadcast it with their name
    socket.on("send-chat-message", message => {
        socket.broadcast.emit("chat-message", {
            message: message,
            name: users[socket.id]
        });
    });

    // When a user disconnects, inform others
    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", users[socket.id]);
        delete users[socket.id];
    });
});
