const { Server } = require("socket.io");
const { faker } = require('@faker-js/faker');

const io = new Server({ cors: { origin: ["http://localhost:4200"] } });

io.on("connection", (socket) => {
    // ...
    console.log("Connected")
    socket.on("send-event", (message) => {
        console.log(message)
        socket.broadcast.emit("new-email", message);
    })

    setInterval(() => {
        // socket.emit("new-email", { message: faker.git.commitMessage(), sender: "Server" })
        socket.to("private").emit("new-email", { message: faker.git.commitMessage(), sender: "Server" })
    }, 5000);
});

io.listen(3000);