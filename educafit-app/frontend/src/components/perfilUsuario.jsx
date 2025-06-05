import React, { useEffect, useState } from "react";

export default function PerfilUsuario({ usuario }) {
  const [formulario, setFormulario] = useState({
    fecha_nacimiento: "",
    altura_cm: "",
    peso_kg: ""
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Llamada para obtener los datos actuales del usuario
    fetch(`backend/obtenerDatosUsuario.php?id_usuario=${usuario.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFormulario({
            fecha_nacimiento: data.datos.fecha_nacimiento || "",
            altura_cm: data.datos.altura_cm || "",
            peso_kg: data.datos.peso_kg || ""
          });
        }
      });
  }, [usuario.id]);

  const handleChange = e => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch("backend/actualizarDatosUsuario.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_usuario: usuario.id,
        ...formulario
      })
    })
      .then(res => res.json())
      .then(data => {
        setMensaje(data.message);
      });
  };

  return (
    <div className="contenedor-formulario">
      <h2>Perfil de usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha de nacimiento:</label>
        <input type="date" name="fecha_nacimiento" value={formulario.fecha_nacimiento} onChange={handleChange} />

        <label>Altura (cm):</label>
        <input type="number" name="altura_cm" value={formulario.altura_cm} onChange={handleChange} />

        <label>Peso (kg):</label>
        <input type="number" name="peso_kg" value={formulario.peso_kg} onChange={handleChange} />

        <button type="submit">Guardar cambios</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
