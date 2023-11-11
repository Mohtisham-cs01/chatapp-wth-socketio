// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.static("public"));

// const PORT = process.env.PORT || 3000;

// io.on("connection", (socket) => {
//     socket.on("new-user", (userName) => {
//         socket.broadcast.emit("receive-message", {
//             userName: "System",
//             message: `${userName} has joined the chat.`,
//         });
//     });

//     socket.on("send-message", (message) => {
//         socket.broadcast.emit("receive-message", {
//             userName: socket.id, // You can use a user ID or another identifier
//             message: message,
//         });
//     });
// });

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
    socket.on("new-user", (userName) => {
        // Broadcast to all connected clients that a new user has joined
        socket.broadcast.emit("receive-message", {
            userName: "System",
            message: `${userName} has joined the chat.`,
        });
    });

    socket.on("send-message", (data) => {
        const { userName, message } = data;
        // Broadcast the received message to all connected clients
        socket.broadcast.emit("receive-message", { userName, message });
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
