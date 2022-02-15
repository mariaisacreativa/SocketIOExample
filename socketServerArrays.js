const { Server } = require("socket.io"),
server = new Server(8000);

let whatsappClients = [];

server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    whatsappClients.push({socket});

    socket.on("disconnect", () => {
        whatsappClients = whatsappClients.filter(item => item.socket != socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on("connected", (data)=>{
        whatsappClients.find(item =>item.socket == socket).number = data
        console.log(whatsappClients)
    });
    
    socket.on("msgToServer", (data)=>{
        //{numberToSend, msg}
        console.log(data)
        whatsappClients.find(item => item.number == data.numberToSend)?.socket.emit("msgToReceive", data.msg);
    })
});