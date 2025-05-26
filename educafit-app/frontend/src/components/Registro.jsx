import { useState } from "react";
import './Registro.css';

export default function Registro() {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre_usuario: "",
    contraseña: "",
    nombre: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    setMensaje("");

    const res = await fetch("http://localhost/app-gimnasio/educafit-app/backend/registro.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosFormulario),
    });

    const data = await res.json();
    setMensaje(data.message);
  };

  return (
    <div className="form-registro">
      <h2>Registro</h2>
      <form onSubmit={registrarUsuario}>
        <input type="text" name="nombre_usuario" placeholder="Nombre de usuario" value={datosFormulario.nombre_usuario} onChange={handleChange} required />
        <input type="text" name="nombre" placeholder="Nombre real" value={datosFormulario.nombre} onChange={handleChange} required />
        <input type="password" name="contraseña" placeholder="Contraseña" value={datosFormulario.contraseña} onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
