import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function App() {
  // Inicializa state para armazenar os dados
  const [marvel, setMarvel] = useState("");

  useEffect(() => {
    // Assumo que o componente esta montado
    let criado = true;

    // Carrego os dados
    const loadData = async () => {
      const keyPublic = "6c377dd4a33872ac14cc899086a7c111";
      const hash = "9d25caf7b7fae94a702ac510573524d0";
      const ts = 5;

      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?apikey=${keyPublic}&ts=${ts}&hash=${hash}`
      );

      // Verifica se o componente continua sendo montado
      if (criado) {
        setMarvel(response.data.data.results);
      }
    };
    loadData();

    return () => {
      // Finalizado, seto variavel como falso
      criado = false;
    };
  });

  if (!marvel) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="App">
      <h1>API Marvel Teste</h1>
      <ul>
        {marvel.map(itens => (
          <div>
            <li key={itens.id}>{itens.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
