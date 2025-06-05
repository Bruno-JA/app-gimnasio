import { useState } from "react";
import './Registro.css';

export default function Login({ alIniciarSesion }) {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre_usuario: "",
    contraseña: ""
  });
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'exito' o 'error'

  const cambiarCampo = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTipoMensaje("");

    const res = await fetch("backend/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosFormulario)
    });

    const data = await res.json();

    setMensaje(data.message);
    setTipoMensaje(data.success ? "exito" : "error");

    if (data.success) {
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      if (alIniciarSesion) alIniciarSesion(data.usuario);
    }
  };

  return (
    <div className="form-registro">
      <img src="src/assets/logo_app_fitness.png" 
      alt="Logo" 
      className="logo-login"/>
      <h2>Iniciar sesión</h2>
      <form onSubmit={enviarFormulario}>
        <input
          type="text"
          name="nombre_usuario"
          placeholder="Usuario"
          value={datosFormulario.nombre_usuario}
          onChange={cambiarCampo}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={datosFormulario.contraseña}
          onChange={cambiarCampo}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {mensaje && <p className={`mensaje ${tipoMensaje}`}>{mensaje}</p>}
    </div>
  );
}


