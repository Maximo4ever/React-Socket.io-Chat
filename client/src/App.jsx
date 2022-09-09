import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

// Puente de conexion, para escuchar eventos y enviar eventos.
const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    // Envia el mensaje al backend
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    // Escucha el mensaje enviado o recibido
    const receiveMessage = (message) => {
      console.log(message);
    };
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
