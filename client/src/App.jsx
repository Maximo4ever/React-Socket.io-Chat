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
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-10/12 max-w-md bg-zinc-900 p-10"
      >
        <h1 className="text-2xl mb-1">Chat App</h1>
        <ul className="h-[36rem] overflow-y-auto overscroll-y-none">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`my-2 table p-2 ${
                message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-slate-600"
              }`}
            >
              <p>
                <span className={`mr-1 font-semibold`}>{message.from}:</span>
                {message.body}
              </p>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="border-2 border-zinc-500 p-2 text-black w-4/5 mt-6"
        />
        <button className="bg-blue-500 w-1/5 py-2">Send</button>
      </form>
    </div>
  );
}

export default App;
