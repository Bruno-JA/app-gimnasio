import { useState } from "react";
import './Registro.css';

export default function Registro() {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre_usuario: "",
    contraseña: "",
    nombre: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'exito' o 'error'
  
  const handleChange = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTipoMensaje("");

    const res = await fetch("../backend/registro.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosFormulario),
    });

    const data = await res.json();
    setMensaje(data.message);
    setTipoMensaje(data.success ? "exito" : "error");
  };

  return (
    <div className="form-registro">
      <img src="http://54.166.238.133/app-gimnasio/educafit-app/frontend/src/assets/logo_app_fitness.png" 
      alt="Logo" 
      className="logo-login"/>
      <h2>Registro</h2>
      <form onSubmit={registrarUsuario}>
        <input
          type="text"
          name="nombre_usuario"
          placeholder="Usuario"
          value={datosFormulario.nombre_usuario}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={datosFormulario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={datosFormulario.contraseña}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && (
        <p className={`mensaje ${tipoMensaje}`}>{mensaje}</p>
      )}
    </div>
  );
}
