export function capitalizeFirstLetter(string) {
  if (!string) return string; // Перевірка, чи рядок не порожній
  return string.charAt(0).toUpperCase() + string.slice(1);
}
