import { Level } from "../types";

// LISTA DE NIVELES
// 1. Una columna o fila de 5 numeros
// 2. Una pequeña cruz 5 numeros
// 3. Un cuadro de 6 numeros
// 4. Una letra X de 5 numeros
// 5. Dos cuadrados en diagonales

// 6. Cuatro al cuadrado
// 7. OJO
// 8. La letra F
// 9. Los 8 numeros más alejados del tablero y el centro del tablero
// 10. Una gran aspa de 9 numeros y una cruz de 5 numeros que comience desde el centro

// 11. El numero 1
// 12. Letra 'H' y letra 'I'
// 13. Cuadrado de 9 numeros
// 14. Una piramide de 8 numeros
// 15. Aspa Invertida

// 16. 3 Filas o 3 columnas separadas
// 17. Un diamante invertido
// 18. Una gran cruz de 9 numeros y una letra 'X' de 5 numeros que comience desde el centro
// 19. Escalera de 15 numeros
// 20. Todo el tablero debe estar marcado


// Posiciones de los numeros en el tablero (x, y)
/*
0,4     1,4     2,4     3,4     4,4
0,3     1,3     2,3     3,3     4,3
0,2     1,2     2,2     3,2     4,2
0,1     1,1     2,1     3,1     4,1
0,0     1,0     2,0     3,0     4,0
*/

// Aqui se especifica los niveles, incluyendo los posibles patrones ganadores por cada nivel del juego
export const levels: Level[] = [
    {
        // Nivel
        level: 1,
        // Numero de bolitas o numeros objetivos
        targetQuantity: 3,
        // Texto descriptivo para el patron objetivo
        targetText: "Una columna o una fila de 5 números",
        // Numero de tableros del jugador
        boards: 1,
        // Patrones ganadores (dado por coordenadas)
        patterns: [
            [{ x: 0, y: 4 }, { x: 0, y: 3 }, { x: 0, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }],
            [{ x: 1, y: 4 }, { x: 1, y: 3 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }],
            [{ x: 2, y: 4 }, { x: 2, y: 3 }, { x: 2, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }],
            [{ x: 3, y: 4 }, { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 0 }],
            [{ x: 4, y: 4 }, { x: 4, y: 3 }, { x: 4, y: 2 }, { x: 4, y: 1 }, { x: 4, y: 0 }],

            [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }],
            [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }],
            [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }],
            [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }]

        ],
        // Oponentes automatizados (Bots)
        bots: [
            {
                // Nombre (debe ser único)
                name: "S-Bot",
                // Tiempo de respuesta en milisegundos
                interval: 2400,
                // Número de tableros para el bot
                boards: 1
            }
        ]
    },
    {
        level: 2,
        targetQuantity: 3,
        targetText: "Una cruz de 5 números",
        boards: 1,
        patterns: [

            [{ x: 1, y: 4 }, { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 2 }],
            [{ x: 2, y: 4 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 2, y: 2 }],
            [{ x: 3, y: 4 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 2 }],

            [{ x: 1, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 1 }],
            [{ x: 2, y: 3 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 1 }],
            [{ x: 3, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 1 }],

            [{ x: 1, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }],
            [{ x: 2, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 0 }],
            [{ x: 3, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 3, y: 0 }],

        ],
        bots: [
            {
                name: "S-Bot",
                interval: 1900,
                boards: 1
            },
        ]
    },
    {
        level: 3,
        targetQuantity: 3,
        targetText: "Un rectangulo de 6 números",
        boards: 1,
        patterns: [
            [{ x: 0, y: 4 }, { x: 0, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 3 }],
            [{ x: 0, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 2 }],
            [{ x: 0, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 1 }],
            [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 0 }],
            [{ x: 1, y: 4 }, { x: 1, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 3 }],
            [{ x: 1, y: 3 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 2 }],
            [{ x: 1, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 1 }],
            [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 0 }],
            [{ x: 2, y: 4 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 3 }],
            [{ x: 2, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 2 }],
            [{ x: 2, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 1 }],
            [{ x: 2, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 0 }],
        ],

        bots: [
            {
                name: "M-Bot",
                interval: 1400,
                boards: 1
            }
        ]
    },
    {
        level: 4,
        targetQuantity: 3,
        targetText: "Un aspa de 5 números",
        boards: 1,
        patterns: [
            [{ x: 0, y: 4 }, { x: 2, y: 4 }, { x: 1, y: 3 }, { x: 0, y: 2 }, { x: 2, y: 2 }],
            [{ x: 1, y: 4 }, { x: 3, y: 4 }, { x: 2, y: 3 }, { x: 1, y: 2 }, { x: 3, y: 2 }],
            [{ x: 2, y: 4 }, { x: 4, y: 4 }, { x: 3, y: 3 }, { x: 2, y: 2 }, { x: 4, y: 2 }],
            [{ x: 0, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 2 }, { x: 0, y: 1 }, { x: 2, y: 1 }],
            [{ x: 1, y: 3 }, { x: 3, y: 3 }, { x: 2, y: 2 }, { x: 1, y: 1 }, { x: 3, y: 1 }],
            [{ x: 2, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 2 }, { x: 2, y: 1 }, { x: 4, y: 1 }],
            [{ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 0 }, { x: 2, y: 0 }],
            [{ x: 1, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 3, y: 0 }],
            [{ x: 2, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 1 }, { x: 2, y: 0 }, { x: 4, y: 0 }],
        ],
        // Ahora son 2 bots tipo "Slow"
        bots: [
            {
                name: "S-Bot 1",
                interval: 2100,
                boards: 1
            },
            {
                name: "S-Bot 2",
                interval: 1700,
                boards: 1
            }
        ],
    },
    {
        level: 5,
        targetQuantity: 3,
        targetText: "2 cuadrados de 4 números en 2 diagonales",
        boards: 2,
        patterns: [
            [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 3, y: 1 }, { x: 3, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 0 }],
            [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 3, y: 3 }, { x: 4, y: 3 }],
        ],
        bots: [
            {
                name: "M-Bot",
                interval: 1500,
                boards: 2
            },
        ]
    },
    // A partir de este nivel se muestran 4 números objetivos
    {
        level: 6,
        targetQuantity: 4,
        targetText: "El ojo",
        boards: 1,
        patterns: [
            [
                { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 },
                { x: 0, y: 3 }, { x: 4, y: 3 },
                { x: 0, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 },
                { x: 0, y: 1 }, { x: 4, y: 1 },
                { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
            ]
        ],
        bots: [
            {
                name: "M-Bot",
                interval: 1400,
                boards: 1
            },
            {
                name: "S-Bot",
                interval: 1700,
                boards: 1
            },
        ]
    },
    // TODO: ¿MODIFICAR ESTE NIVEL, ES MUY DIFICIL?
    {
        level: 7,
        targetQuantity: 4,
        /* POSIBLEMENTE SE PUEDE LLAMAR LA LETRA 'L' */
        targetText: "La letra 'F'",
        boards: 1,
        patterns: [
            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
                { x: 0, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
                { x: 0, y: 1 },
                { x: 0, y: 0 },
            ],

            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
                { x: 4, y: 3 },
                { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 4, y: 2 },
                { x: 4, y: 1 },
                { x: 4, y: 0 },
            ],
            [
                { x: 4, y: 4 },
                { x: 4, y: 3 },
                { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 4, y: 1 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
            ],
            [
                { x: 0, y: 4 },
                { x: 0, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
                { x: 0, y: 1 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
            ]
        ],
        bots: [
            // Tu oponente es un bot de alta velocidad
            {
                name: "F-Bot",
                interval: 800,
                boards: 1
            },
            {
                name: "M-Bot",
                interval: 1500,
                boards: 1
            },
        ]
    },
    {
        level: 8,
        targetQuantity: 4,
        targetText: "Ocho cuartos",
        boards: 1,
        // Objetivo: Los 8 numeros más alejados del tablero
        patterns: [
            [
                { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 },
                { x: 0, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 },
                { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 },
            ]
        ],
        bots: [
            // 1 vs 4 bots
            {
                name: "S-Bot 1",
                interval: 1800,
                boards: 1
            },
            {
                name: "S-Bot 2",
                interval: 2000,
                boards: 1
            },
            {
                name: "S-Bot 3",
                interval: 2200,
                boards: 1
            },
            {
                name: "S-Bot 4",
                interval: 1800,
                boards: 1
            },
        ]
    },
    {
        level: 9,
        targetQuantity: 4,
        targetText: "Un cuadrado de 16 números",
        boards: 2,
        patterns: [
            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 },
                { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
                { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
            ],
            [
                { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
                { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
            ],
            [
                { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
                { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
                { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
            ],
            [
                { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
                { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
                { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
            ],
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1500,
                boards: 2
            },
            {
                name: "M-Bot 2",
                interval: 1400,
                boards: 2
            }
        ],
    },


    {
        // Nivel con 2 objetivos en el tablero
        level: 10,
        targetQuantity: 4,
        targetText: "Un aspa de 9 números y una cruz de 5 números que empiece del centro",
        // Objetivo: Una gran aspa de 9 numeros y una cruz de 5 numeros que comience desde el centro
        boards: 2,
        patterns: [
            [
                { x: 0, y: 4 }, { x: 4, y: 4 },
                { x: 1, y: 3 }, { x: 3, y: 3 },
                { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 1, y: 1 }, { x: 3, y: 1 },
                { x: 0, y: 0 }, { x: 4, y: 0 },
            ],
            [
                { x: 0, y: 4 }, { x: 4, y: 4 },
                { x: 1, y: 3 }, { x: 3, y: 3 },
                { x: 2, y: 2 },
                { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
                { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 },
            ],
            [
                { x: 0, y: 4 }, { x: 4, y: 4 },
                { x: 1, y: 3 }, { x: 3, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
                { x: 1, y: 1 }, { x: 3, y: 1 },
                { x: 0, y: 0 }, { x: 4, y: 0 },
            ],
            [
                { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 },
                { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
                { x: 2, y: 2 },
                { x: 1, y: 1 }, { x: 3, y: 1 },
                { x: 0, y: 0 }, { x: 4, y: 0 },
            ],
        ],
        // S - Bot: 2200 - 1600
        // M - Bot: 1500 - 1000
        // F - Bot: 900 - 500
        bots: [
            {
                name: "M-Bot 1",
                interval: 1500,
                boards: 1
            },
            {
                name: "S-Bot",
                interval: 1800,
                boards: 2
            },
            {
                name: "M-Bot 2",
                interval: 1300,
                boards: 1
            },
            {
                name: "F-Bot",
                interval: 900,
                boards: 1
            },
        ]
    },


    // Posiciones anteriores de los numeros en el tablero
    /*
    1   6   11  16  21
    2   7   12  17  22
    3   8   13  18  23
    4   9   14  19  24
    5   10  15  20  25
    */

    // Nueva posición (x,y )
    /*
    0,4     1,4     2,4     3,4     4,4
    0,3     1,3     2,3     3,3     4,3
    0,2     1,2     2,2     3,2     4,2
    0,1     1,1     2,1     3,1     4,1
    0,0     1,0     2,0     3,0     4,0
    */

    {
        level: 11,
        targetQuantity: 4,
        targetText: "El número 1",
        boards: 1,
        // Objetivo: El numero 1
        patterns: [
            [
                { x: 2, y: 4 },
                { x: 1, y: 3 }, { x: 2, y: 3 },
                { x: 2, y: 2 },
                { x: 2, y: 1 },
                { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }
            ],
            [
                { x: 1, y: 4 },
                { x: 0, y: 3 }, { x: 1, y: 3 },
                { x: 1, y: 2 },
                { x: 1, y: 1 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
            ],
            [
                { x: 3, y: 4 },
                { x: 2, y: 3 }, { x: 3, y: 3 },
                { x: 3, y: 2 },
                { x: 3, y: 1 },
                { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }
            ],
        ],
        bots: [
            {
                name: "S-Bot",
                interval: 1900,
                boards: 1
            },
            {
                name: "M-Bot",
                interval: 1400,
                boards: 1
            },
            {
                name: "F-Bot",
                interval: 900,
                boards: 1
            },
        ],
    },
    {
        level: 12,
        targetQuantity: 4,
        targetText: "Las letras 'H' e 'I'",
        // Objetivo: Letra 'H' y letra 'I'
        boards: 2,
        patterns: [
            [
                { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 },
                { x: 0, y: 3 }, { x: 2, y: 3 }, { x: 4, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 },
                { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 },
                { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 },
            ]
        ],
        bots: [
            {
                name: "S-Bot-1",
                interval: 1900,
                boards: 2
            },
            {
                name: "M-Bot-2",
                interval: 1200,
                boards: 1
            },
            {
                name: "M-Bot-1",
                interval: 1400,
                boards: 1
            },
            {
                name: "S-Bot-2",
                interval: 1700,
                boards: 2
            },
        ]
    },
    {
        level: 13,
        // A partir de este nivel son 5 números objetivos
        targetQuantity: 5,
        targetText: "Un cuadrado de 9 números",
        // Objetivo: Cuadrado de 9 numeros
        boards: 1,
        patterns: [
            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 },
                { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
            ],
            [
                { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 },
                { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
                { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
            ],
            [
                { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
                { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
                { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
            ],
            [
                { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
                { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
            ],
            [
                { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
                { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
                { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
            ],
            [
                { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
                { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
            ],
            [
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
                { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
            ],
            [
                { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
                { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
                { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
            ],
            [
                { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
                { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
            ],
        ],
        // 5 BOTS
        bots: [
            {
                name: "F-Bot 1",
                interval: 800,
                boards: 1
            },
            {
                name: "M-Bot 2",
                interval: 1400,
                boards: 1
            },
            {
                name: "S-Bot",
                interval: 2000,
                boards: 2
            },
            {
                name: "M-Bot 1",
                interval: 1500,
                boards: 1
            },
            {
                name: "F-Bot 2",
                interval: 900,
                boards: 1
            }

        ]
    },
    {
        level: 14,
        targetQuantity: 5,
        targetText: "Una piramide simetrica de 8 números",
        // Objetivo: Una piramide de 8 numeros
        boards: 1,
        patterns: [
            [
                { x: 2, y: 2 },
                { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
            ],
            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
                { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
                { x: 2, y: 2 },
            ],
            [
                { x: 0, y: 4 },
                { x: 0, y: 3 }, { x: 1, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
                { x: 0, y: 1 }, { x: 1, y: 1 },
                { x: 0, y: 0 },
            ],
            [
                { x: 4, y: 4 },
                { x: 3, y: 3 }, { x: 4, y: 3 },
                { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 3, y: 1 }, { x: 4, y: 1 },
                { x: 4, y: 0 },
            ],
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1200,
                boards: 2
            },
            {
                name: "F-Bot",
                interval: 800,
                boards: 1
            },
            {
                name: "M-Bot 2",
                interval: 1500,
                boards: 2
            },
        ]
    },
    // A partir de aqui todos los niveles son de 2 tableros para el jugador
    {
        level: 15,
        targetQuantity: 5,
        targetText: "Un aspa a la inversa",
        boards: 2,
        // Objetivo: Aspa Invertida
        patterns: [
            [
                { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 },
                { x: 0, y: 3 }, { x: 2, y: 3 }, { x: 4, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 },
                { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }
            ]
        ],
        bots: [
            {
                name: "S-Bot",
                interval: 2000,
                boards: 1
            },
            {
                name: "M-Bot 1",
                interval: 1500,
                boards: 2
            },
            {
                name: "M-Bot 2",
                interval: 1300,
                boards: 2
            },
            {
                name: "F-Bot",
                interval: 800,
                boards: 1
            },
        ],
    },
    {
        level: 16,
        targetQuantity: 5,
        targetText: "3 filas o 3 columnas separadas",
        // Objetivo: 3 Filas o 3 columnas separadas
        boards: 2,
        patterns: [
            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
            ],
            [
                { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 },
                { x: 0, y: 3 }, { x: 2, y: 3 }, { x: 4, y: 3 },
                { x: 0, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 },
                { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 },
                { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 },
            ],
        ],
        bots: [
            {
                name: "M-Bot",
                interval: 1500,
                boards: 3
            },
            {
                name: "M-Bot",
                interval: 1300,
                boards: 3
            },
        ]
    },
    {
        // Nivel Final
        level: 17,
        targetQuantity: 5,
        targetText: "Un diamante a la inversa",
        // Objetivo: Un diamante invertido
        boards: 2,
        patterns: [
            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
                { x: 0, y: 3 }, { x: 2, y: 3 }, { x: 4, y: 3 },
                { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
                { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
            ]
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1200,
                boards: 1
            },
            {
                name: "S-Bot",
                interval: 1800,
                boards: 1
            },
            {
                name: "M-Bot 2",
                interval: 1500,
                boards: 1
            },
            {
                name: "M-Bot 3",
                interval: 1300,
                boards: 1
            },
            {
                name: "F-Bot 1",
                interval: 700,
                boards: 1
            },
            {
                name: "F-Bot 2",
                interval: 600,
                boards: 1
            }
        ]
    },
    {
        // Nivel con 2 objetivos en el tablero
        level: 18,
        targetQuantity: 5,
        targetText: "Una cruz de 9 números y un aspa de 5 números que comience del centro",
        // Objetivo: Una gran cruz de 9 numeros y una letra 'X' de 5 numeros que comience desde el centro
        // Nota: Existe 4 combinaciones
        boards: 2,
        patterns: [
            [
                { x: 0, y: 4 }, { x: 2, y: 4 },
                { x: 1, y: 3 }, { x: 2, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 2, y: 1 },
                { x: 2, y: 0 },
            ],
            [
                { x: 2, y: 4 }, { x: 4, y: 4 },
                { x: 2, y: 3 }, { x: 3, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 2, y: 1 },
                { x: 2, y: 0 },
            ],
            [
                { x: 2, y: 4 },
                { x: 2, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 2, y: 1 }, { x: 3, y: 1 },
                { x: 2, y: 0 }, { x: 4, y: 0 },
            ],
            [
                { x: 2, y: 4 },
                { x: 2, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 1, y: 1 }, { x: 2, y: 1 },
                { x: 0, y: 0 }, { x: 2, y: 0 },
            ],
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1500,
                boards: 1
            },
            {
                name: "M-Bot 3",
                interval: 1500,
                boards: 3
            },
            {
                name: "F-Bot",
                interval: 900,
                boards: 1
            },
            {
                name: "M-Bot 2",
                interval: 1300,
                boards: 1
            },

        ]
    },
    {
        level: 19,
        targetQuantity: 5,
        targetText: "Una escalera de 15 números",
        // Objetivo: Escalera de 15 numeros
        boards: 2,
        patterns: [
            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
                { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
                { x: 0, y: 1 }, { x: 1, y: 1 },
                { x: 0, y: 0 },
            ],
            [
                { x: 4, y: 4 },
                { x: 3, y: 3 }, { x: 4, y: 3 },
                { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
            ],
            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
                { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
                { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 3, y: 1 }, { x: 4, y: 1 },
                { x: 4, y: 0 },
            ],
            [
                { x: 0, y: 4 },
                { x: 0, y: 3 }, { x: 1, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
                { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
            ],
        ],
        bots: [
            {
                name: "F-Bot 1",
                interval: 900,
                boards: 1
            },
            {
                name: "F-Bot 2",
                interval: 800,
                boards: 1
            },
            {
                name: "M-Bot 1",
                interval: 1400,
                boards: 1
            },
            {
                name: "M-Bot 2",
                interval: 1300,
                boards: 1
            },
        ]
    },
    {
        // Nivel Final
        level: 20,
        targetQuantity: 7,
        targetText: "Marca todo el tablero",
        boards: 2,
        // Objetivo: Todo el tablero debe estar marcado
        patterns: [
            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
                { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
                { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
            ]
        ],
        bots: [
            // 8 BOTS
            {
                name: "M-Bot 1",
                interval: 1200,
                boards: 1
            },
            {
                name: "S-Bot 1",
                interval: 1800,
                boards: 1
            },
            {
                name: "F-Bot 1",
                interval: 700,
                boards: 1
            },
            {
                name: "M-Bot 2",
                interval: 1500,
                boards: 2
            },
            {
                name: "M-Bot 3",
                interval: 1300,
                boards: 1
            },
            {
                name: "F-Bot 2",
                interval: 600,
                boards: 2
            },
            {
                name: "S-Bot 2",
                interval: 2000,
                boards: 1
            },
            {
                name: "F-Bot 3",
                interval: 800,
                boards: 1
            },
        ]
    },
]






// Esto es un tablero de bingo de 5 * 5
// 1   6  11  16  21
// 2   7  12  17  22
// 3   8  13  18  23
// 4   9  14  19  24
// 5  10  15  20  25






// NUEVAS IDEAS PARA NIVELES
// Niveles con hasta 4 bots a la vez
// Bots con un tiempo de respuesta minimo de 0.5 segundos (más rapido)
// Patrones unicos (solamente 1 combincación o patrón)
// Aumentar el numero de objetivos de 3 a 4 o 5 (maximo)
// ¿Nivel final es marcar todos los numeros del tablero?








// https://stackoverflow.com/questions/35435042/how-can-i-define-an-array-of-objects
// https://stackoverflow.com/questions/23161486/create-strongly-typed-array-of-arrays-in-typescript

// PODRIA SERVIR
// https://github.com/nsamelson/AIGameRunner/blob/a51fad7b8ed9ffeb3c972ccb65c29030c2b9985e/public/games/quixo.js

