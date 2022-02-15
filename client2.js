const io = require("socket.io-client"), ioClient = io.connect("http://localhost:8000")
setTimeout(()=>{
ioClient.emit("connected", "3197888885")
//ioClient.emit("msgToServer", {"numberToSend": "3197888885", "msg": "Hola tales"})
ioClient.on("msgToReceive", (msg) => console.info(msg));
},1000)
