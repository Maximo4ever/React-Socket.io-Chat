import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    // Permite que el servidor se conecte con el Frontend
    origin: "*",
  },
});
// Middlewares
app.use(cors());
app.use(morgan("dev"));

// Se ejecuta cuando ocurra el evento de conexion
io.on("connection", (socket) => {
  console.log("A user connected, ID: " + socket.id);
  // Escucha el mensaje emitido por el Frontend
  socket.on("message", (message) => {
    console.log(message);
    // Envialo a los demas clientes (Front)
    socket.broadcast.emit("message", message);
  });
});

server.listen(PORT);
console.log("Server Listening in port " + PORT);
