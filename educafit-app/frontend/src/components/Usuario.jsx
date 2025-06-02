export default function Usuario({ usuario }) {
  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {usuario.nombre}</p>
      <p>Nombre de usuario: {usuario.nombre_usuario}</p>
    </div>
  );
}
