const { Server } = require("socket.io"),
server = new Server(8000);

let whatsappClients = new Map();

server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    whatsappClients.set(socket, {number:""});

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        whatsappClients.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on("connected", (data)=>{
        whatsappClients.get(socket).number = data
        console.log(whatsappClients.get(socket).number)
    });

    
    socket.on("msgToServer", (data)=>{
        for (const [client, info] of whatsappClients.entries()) {
            console.log(info)
            if(info.number == data.numberToSend){
                client.emit("msgToReceive", data.msg);
            }
        }
    })
});