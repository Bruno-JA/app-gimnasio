import { useState } from "react";
import './Registro.css';

export default function Login({ onLoginSuccess }) {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre_usuario: "",
    contraseña: ""
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const res = await fetch("http://localhost/app-gimnasio/educafit-app/backend/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosFormulario)
    });

    const data = await res.json();

    if (data.success) {
      setMensaje("¡Bienvenido, " + data.usuario.nombre + "!");
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      if (onLoginSuccess) onLoginSuccess(data.usuario);
    } else {
      setMensaje(data.message);
    }
  };

  return (
    <div className="form-registro">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre_usuario"
          placeholder="Nombre de usuario"
          value={datosFormulario.nombre_usuario}
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
        <button type="submit">Entrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
