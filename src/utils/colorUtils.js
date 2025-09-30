/**
 * Gera uma cor hexadecimal vibrante e legível a partir de uma string.
 * A mesma string de entrada sempre produzirá a mesma cor de saída.
 * @param {string} str - A string para converter em cor (ex: nome do usuário).
 * @returns {string} - O código da cor em formato HSL (ex: "hsl(150, 70%, 45%)").
 */
export function generateColorFromString(str) {
  if (!str) {
    // Retorna uma cor neutra caso a string seja nula ou vazia.
    return 'hsl(210, 10%, 85%)'; 
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // Operação bitwise para criar um hash a partir da string.
    // O '<< 5' (bitwise left shift) é uma forma rápida de multiplicar por 32.
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Garante que o valor se mantenha como um inteiro de 32 bits.
  }

  // Define um HUE (matiz) entre 0 e 360 com base no hash.
  const hue = hash % 360;
  
  // Usamos valores fixos de saturação e luminosidade para garantir cores vibrantes
  // e com bom contraste com o texto branco.
  const saturation = '70%';
  const lightness = '45%';

  return `hsl(${hue}, ${saturation}, ${lightness})`;
}
