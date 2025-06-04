import React, { useState } from "react";
import "./Herramientas.css";

export default function Herramientas() {
  const [tipoHerramienta, setTipoHerramienta] = useState("1rm");
  const [peso, setPeso] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [altura, setAltura] = useState("");
  const [pesoCorporal, setPesoCorporal] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular1RM = () => {
    const p = parseFloat(peso);
    const r = parseInt(repeticiones);
    if (p && r) {
      const estimado = r > 1 ? p * (1 + r / 30) : p;
      setResultado(`${estimado.toFixed(1)} kg (1RM estimado)`);
    }
  };

  const calcularIMC = () => {
    const alturaM = parseFloat(altura) / 100;
    const pesoNum = parseFloat(pesoCorporal);
    if (alturaM && pesoNum) {
      const imc = pesoNum / (alturaM * alturaM);
      setResultado(`${imc.toFixed(2)} (IMC)`);
    }
  };

  const manejarCalculo = () => {
    setResultado(null);
    switch (tipoHerramienta) {
      case "1rm":
        calcular1RM();
        break;
      case "imc":
        calcularIMC();
        break;
      default:
        break;
    }
  };

  return (
    <div className="ventana-herramienta">
      <h2>Herramientas de cálculo</h2>

      <div className="selector-herramienta">
        <label>Selecciona herramienta:</label>
        <select
          value={tipoHerramienta}
          onChange={(e) => {
            setTipoHerramienta(e.target.value);
            setResultado(null);
          }}
        >
          <option value="1rm">Cálculo de 1RM</option>
          <option value="imc">Cálculo de IMC</option>
        </select>
      </div>

      {/* Formulario para 1RM */}
      {tipoHerramienta === "1rm" && (
        <div className="formulario-herramienta">
          <label>
            Peso levantado (kg):
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </label>
          <label>
            Repeticiones:
            <input
              type="number"
              value={repeticiones}
              onChange={(e) => setRepeticiones(e.target.value)}
            />
          </label>
          <button onClick={manejarCalculo}>Calcular</button>
        </div>
      )}

      {/* Formulario para IMC */}
      {tipoHerramienta === "imc" && (
        <div className="formulario-herramienta">
          <label>
            Altura (cm):
            <input
              type="number"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
            />
          </label>
          <label>
            Peso corporal (kg):
            <input
              type="number"
              value={pesoCorporal}
              onChange={(e) => setPesoCorporal(e.target.value)}
            />
          </label>
          <button onClick={manejarCalculo}>Calcular</button>
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div className="resultado">
          <strong>Resultado:</strong> {resultado}
        </div>
      )}
    </div>
  );
}
