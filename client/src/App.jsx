import "./App.css";
import io from "socket.io-client";

// Puente de conexion, para escuchar eventos y enviar eventos.
const socket = io("http://localhost:4000");

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
