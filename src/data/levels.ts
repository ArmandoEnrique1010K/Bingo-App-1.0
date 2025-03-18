import { Level } from "../types";

// Posiciones de los numeros en el tablero
/*
1   6   11  16  21
2   7   12  17  22
3   8   13  18  23
4   9   14  19  24
5   10  15  20  25
*/

// S - Bot: 2200 - 1600
// M - Bot: 1500 - 1000
// F - Bot: 900 - 500


// BLUE (5 números)
// 1. COLUMNA O FILA DE 5 NÚMEROS
// 2. CRUZ DE 5 NÚMEROS
// 3. RECTANGULO DE 6 NÚMEROS   -- 1 POTENCIADOR:
// 4. ASPA DE 5 NÚMEROS
// 5. SIMBOLO DE POTENCIA

// VIOLET (un tablero extra)
// ESQUINA DE 90 GRADOS
// 2 CUADRADOS EN 2 ESQUINAS
// OJO DEL CENTRO
// MATRIZ DE 8 NÚMEROS
// DOS COLUMNAS --> 10 PATRONES

// GREEN (más bots)
// ASPA DE 9 NÚMEROS
// CUADRADO DE 16 NÚMEROS
// NÚMERO 1
// ANILLO DE 8 NÚMEROS
// LETRA H Y LETRA I

// YELLOW (al menos 4 patrones)
// SEÑAL DE SALIDA
// CUADRADO DE 9 NÚMEROS
// PIRAMIDE SIMETRICA DE 8 NÚMEROS
// LETRA Z O LETRA N
// ASPA INVERTIDA

// ORANGE (patrones unicos)
// 3 FILAS O 3 COLUMNAS SEPARADAS
// DIAMANTE INVERTIDO
// SIMBOLO DE PORCENTAJE (%)
// NÚMERO 4
// COPO DE NIEVE

// RED (todos tienen 2 tableros)
// LA PARCA
// DISEÑO (2 PATRONES)
// ASTERISCO
// ESCALERA DE 15 NÚMEROS
// MARCA TODO EL TABLERO




// Aqui se especifica los niveles, incluyendo los posibles patrones ganadores por cada nivel del juego
export const levels: Level[] = [
    {
        // Nivel
        level: 1,
        // TODO: targetQuantity SE DEBERA ELIMINAR EN UNA FUTURA ACTUALIZACIÓN, TODOS LOS NIVELES DEBERAN TENER 3 OBJETIVOS
        // Numero de bolitas o numeros objetivos 

        // Texto descriptivo para el patron objetivo
        targetText: "Columna o una fila de 5 números",
        // Numero de tableros del jugador
        boards: 1,
        // Patrones ganadores (dado por coordenadas)
        patterns: [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            [5, 10, 15, 20, 25],
        ],
        // Oponentes automatizados (Bots)
        bots: [
            {
                // Nombre (debe ser único)
                name: "S-Bot",
                // Tiempo de respuesta en milisegundos
                interval: 100,
                // Número de tableros para el bot (maximo: 3)
                boards: 1
            },
            // BOT DE PRUEBA
            // {
            //     name: "S-BOT 2",
            //     interval: 2000,
            //     boards: 3
            // }
        ],
        color: 'blue',
        music: 'tap_out'
    },
    {
        level: 2,
        targetText: "Cruz de 5 números",
        boards: 1,
        patterns: [
            [6, 2, 7, 12, 8],
            [11, 7, 12, 17, 13],
            [16, 12, 17, 22, 18],

            [7, 3, 8, 13, 9],
            [12, 8, 13, 18, 14],
            [17, 13, 18, 23, 19],

            [8, 4, 9, 14, 10],
            [13, 9, 14, 19, 15],
            [18, 14, 19, 24, 20],
        ],
        bots: [
            {
                name: "S-Bot",
                interval: 1900,
                boards: 1
            },
        ],
        color: 'blue',
        music: 'tap_out'
    },
    {
        level: 3,
        targetText: "Rectangulo de 6 números",
        boards: 1,
        patterns: [
            [1, 2, 6, 7, 11, 12],
            [2, 3, 7, 8, 12, 13],
            [3, 4, 8, 9, 13, 14],
            [4, 5, 9, 10, 14, 15],

            [6, 7, 11, 12, 16, 17],
            [7, 8, 12, 13, 17, 18],
            [8, 9, 13, 14, 18, 19],
            [9, 10, 14, 15, 19, 20],

            [11, 12, 16, 17, 21, 22],
            [12, 13, 17, 18, 22, 23],
            [13, 14, 18, 19, 23, 24],
            [14, 15, 19, 20, 24, 25],
        ],
        bots: [
            {
                name: "M-Bot",
                interval: 1400,
                boards: 1
            }
        ],
        color: 'blue',
        music: 'tap_out'
    },
    {
        level: 4,
        targetText: "Aspa de 5 números",
        boards: 1,
        patterns: [
            [1, 11, 7, 3, 13],
            [6, 16, 12, 8, 18],
            [11, 21, 17, 13, 23],
            [2, 12, 8, 4, 14],
            [7, 17, 13, 9, 19],
            [12, 22, 18, 14, 24],
            [3, 13, 9, 5, 15],
            [8, 18, 14, 10, 20],
            [13, 23, 19, 15, 25],
        ],
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
        color: 'blue',
        music: 'tap_out'
    },
    {
        level: 5,
        targetText: "Simbolo de potencia",
        boards: 1,
        patterns: [
            [3, 7, 11, 17, 23],
            [4, 8, 12, 18, 24],
            [5, 9, 13, 19, 25]
        ],
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
        color: 'blue',
        music: 'tap_out'
    },
    {
        level: 6,
        targetText: "Esquina de 90 grados",
        boards: 1,
        patterns: [
            [
                1, 6, 11, 16, 21,
                2,
                3,
                4,
                5,
            ],
            [
                1, 6, 11, 16, 21,
                22,
                23,
                24,
                25
            ],
            [
                21,
                22,
                23,
                24,
                5, 10, 15, 20, 25
            ],
            [
                1,
                2,
                3,
                4,
                5, 10, 15, 20, 25
            ]
        ],
        // TODO: CAMBIAR LOS BOTS
        bots: [
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
        ],
        color: 'violet',
        music: 'tap_out'
    },
    {
        level: 7,
        targetText: "2 cuadrados en 2 esquinas",
        boards: 2,
        patterns: [
            [1, 6, 2, 7, 16, 21, 17, 22],
            [1, 6, 2, 7, 19, 24, 20, 25],
            [4, 9, 5, 10, 16, 21, 17, 22],
            [4, 9, 5, 10, 19, 24, 20, 25],
            [1, 6, 2, 7, 4, 9, 5, 10],
            [16, 21, 17, 22, 19, 24, 20, 25],
        ],
        bots: [
            {
                name: "M-Bot",
                interval: 1500,
                boards: 2
            },
        ],
        color: 'violet',
        music: 'tap_out'
    },
    {
        level: 8,
        targetText: "Ojo en el centro",
        boards: 1,
        patterns: [
            [
                6, 11, 16,
                2, 22,
                3, 13, 23,
                4, 24,
                10, 15, 20,
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
        ],
        color: 'violet',
        music: 'tap_out'
    },
    {
        level: 9,
        targetText: "Matriz de 9 números",
        boards: 1,
        patterns: [
            [
                1, 11, 21,
                3, 13, 23,
                5, 15, 25
            ]
        ],
        bots: [
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
        ],
        color: 'violet',
        music: 'tap_out'
    },
    {
        level: 10,
        targetText: "Dos filas de 10 números",
        boards: 1,
        patterns: [
            [1, 6, 11, 16, 21, 2, 7, 12, 17, 22],
            [1, 6, 11, 16, 21, 3, 8, 13, 18, 23],
            [1, 6, 11, 16, 21, 4, 9, 14, 19, 24],
            [1, 6, 11, 16, 21, 5, 10, 15, 20, 25],
            [2, 7, 12, 17, 22, 3, 8, 13, 18, 23],
            [2, 7, 12, 17, 22, 4, 9, 14, 19, 24],
            [2, 7, 12, 17, 22, 5, 10, 15, 20, 25],
            [3, 8, 13, 18, 23, 4, 9, 14, 19, 24],
            [3, 8, 13, 18, 23, 5, 10, 15, 20, 25],
            [4, 9, 14, 19, 24, 5, 10, 15, 20, 25],
        ],
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
        color: 'violet',
        music: 'tap_out'
    },
    {
        level: 11,
        targetText: "Aspa de 9 números",
        boards: 2,
        patterns: [
            [
                1, 21,
                7, 17,
                13,
                9, 19,
                5, 25,
            ],
        ],
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
        ],
        color: 'green',
        music: 'tap_out'
    },


    // TODO: ¿MODIFICAR ESTE NIVEL, ES MUY DIFICIL?
    {
        level: 12,
        targetText: "Cuadrado de 16 números",
        boards: 2,
        patterns: [
            [1, 6, 11, 16, 2, 7, 12, 17,
                3, 8, 13, 18, 4, 9, 14, 19],
            [2, 7, 12, 17, 3, 8, 13, 18,
                4, 9, 14, 19, 5, 10, 15, 20],
            [6, 11, 16, 21, 7, 12, 17, 22,
                8, 13, 18, 23, 9, 14, 19, 24],
            [7, 12, 17, 22, 8, 13, 18, 23,
                9, 14, 19, 24, 10, 15, 20, 25],
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
        color: 'green',
        music: 'tap_out'
    },
    {
        level: 13,
        targetText: "Número 1",
        boards: 1,
        patterns: [
            [6, 2, 7, 8, 9, 5, 10, 15],
            [11, 7, 12, 13, 14, 10, 15, 20],
            [16, 12, 17, 18, 19, 15, 20, 25]
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
        color: 'green',
        music: 'tap_out'
    },
    {
        level: 14,
        targetText: "Anillo de 8 números",
        boards: 1,
        patterns: [
            [1, 6, 11, 2, 12, 3, 8, 13],
            [2, 7, 12, 3, 13, 4, 9, 14],
            [3, 8, 13, 4, 14, 5, 10, 15],
            [6, 11, 16, 7, 17, 8, 13, 18],
            [7, 12, 17, 8, 18, 9, 14, 19],
            [8, 13, 18, 9, 19, 10, 15, 20],
            [11, 12, 13, 16, 18, 21, 22, 23],
            [12, 13, 14, 17, 19, 22, 23, 24],
            [13, 14, 15, 18, 20, 23, 24, 25]
        ],
        bots: [
            {
                name: "S-Bot",
                interval: 1900,
                boards: 1
            },
        ],
        color: 'green',
        music: 'tap_out'
    },
    {
        level: 15,
        targetText: "Letras 'H' e 'I'",
        boards: 2,
        patterns: [
            [
                1, 11, 21,
                2, 12, 22,
                3, 8, 13, 23,
                4, 14, 24,
                5, 15, 25,
            ]
        ],

        bots: [
            {
                name: "S-Bot 1",
                interval: 1900,
                boards: 2
            },
            {
                name: "M-Bot 2",
                interval: 1200,
                boards: 1
            },
            {
                name: "M-Bot 1",
                interval: 1400,
                boards: 1
            },
            {
                name: "S-Bot 2",
                interval: 1700,
                boards: 2
            },
        ],
        color: 'green',
        music: 'tap_out'
    },
    {
        level: 16,
        targetText: "Señal de transito",
        boards: 2,
        patterns: [
            [
                2, 3, 4,
                7, 8, 9,
                11, 12, 13, 14, 15,
                17, 18, 19,
                23
            ],
            [
                3,
                7, 8, 9,
                11, 12, 13, 14, 15,
                17, 18, 19,
                22, 23, 24
            ],
            [
                3,
                6, 7, 8, 9,
                11, 12, 13, 14, 15,
                16, 17, 18, 19,
                23
            ],
            [
                3,
                7, 8, 9, 10,
                11, 12, 13, 14, 15,
                17, 18, 19, 20,
                23
            ]
        ],

        bots: [
            {
                name: "S-Bot 1",
                interval: 1900,
                boards: 2
            },
        ],
        color: 'yellow',
        music: 'tap_out'
    },

    {
        level: 17,
        targetText: "Un cuadrado de 9 números",
        boards: 1,
        patterns: [
            [
                1, 6, 11,
                2, 7, 12,
                3, 8, 13,
            ],
            [
                6, 11, 16,
                7, 12, 17,
                8, 13, 18,
            ],
            [
                11, 16, 21,
                12, 17, 22,
                13, 18, 23,
            ],
            [
                2, 7, 12,
                3, 8, 13,
                4, 9, 14,
            ],
            [
                7, 12, 17,
                8, 13, 18,
                9, 14, 19,
            ],
            [
                12, 17, 22,
                13, 18, 23,
                14, 19, 24,
            ],
            [
                3, 8, 13,
                4, 9, 14,
                5, 10, 15,
            ],
            [
                8, 13, 18,
                9, 14, 19,
                10, 15, 20,
            ],
            [
                13, 18, 23,
                14, 19, 24,
                15, 20, 25,
            ],
        ],
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
        ],
        color: 'yellow',
        music: 'tap_out'
    },
    {
        level: 18,
        targetText: "Piramide simetrica de 8 números",
        boards: 1,
        patterns: [
            [
                13,
                9, 14, 19,
                5, 10, 15, 20, 25,
            ],
            [
                1, 6, 11, 16, 21,
                7, 12, 17,
                13,
            ],
            [
                1,
                2, 7,
                3, 8, 13,
                4, 9,
                5,
            ],
            [
                21,
                17, 22,
                13, 18, 23,
                19, 24,
                25,
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
        ],
        color: 'yellow',
        music: 'tap_out'
    },
    {
        level: 19,
        targetText: "Letra 'Z' o letra 'N'",
        boards: 1,
        patterns: [
            [1, 6, 11, 16, 21, 17, 13, 9, 5, 10, 15, 20, 25],
            [1, 2, 3, 4, 5, 7, 13, 19, 25, 21, 22, 23, 24]

        ],
        bots: [
            {
                name: "F-Bot 1",
                interval: 800,
                boards: 1
            },
        ],
        color: 'yellow',
        music: 'tap_out'
    },
    {
        level: 20,
        targetText: "Aspa invertida",
        boards: 2,
        patterns: [
            [
                6, 11, 16,
                2, 12, 22,
                3, 8, 18, 23,
                4, 14, 24,
                10, 15, 20
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
        color: 'yellow',
        music: 'tap_out'
    },
    {
        level: 21,
        targetText: "3 filas o 3 columnas separadas",
        boards: 2,
        patterns: [
            [
                1, 6, 11, 16, 21,
                3, 8, 13, 18, 23,
                5, 10, 15, 20, 25,
            ],
            [
                1, 11, 21,
                2, 12, 22,
                3, 13, 23,
                4, 14, 24,
                5, 15, 25,
            ],
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1500,
                boards: 3
            },
            {
                name: "M-Bot 2",
                interval: 1300,
                boards: 3
            },
        ],
        color: 'orange',
        music: 'tap_out'
    },
    {
        level: 22,
        targetText: "Diamante invertido",
        boards: 2,
        patterns: [
            [
                1, 6, 16, 21,
                2, 12, 22,
                8, 13, 18,
                4, 14, 24,
                5, 10, 20, 25,
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
        ],
        color: 'orange',
        music: 'tap_out'
    },

    {
        level: 23,
        targetText: "Simbolo de porcentaje",
        boards: 2,
        patterns: [
            [
                1, 2, 6, 7,
                5, 9, 13, 17, 21,
                19, 20, 24, 25
            ]
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1200,
                boards: 1
            },
        ],
        color: 'orange',
        music: 'tap_out'
    },

    {
        level: 24,
        targetText: "Número 4",
        boards: 2,
        patterns: [
            [
                11, 16,
                7, 17,
                3, 8, 13, 18, 23,
                19,
                20
            ]
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1200,
                boards: 1
            },
        ],
        color: 'orange',
        music: 'tap_out'
    },
    {
        level: 25,
        targetText: "Asterisco",
        boards: 1,
        patterns: [
            [
                1, 11, 21,
                7, 12, 17,
                3, 8, 13, 18, 23,
                9, 14, 19,
                5, 15, 25
            ]
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1200,
                boards: 1
            },
        ],
        color: 'orange',
        music: 'tap_out'
    },
    {
        level: 26,
        targetText: "La parca",
        boards: 1,
        patterns: [
            [
                1, 6, 11, 16, 21,
                2, 12, 22,
                3, 8, 13, 18, 23,
                9, 19,
                10, 20
            ]
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1200,
                boards: 1
            },
        ],
        color: 'red',
        music: 'tap_out'
    },
    {
        level: 27,
        targetText: "Diseño de mosaico",
        boards: 1,
        patterns: [
            [
                1, 11, 21,
                7, 17,
                3, 13, 23,
                9, 19,
                5, 15, 25
            ],
            [
                6, 16,
                2, 12, 22,
                8, 18,
                4, 14, 24,
                10, 20
            ]
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1200,
                boards: 1
            },
        ],
        color: 'red',
        music: 'tap_out'
    },

    {
        level: 28,
        targetText: "Patrón irregular",
        boards: 2,
        patterns: [
            [
                4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
                3, 8, 18, 23, 2
            ],

            [
                4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
                3, 8, 13, 23, 7
            ],
            [
                4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
                3, 8, 13, 18, 12
            ],
            [
                4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
                3, 8, 18, 22, 23
            ],
            [
                4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
                3, 13, 18, 17, 23
            ],
            [
                4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
                8, 13, 18, 12, 23
            ],


            // [
            //     4, 5, 9, 10, 14, 15, 19, 20, 24, 25,

            // ],
            // [
            //     4, 5, 9, 10, 14, 15, 19, 20, 24, 25,

            // ],
        ],
        bots: [
            // MODIFICAR ESTO
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
        ],
        color: 'red',
        music: 'tap_out'
    },
    {
        level: 29,
        targetText: "Una escalera de 15 números",
        boards: 2,
        patterns: [
            [
                1, 6, 11, 16, 21,
                2, 7, 12, 17,
                3, 8, 13,
                4, 9,
                5,
            ],
            [
                21,
                17, 22,
                13, 18, 23,
                9, 14, 19, 24,
                5, 10, 15, 20, 25,
            ],
            [
                1, 6, 11, 16, 21,
                7, 12, 17, 22,
                13, 18, 23,
                19, 24,
                25,
            ],
            [
                1,
                2, 7,
                3, 8, 13,
                4, 9, 14, 19,
                5, 10, 15, 20, 25,
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
        ],
        color: 'red',
        music: 'tap_out'
    },
    {
        level: 30,
        targetText: "Marca todo el tablero",
        boards: 2,
        patterns: [
            [
                1, 6, 11, 16, 21,
                2, 7, 12, 17, 22,
                3, 8, 13, 18, 23,
                4, 9, 14, 19, 24,
                5, 10, 15, 20, 25,
            ]
        ],
        bots: [
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
        ],
        color: 'red',
        music: 'tap_out'
    },
]


// TODO: DOCUMENTAR ESTO
// NUEVAS IDEAS PARA NIVELES
// Niveles con hasta 4 bots a la vez (LISTO)
// Bots con un tiempo de respuesta minimo de 0.5 segundos (más rapido) (LISTO)
// Patrones unicos (solamente 1 combincación o patrón) (LISTO)
// Aumentar el numero de objetivos de 3 a 4 o 5 (maximo) (NO SERA IMPLEMENTADO)
// ¿Nivel final es marcar todos los numeros del tablero? (LISTO)

// https://stackoverflow.com/questions/35435042/how-can-i-define-an-array-of-objects
// https://stackoverflow.com/questions/23161486/create-strongly-typed-array-of-arrays-in-typescript

// PODRIA SERVIR
// https://github.com/nsamelson/AIGameRunner/blob/a51fad7b8ed9ffeb3c972ccb65c29030c2b9985e/public/games/quixo.js

