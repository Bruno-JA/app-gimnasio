import React, { useEffect, useState } from "react";
import "./Educafit.css";
import TarjetaEjercicio from "./TarjetaEjercicio";
import DetalleEjercicio from "./DetalleEjercicio";

export default function Educafit() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("pecho");
  const [busqueda, setBusqueda] = useState("");
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
  const [ejercicios, setEjercicios] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const categorias = [
    { id: "pecho", nombre: "Pecho", muscleId: 4 },
    { id: "piernas", nombre: "Piernas", muscleId: 10 },
    { id: "espalda", nombre: "Espalda", muscleId: 12 },
    { id: "hombros", nombre: "Hombros", muscleId: 2 },
    { id: "brazos", nombre: "Brazos", muscleId: 5 }, // Triceps como ejemplo
    { id: "core", nombre: "Core", muscleId: 6 },
    { id: "favoritos", nombre: "Favoritos ⭐", muscleId: null }
  ];

  const muscleId = categorias.find(cat => cat.id === categoriaSeleccionada)?.muscleId;

  useEffect(() => {
  if (!muscleId) return; // No hacemos petición para favoritos aún

  fetch(`https://wger.de/api/v2/exerciseinfo/?muscles=${muscleId}&language=4&limit=50`, {
    headers: {
      Authorization: "Token c361a66e93dadfed7fcaa62c018a2356cfa86bcd"
    }
  })
    .then(res => res.json())
    .then(data => {
      const ejerciciosFormateados = data.results
        .map(ej => {
          const traduccion = ej.translations.find(t => t.language === 4 || t.language === 2); // Español o Inglés
          const instrucciones = traduccion?.description
            ?.split(".")
            .map(i => i.trim())
            .filter(i => i.length > 0);

          return {
            id: ej.id,
            nombre: traduccion?.name?.trim(),
            imagen: ej.images[0]?.image,
            grupo_principal: ej.category.name,
            grupos_secundarios: ej.muscles_secondary.map(m => m.name),
            equipamiento: ej.equipment.map(e => e.name).join(", "),
            instrucciones
          };
        })
        .filter(
          ej =>
            ej.nombre &&
            ej.imagen &&
            ej.instrucciones &&
            ej.instrucciones.length > 0
        ); // Solo incluir si tiene nombre, imagen e instrucciones

      setEjercicios(ejerciciosFormateados);
    });
}, [muscleId]);


  // Filtrar ejercicios en la categoría seleccionada
  const ejerciciosFiltrados = ejercicios.filter(ej =>
    ej.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="educafit-contenedor">
      <aside className="menu-lateral">
        <div className="saludo-usuario">
          <p>Hola, {usuario?.nombre || "usuario"}</p>
        </div>
        <nav className="lista-categorias">
          {categorias.map((categoria) => (
            <React.Fragment key={categoria.id}>
              {categoria.id === "favoritos" && <hr className="separador-categorias" />}
              <button
                className={categoriaSeleccionada === categoria.id ? "activa" : ""}
                onClick={() => {
                  setCategoriaSeleccionada(categoria.id);
                  setEjercicioSeleccionado(null);
                }}
              >
                {categoria.nombre}
              </button>
            </React.Fragment>
          ))}
        </nav>
      </aside>

      <main className="ventana-contenido">
        <div className="barra-busqueda">
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            className="input-busqueda"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {ejercicioSeleccionado ? (
          <DetalleEjercicio
            ejercicio={ejercicioSeleccionado}
            onVolver={() => setEjercicioSeleccionado(null)}
          />
        ) : (
          <div className="contenido-ejercicios">
            {ejerciciosFiltrados.map((ejercicio) => (
              <TarjetaEjercicio
                key={ejercicio.id}
                ejercicio={ejercicio}
                onClick={() => setEjercicioSeleccionado(ejercicio)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
