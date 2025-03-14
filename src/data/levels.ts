import { CYAN, RED, YELLOW } from "../constants/colors";
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

// Aqui se especifica los niveles, incluyendo los posibles patrones ganadores por cada nivel del juego
export const levels: Level[] = [
    {
        // Nivel
        level: 1,
        // TODO: targetQuantity SE DEBERA ELIMINAR EN UNA FUTURA ACTUALIZACIÓN, TODOS LOS NIVELES DEBERAN TENER 3 OBJETIVOS
        // Numero de bolitas o numeros objetivos 
        
        // Texto descriptivo para el patron objetivo
        targetText: "Una columna o una fila de 5 números",
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
                interval: 2400,
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
        targetPositions: [3,8,13,18,23],
        color: CYAN
    },
    {
        level: 2,
        targetText: "Una cruz de 5 números",
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
        targetPositions: [8, 12, 13, 14, 18],
        color: CYAN
    },
    {
        level: 3,

        targetText: "Un rectangulo de 6 números",
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
        targetPositions: [7, 8, 9, 12, 13, 14],
        color: CYAN
    },
    {
        level: 4,

        targetText: "Un aspa de 5 números",
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
        targetPositions: [7, 9, 13, 17, 19],
        color: RED
    },
    {
        level: 5,

        targetText: "2 cuadrados de 4 números en 2 diagonales",
        boards: 2,
        patterns: [
            [1, 6, 2, 7, 19, 24, 20, 25],
            [4, 9, 5, 10, 16, 21, 17, 22],
        ],
        bots: [
            {
                name: "M-Bot",
                interval: 1500,
                boards: 2
            },
        ]
        // TODO: SEGUIR AÑADIENDO PATRONES Y NUEVOS NIVELES
        ,


        targetPositions: [],
        color: YELLOW
    },
    {
        level: 6,

        targetText: "El ojo",
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
        targetPositions: [],
        color: CYAN
    },
    // TODO: ¿MODIFICAR ESTE NIVEL, ES MUY DIFICIL?
    {
        level: 7,

        targetText: "Primera o ultima fila y columna",
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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 8,

        targetText: "Ocho cuartos",
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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 9,

        targetText: "Un cuadrado de 16 números",
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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 10,

        targetText: "Un aspa de 9 números y una cruz de 5 números que comience del centro",
        boards: 2,
        patterns: [
            [
                1, 21,
                7, 17,
                13, 18, 23,
                9, 19,
                5, 25,
            ],
            [
                1, 21,
                7, 17,
                13,
                9, 14, 19,
                5, 15, 25,
            ],
            [
                1, 21,
                7, 17,
                3, 8, 13,
                9, 19,
                5, 25,
            ],
            [
                1, 11, 21,
                7, 12, 17,
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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },



    {
        level: 11,

        targetText: "El número 1",
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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 12,

        targetText: "Las letras 'H' e 'I'",
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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 13,

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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 14,

        targetText: "Una piramide simetrica de 8 números",
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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 15,

        targetText: "Un aspa a la inversa",
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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 16,

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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 17,

        targetText: "Un diamante a la inversa",
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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 18,

        targetText: "Una cruz de 9 números y un aspa de 5 números que empiece del centro",
        boards: 2,
        patterns: [
            [
                1, 11,
                7, 12,
                3, 8, 13, 18, 23,
                14,
                15,
            ],
            [
                11, 21,
                12, 17,
                3, 8, 13, 18, 23,
                14,
                15,
            ],
            [
                11,
                12,
                3, 8, 13, 18, 23,
                14, 19,
                15, 25,
            ],
            [
                11,
                12,
                3, 8, 13, 18, 23,
                9, 14,
                5, 15,
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
        ],
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    {
        level: 19,

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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
    },
    // TODO: EL NIVEL FINAL DEBERIA SER EL NIVEL 30, NO EL 20
    {
        level: 20,

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
        targetPositions: [],
        color: {
            bgButtonOn: "",
            bgButtonOnHover: "",
            bgButtonOnActive: ""
        }
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

