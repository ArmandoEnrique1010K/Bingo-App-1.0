import { useEffect, useRef, useState } from "react";
import { generateBoard } from "../../utils/generateBoard";
import { Level, Pattern, Position } from "../../types";
import { dynamicInterval } from "../../utils/dynamicInterval";
import BotBoardNumbers from "./BotBoardNumbers";

type BotsProps = {
    currentLevel: Level,
    targets: number[],
    interval: number,
    name: string,
    patterns: Pattern[]
    boards: number
    handleGameOver: () => void,
    // showBotNumbers: boolean
    handleSetDefeat: (boolean: boolean) => void,
    defeat: boolean,
    handleSetVictory: (boolean: boolean) => void,
    victory: boolean,

}

export default function Bots({ currentLevel, targets, interval, name, patterns, handleGameOver, handleSetDefeat, defeat, handleSetVictory, victory, boards }: BotsProps) {

    // Tablero del bot
    // const [botBoard, setBotBoard] = useState<Board>([])
    const [botBoard, setBotBoard] = useState<{ id: number, board: { position: Position; number: number; }[] }[]>([]);

    // Estado para almacenar las posiciones de los números que ha seleccionado el bot
    // const [botSelectedPositions, setBotSelectedPositions] = useState<{ x: number, y: number }[]>([]);
    const [botSelectedPositions, setBotSelectedPositions] = useState<{ idBoard: number, positions: { x: number, y: number }[] }[]>([]);

    // Estado para almacenar los números que ha seleccionado el bot
    // const [botSelectedNumbers, setBotSelectedNumbers] = useState<number[]>([]);
    const [botSelectedNumbers, setBotSelectedNumbers] = useState<{ idBoard: number, numbers: number[] }[]>([]);



    // TODO: ¿SE PODRIA OMITIR EL USO DE USEREF?
    const timeoutIdsRef = useRef<number[]>([]); // Referencia para almacenar IDs de temporizadores


    // Esto se realiza para que genere un nuevo tablero

    const newBoards = Array.from({ length: boards }).map((_, index) => ({
        // Se evita el id igual a 0
        id: index + 1,
        board: generateBoard()
    }));


    useEffect(() => {
        // const newBoards = generateBoard();
        // console.log(dataLevel.bots)
        setBotBoard(newBoards);
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


    // useEffect(() => {
    //     if (targets && targets.length > 0) {
    //         botBoard.forEach((board, index) => {
    //             const arrayTargets = board.board.filter(n => targets.includes(n.number))
    //             console.log(`Números objetivos en el tablero ${index + 1}: `);
    //             console.log(arrayTargets);
    //         });
    //     }
    // }, [targets]);


    // TODO: ESTO DEBERIA EVALUAR TABLERO POR TABLERO
    useEffect(() => {
        botBoard.forEach((board) => {
            // const arrayTargets = board.board.filter(n => targets.includes(n.number))
            const arrayTargets = board.board.filter((n) => targets.includes(n.number));

            const dynamicTime = dynamicInterval()

            arrayTargets.forEach((target) => {

                const timeoutId = setTimeout(() => {
                    // TODO: ¿PORQUE SE RESTA MENOS 1?
                    handleCheckNumber(board.id - 1, target.number, target.position);
                    console.log(`${name} ha marcado en el tablero ${board.id} el número ${target.number}`)
                    console.log(`Se demoro ${(dynamicTime * interval).toFixed(2)} milisegundos`)
                }, dynamicTime * interval);

                timeoutIdsRef.current.push(timeoutId); // Almacenar el ID del temporizador
            });
        });

        // Limpiar temporizadores si los objetivos cambian
        return () => {
            timeoutIdsRef.current.forEach((id) => clearTimeout(id));
            timeoutIdsRef.current = [];
        };
    }, [currentLevel, targets, botBoard, interval]);

    // Imprimir en consola los numeros objetivos que se encuentran en el tablero
    // useEffect(() => {
    //     // Siempre debe haber minimo 1 elemento en targets (1 numero objetivo, por defecto 3)
    //     if (targets && targets.length > 0) {
    //         const arrayTargets = botBoard.filter(n => targets.includes(n.number));
    //         // console.log("Numeros objetivos " + JSON.stringify(arrayTargets));
    //         console.log(`Números objetivos: `)
    //         console.log(arrayTargets)
    //     }
    // }, [targets])

    // Imprimir en consola los numeros objetivos que se encuentran en el tablero

    // READY: MODIFICAR ESTO PARA QUE IMPRIMA LOS NUMEROS QUE COINCIDAN EN CADA UNO DE LOS TABLEROS DE LOS BOTS
    useEffect(() => {

        // Siempre debe haber minimo 1 elemento en targets (1 numero objetivo, por defecto 3)
        if (targets && targets.length > 0) {

            botBoard.forEach((board, index) => {
                // console.log(botBoard.find(b => b.id === index))


                const arrayTargets = board.board.filter(n => targets.includes(n.number))
                // const arrayTargets = board.position.filter(n => targets.includes(n.number));
                console.log(`Números objetivos en el tablero ${index + 1}: `);
                console.log(arrayTargets);
            });
        }
    }, [targets]);




    // Función para marcar el numero de forma automatica
    const handleCheckNumber = (idBoard: number, number: number, position: { x: number, y: number }) => {


        setBotSelectedNumbers(prevState =>
            prevState.map(board =>
                board.idBoard === idBoard
                    ? {
                        ...board, numbers: [...board.numbers, number]
                    }
                    : board
            )
        );



        setBotSelectedPositions((prev) => {
            return prev.map(board =>
                board.idBoard === idBoard
                    ? {
                        ...board,
                        positions: board.positions.some(pos => pos.x === position.x && pos.y === position.y)
                            ? board.positions
                            : [...board.positions, position]
                    }
                    : board
            );
            // return [...prev, position];
        })


        // setBotSelectedPositions((prev) => {

        //     // if (selectedPositions.some(pos => pos.x === position.x && pos.y === position.y)) {

        //     // if (!prev.includes(position)) {
        //     //     return [...prev, position];
        //     // }

        //     if (!prev.some((pos: { x: number, y: number }) => pos.x === position.x && pos.y === position.y)) {
        //         return [...prev, position];
        //     }

        //     return prev;
        // })

        // setBotSelectedPositions((prev: { x: number, y: number }) => {
        //     if (!prev.some(pos => pos.x === position.x && pos.y === position.y)) {
        //         return [...prev, position];
        //     }
        //     return prev;
        // })

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

    // Esto se tiene que desactivar???

    // MARCA LA POSICION SELECCIONADA

    const handleSelectedPosition = (idBoard: number, position: { x: number, y: number }) => {
        // return botSelectedPositions.some()

        if (botSelectedPositions.some(pos => pos.idBoard === idBoard && pos.positions.some(p => p.x === position.x && p.y === position.y))) {
            //  === position.x && pos.y === position.y)) {
            return true;
        }
        return false;



        // return botSelectedNumbers.includes(number)
    };


    // ? "bg-blue-500 text-white"
    // : "bg-orange-500 text-black";

    // TODO: MODIFICAR ESTO PARA QUE IMPRIMA EL ULTIMO NUMERO QUE HA SIDO MARCADO
    // useEffect(() => {
    //     if (botSelectedNumbers.length > 0) {
    //         const lastSelections = botSelectedNumbers.map(board => ({
    //             idBoard: board.idBoard,
    //             lastNumber: board.numbers[board.numbers.length - 1]
    //         }));

    //         lastSelections.forEach(selection => {
    //             console.log(`En el tablero ${selection.idBoard + 1} del bot ${name}, el número ${selection.lastNumber} ha sido seleccionado`);
    //         });
    //     }
    // }, [botSelectedNumbers]);


    // Usar una referencia para verificar si el jugador gana dentro de los 5 segundos
    // const victoryRef = useRef(victory);


    // Función para verificar si el oponente ha ganado
    const handleCheckWinnerPatternBot = () => {
        // ANTES:
        // if (patterns?.some(p => p.every(n => botSelectedPositions.includes(n)))) {
        // TODO: Evalua cada tablero del bot, si uno de ellos tiene el patron ganador
        if (patterns?.some(p => p.every(n => botSelectedPositions.some(board => board.positions.some(pos => pos.x === n.x && pos.y === n.y))))) {


            // if (selectedPositions.some(pos => pos.x === position.x && pos.y === position.y)) {

            console.log("Tu oponente " + name + " tiene el patrón asignado en su tablero, tienes 5 segundos para intentar ganarle, nivel: " + currentLevel.level);


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
        setBotBoard(newBoards);
        // setBotSelectedPositions([{ x: 2, y: 2 }]);
        // setBotSelectedNumbers([0]);
        setBotSelectedPositions(Array.from({ length: currentLevel.boards }).map((_, index) => ({
            idBoard: index,
            positions: [{ x: 2, y: 2 }]
        })))
        setBotSelectedNumbers(Array.from({ length: currentLevel.boards }).map((_, index) => ({
            idBoard: index,
            numbers: [0]
        })))



    }, [currentLevel.level])

    // Si el bot gana, debe reiniciar el bot
    useEffect(() => {
        if (defeat === false) {
            // setBotBoard(generateBoard());
            setBotBoard(newBoards)
            // setBotSelectedPositions([{ x: 2, y: 2 }]);
            // setBotSelectedNumbers([0]);

            setBotSelectedPositions(Array.from({ length: currentLevel.boards }).map((_, index) => ({
                idBoard: index,
                positions: [{ x: 2, y: 2 }]
            })))
            setBotSelectedNumbers(Array.from({ length: currentLevel.boards }).map((_, index) => ({
                idBoard: index,
                numbers: [0]
            })))

        }
    }, [defeat])


    // SEGUNDO POWERUPS
    // const handleSelectedBot = (name: string) => {
    //     setSelectedBot(name)
    //     console.log(selectedBot);
    //     // setTurnedOff(true)

    //     console.log("BOT " + name + " SELECCIONADO")
    // }

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
            {

                <div
                    className="flex flex-col items-center p-2 bg-gray-700 rounded-lg shadow-md"
                >
                    <h2 className="text-lg font-semibold text-gray-200 mb-2">{name}</h2>

                    <div className="flex flex-row gap-4">
                        {
                            Array.from({ length: boards }).map((_, index) => (
                                <BotBoardNumbers key={index}
                                    board={botBoard.find(b => b.id === index + 1)?.board || []}
                                    idBoard={index}
                                    handleSelectedPosition={handleSelectedPosition}
                                />
                            ))
                        }


                    </div>

                    {/* <BotBoardNumbers
                        board={botBoard}
                        handleSelectedPosition={handleSelectedPosition}
                    /> */}


                </div>


            }
        </>

    )
}