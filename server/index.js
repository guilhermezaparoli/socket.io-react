const http = require("http")
const express = require("express")
const {Server} = require("socket.io")
const cors = require("cors")
const app = express()

const server = http.createServer(app)
app.use(cors)
const io = new Server(server, 
    {
        cors: {
            origin: "*"
        }
    }
)

io.on("connection", (socket) => {
console.log(socket.id);
socket.on("join_room", (room) => {

    socket.join(room)
})
    socket.on("send_message", (message, room) => {


           
        socket.to(room).emit("recieved_message", message)
    })
})


server.listen(3001, () => {
    console.log("server is running")
})