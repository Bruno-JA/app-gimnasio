export function formatearFechaLocal(date) {
  const año = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const día = String(date.getDate()).padStart(2, '0');
  return `${año}-${mes}-${día}`;
}