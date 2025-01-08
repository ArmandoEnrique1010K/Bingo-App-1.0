import { useEffect, useRef, useState } from "react";
import { generateBoard } from "../../utils/generateBoard";
import { Board, Level } from "../../types";
import { dynamicInterval } from "../../utils/dynamicInterval";
import BotBoardNumbers from "./BotBoardNumbers";

type BotsProps = {
    dataLevel: Level,
    targets: number[],
    interval: number,
    name: string,
    patterns: number[][],
    handleGameOver: () => void,
    // showBotNumbers: boolean
    handleSetDefeat: (boolean: boolean) => void,
    defeat: boolean,
    handleSetVictory: (boolean: boolean) => void,
    victory: boolean

}

export default function Bots({ dataLevel, targets, interval, name, patterns, handleGameOver, /* showBotNumbers*/ handleSetDefeat, defeat, handleSetVictory, victory }: BotsProps) {

    // Tablero del bot
    const [botBoard, setBotBoard] = useState<Board>([])

    // Estado para almacenar las posiciones de los números que ha seleccionado el bot
    const [botSelectedPositions, setBotSelectedPositions] = useState<number[]>([]);

    // Estado para almacenar los números que ha seleccionado el bot
    const [botSelectedNumbers, setBotSelectedNumbers] = useState<number[]>([]);

    // TODO: ¿SE PODRIA OMITIR EL USO DE USEREF?
    const timeoutIdsRef = useRef<number[]>([]); // Referencia para almacenar IDs de temporizadores


    // Esto se realiza para que genere un nuevo tablero
    useEffect(() => {
        const newBotBoard = generateBoard();
        // console.log(dataLevel.bots)
        setBotBoard(newBotBoard);
    }, []);

    // Limpia temporizadores anteriores
    useEffect(() => {
        return () => {
            timeoutIdsRef.current.forEach((id) => clearTimeout(id));
            timeoutIdsRef.current = [];
        };
    }, [botBoard, targets]);


    // console.log(dataLevel.bots[0].interval)
    // READY: El bot debe ser capaz de identificar los números objetivo y marcarlos en el tablero de forma automática
    useEffect(() => {
        const arrayTargets = botBoard.filter((n) => targets.includes(n.number));
        // const interval = dataLevel.bots.map(b => b.interval)
        // console.log(interval)

        arrayTargets.forEach((target, index) => {
            // const botInterval = dataLevel.bots[index]?.interval || 1000;
            // Usa un valor predeterminado si no se encuentra el intervalo

            // console.log(index)
            // setTimeout(() => {
            //     handleTargetNumber(target.number, target.position);
            //     // Temporizador dinamico, asigna por el bot
            // }, dynamicInterval() * interval * (index + 1)); // Incrementa el tiempo de espera para cada número
            const timeoutId = setTimeout(() => {
                handleCheckNumber(target.number, target.position);
            }, dynamicInterval() * interval * (index + 1));

            timeoutIdsRef.current.push(timeoutId); // Almacenar el ID del temporizador


            // Limpiar temporizadores si los objetivos cambian
            return () => {
                timeoutIdsRef.current.forEach((id) => clearTimeout(id));
                timeoutIdsRef.current = [];
            };

        });
    }, [dataLevel, targets, botBoard, interval]);

    // Imprimir en consola los numeros objetivos que se encuentran en el tablero
    useEffect(() => {
        // Siempre debe haber minimo 1 elemento en targets (1 numero objetivo, por defecto 3)
        if (targets && targets.length > 0) {
            const arrayTargets = botBoard.filter(n => targets.includes(n.number));
            console.log(arrayTargets);
        }
    }, [targets])



    // Función para marcar el numero de forma automatica
    const handleCheckNumber = (number: number, position: number) => {
        setBotSelectedNumbers((prev) => {
            if (!prev.includes(number)) {
                return [...prev, number];
            }
            return prev;
        });

        setBotSelectedPositions((prev) => {
            if (!prev.includes(position)) {
                return [...prev, position];
            }
            return prev;
        })
    }

    // Función para seleccionar un numero
    // Conviene usar un useEffect para evitar llamadas innecesarias (segun ChatGPT)
    // const handleSelectedNumber = (number: number) => {
    //     // TODO: Mejorar el performance de esta función
    //     if (botSelectedNumbers.includes(number)) {
    //         // Este mensaje se imprime cada vez que el bot marca un numero, imprime todos los numeros que fueron marcados
    //         console.log("La casilla del numero " + number + " ha sido seleccionada")
    //         return "bg-blue-500 text-white"
    //     }
    //     // Estilo por defecto
    //     return "bg-orange-500 text-black"

    // }
    const handleSelectedNumber = (number: number) => {
        return botSelectedNumbers.includes(number)
    };


    // ? "bg-blue-500 text-white"
    // : "bg-orange-500 text-black";

    useEffect(() => {
        if (botSelectedNumbers.length > 0) {
            const lastNumber = botSelectedNumbers[botSelectedNumbers.length - 1];
            console.log(`La casilla del número ${lastNumber} ha sido seleccionada`);
        }
    }, [botSelectedNumbers]);


    // Usar una referencia para verificar si el jugador gana dentro de los 5 segundos
    // const victoryRef = useRef(victory);


    // Función para verificar si el oponente ha ganado
    const handleCheckWinnerPatternBot = () => {
        if (patterns?.some(p => p.every(n => botSelectedPositions.includes(n)))) {
            console.log("Tu oponente " + name + " ganó el nivel " + dataLevel.level);


            // READY: Definir una función que solamente se ejecute una vez si el oponente ha ganado, de tal manera que espere 5 segundos para imprimir el mensaje de victoria
            // setTimeout(() => {
            //     handleGameOver();
            //     setDefeat(true)
            //     console.log("SE ACABO EL JUEGO");
            // }, 5000);


            // TODO: SI EL BOT HA GANADO PRIMERO, ANTES DE LOS 5 SEGUNDOS QUE DEBEN TRASNCURRIRSE, EL JUGADOR GANO EN ESE TIEMPO, SE DEBE COLOCAR DEFEAT COMO FALSE
            // if (victory === true) {
            //     setDefeat(false);
            // }

            // Marcar derrota después de 5 segundos
            const timeoutId = setTimeout(() => {
                if (victory === true) {
                    // Si el jugador ganó antes de que termine el tiempo, cancelar la derrota
                    console.log("El jugador ganó antes de que el bot terminara");
                    handleSetDefeat(false);
                } else {
                    // Si el jugador no ganó, marcar la derrota
                    handleGameOver();
                    handleSetDefeat(true);
                    handleSetVictory(false);
                    console.log("SE ACABO EL JUEGO: el bot ganó");
                }
            }, 5000);

            // Opcional: Limpieza del timeout si es necesario
            return () => clearTimeout(timeoutId);


        }
        // else {
        //     console.log("Tu oponente sigue intentando");
        // }
    };


    // Cada vez que se actualice la posición del objetivo, se verifica si el oponente ha ganado
    useEffect(() => {
        handleCheckWinnerPatternBot();
    }, [botSelectedNumbers]);


    // Si el jugador gana, se debe reiniciar el bot
    useEffect(() => {
        setBotBoard(generateBoard());
        setBotSelectedPositions([]);
        setBotSelectedNumbers([]);
    }, [dataLevel.level])

    // Si el bot gana, debe reiniciar el bot
    useEffect(() => {
        if (defeat === false) {
            setBotBoard(generateBoard());
            setBotSelectedPositions([]);
            setBotSelectedNumbers([]);
        }
    }, [defeat])

    return (
        // md:grid-cols-2 lg:grid-cols-4 
        // <div className="grid grid-cols-4 grid-rows-2 gap-6 p-4 bg-gray-900 rounded-lg shadow-lg">
        <>


            {/* Sugerencia para futura actualización */}
            {/* {bots.map((bot, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md"
                >
                    <h2 className="text-xl font-bold text-gray-200 mb-4">{bot.name}</h2>

                    <BotBoardNumbers
                        board={bot.board}
                        handleSelectedNumber={bot.handleSelectedNumber}
                    />
                </div>
            ))} */}

            <div
                className="flex flex-col items-center p-2 bg-gray-700 rounded-lg shadow-md"
            >
                <h2 className="text-lg font-semibold text-gray-200 mb-2">{name}</h2>
                <BotBoardNumbers
                    board={botBoard}
                    handleSelectedNumber={handleSelectedNumber}
                // showBotNumbers={showBotNumbers}
                />

            </div>
        </>

    )
}
