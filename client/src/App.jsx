import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

// Puente de conexion, para ESCUCHAR y ENVIAR eventos.
const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      body: "Say hello",
      from: "Random User",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envia el mensaje al backend
    socket.emit("message", message);
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    // Escucha el mensaje recibido
    const receiveMessage = (message) => {
      console.log(message);
      setMessages([
        ...messages,
        {
          body: message.body,
          from: message.from,
        },
      ]);
    };
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

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
      {messages.map((message, index) => (
        <div key={index}>
          <p>
            {message.from}: {message.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
