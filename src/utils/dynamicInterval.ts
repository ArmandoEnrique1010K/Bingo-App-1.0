// Genera un intervalo dinamico para el tiempo de respuesta del bot
export const dynamicInterval = () => {
    // Devuelve un numero aleatorio entre 0.7 y 2
    return Math.random() * (2 - 0.7) + 0.7
}