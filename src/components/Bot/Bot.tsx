import { useEffect, useMemo, useState } from "react";
import { generateBoard } from "../../utils/generateBoard";
import { BoardID, Level, Pattern, ResultNumberBoardsBot, SelectedNumbers, SelectedPositions } from "../../types";
import { dynamicInterval } from "../../utils/dynamicInterval";
import BotBoardNumbers from "./BotBoardNumbers";

type BotsProps = {
    currentLevel: Level,
    targets: number[],
    interval: number,
    name: string,
    patterns: Pattern[]
    boards: number
    handleSetDefeat: (boolean: boolean) => void,
    defeat: boolean,
    handleSetVictory: (boolean: boolean) => void,
    victory: boolean,
    handleCleanTargets: () => void,
    nextBoards: number
}

export default function Bots({ currentLevel, targets, interval, name, patterns, handleSetDefeat, defeat, handleSetVictory,
    victory, boards, handleCleanTargets, nextBoards }: BotsProps) {

    // Variables de estado

    // Tablero del bot
    const [botBoard, setBotBoard] = useState<BoardID>([]);

    // Posiciones de los números que ha seleccionado el bot
    const [botSelectedPositions, setBotSelectedPositions] = useState<SelectedPositions>([]);

    // Números que ha seleccionado el bot
    const [botSelectedNumbers, setBotSelectedNumbers] = useState<SelectedNumbers>([]);

    // IDs de los temporizadores activos
    const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

    // Resultados encontrados para los numeros que se van a marcar
    const [result, setResult] = useState<ResultNumberBoardsBot>([])

    // Genera los tableros al inicio o cuando cambia el número de tableros
    // Conviene usar useMemo para generar los tableros
    const newBoards = useMemo(() => {
        return Array.from({ length: boards }).map((_, index) => ({
            id: index + 1, // ID del tablero, evita el valor 0
            board: generateBoard() // Genera un tablero aleatorio
        }));
    }, [boards])


    // READY??? : DE ALGUNA MANERA, SI EL BOT HA GANADO, DEBE DEJAR DE SEGUIR EVALUANDO

    useEffect(() => {
        setBotBoard(newBoards);
    }, []);
    // const setBoardsBot = () => {
    //     setBotBoard(newBoards);
    // }

    // Efecto principal: evalúa los números objetivos y los marca automáticamente


    useEffect(() => {
        if (!botBoard.length || !targets.length || defeat) return; // Si no hay tableros, objetivos o el juego terminó, no ejecuta

        // Limpia los temporizadores previos
        timeoutIds.forEach((id) => clearTimeout(id));
        setTimeoutIds([]); // Reinicia el array de IDs

        // TODO: DINAMIZAR ESTO, EL ORDEN DE LOS ELEMENTOS DEBE CAMBIAR CADA VEZ

        let currentDelay = 0;
        const newTimeoutIds: number[] = [];
        const dynamicResult = [...result]; // Copia de resultados para evitar mutaciones

        // Mezcla el orden de los tableros y objetivos dinámicamente
        dynamicResult.sort(() => Math.random() - 0.5);

        dynamicResult.forEach((res) => {
            res.targets.sort(() => Math.random() - 0.5);

            res.targets.forEach((t) => {
                const randomInterval = dynamicInterval() * interval; // Calcula un intervalo dinámico
                currentDelay += randomInterval;

                const timeoutId = setTimeout(() => {
                    handleCheckNumber(res.idBoard, t.number, t.position); // Marca el número
                    // console.log(`${name} ha marcado en el tablero ${res.idBoard} el número ${t.number}`);
                    // console.log(`Se demoró ${(randomInterval).toFixed(2)} milisegundos`);
                }, currentDelay);

                newTimeoutIds.push(timeoutId); // Almacena el ID del temporizador
            });
        });
        setTimeoutIds(newTimeoutIds); // Actualiza el estado con los nuevos IDs de temporizadores

        // Limpia los temporizadores al desmontar el componente o cambiar objetivos
        return () => {
            newTimeoutIds.forEach((id) => clearTimeout(id));
        };
    }, [currentLevel, targets, botBoard, interval, result, name, defeat]);


    // Efecto: Encuentra los números objetivos en los tableros
    useEffect(() => {
        if (targets && targets.length > 0) {
            botBoard.forEach((board, index) => {
                const arrayTargets = board.board.filter(n => targets.includes(n.number));

                setResult(prevResult => [
                    ...prevResult,
                    {
                        idBoard: index + 1, // ID del tablero
                        targets: arrayTargets
                    }
                ]);
            });
        }

        if (targets.length === 0) {
            setResult([]); // Limpia los resultados si no hay objetivos
        }
    }, [targets]);

    // Prueba para imprimir los numeros objetivos encontrados por parte del bot
    // useEffect(() => {
    //     console.log(`Números objetivos por cada tablero: `)
    //     console.log(result)
    // }, [result])

    // Verifica si un número ya está marcado por el bot
    const handleVerifyNumber = (idBoard: number, number: number) => {
        return !botSelectedNumbers.some(board => board.idBoard === idBoard && board.numbers.includes(number));
    };

    // Marca un número automáticamente
    const handleCheckNumber = (idBoard: number, number: number, position: number) => {
        setBotSelectedNumbers(prevState =>
            prevState.map(board =>
                board.idBoard === idBoard
                    ? {
                        ...board,
                        numbers: handleVerifyNumber(idBoard, number) ? [...board.numbers, number] : board.numbers
                    }
                    : board
            )
        );

        setBotSelectedPositions(prevState =>
            prevState.map(board =>
                board.idBoard === idBoard
                    ? {
                        ...board,
                        positions: handleVerifyNumber(idBoard, number) ? [...board.positions, position] : board.positions
                    }
                    : board
            )
        );
    };

    // TODO: MARCA LA POSICION SELECCIONADA

    // Verifica que el numero recibido se encuentre en botSelectedPositions por el id del tablero recibido 
    // y la posición del tablero
    const handleSelectedPosition = (idBoard: number, position: number) => {
        if (botSelectedPositions.some(pos => pos.idBoard === idBoard && pos.positions.some(p => p === position))) {
            // Retorna true
            return true;
        }
        return false;
    };

    // Verifica si un patrón ganador está presente en los tableros del bot
    const handleCheckWinnerPatternBot = () => {
        if (defeat) return; // Si el juego terminó, no evalúa

        // Itera por cada tablero del bot
        for (const board of botSelectedPositions) {

            // Si tiene el patrón ganador en 
            const hasWinningPattern = patterns?.some(pattern =>
                pattern.every(position =>
                    board.positions.some(pos => pos === position)
                )
            );

            // Si es true hasWinningPattern
            if (hasWinningPattern) {
                // console.log(
                //     `Tu oponente ${name} tiene el patrón asignado en su tablero ${board.idBoard}, tienes 5 segundos para intentar ganarle, nivel: ${currentLevel.level}`
                // );

                const timeoutId = setTimeout(() => {
                    if (victory) {
                        // console.log("El jugador ganó antes de que el bot terminara");
                        handleSetDefeat(false);
                    } else {
                        handleSetDefeat(true);
                        handleSetVictory(false);
                        handleCleanTargets(); // Limpia los números objetivos
                        // console.log("SE ACABO EL JUEGO: el bot ganó");
                    }
                }, 5000);

                // Limpia los temporizadores
                return () => clearTimeout(timeoutId);
            }
        }
    };

    // Evalúa si hay un patrón ganador cada vez que cambian las posiciones marcadas
    useEffect(() => {
        handleCheckWinnerPatternBot();
    }, [botSelectedNumbers]);

    // Reinicia el bot si el jugador gana
    useEffect(() => {
        setBotBoard(newBoards);
        setBotSelectedPositions(Array.from({ length: boards }).map((_, index) => ({
            idBoard: index + 1,
            positions: [13] // Inicializa con una posición genérica
        })));
        setBotSelectedNumbers(Array.from({ length: boards }).map((_, index) => ({
            idBoard: index + 1,
            numbers: [0] // Inicializa con un número genérico
        })));
    }, [currentLevel.level]);

    // Reinicia el bot si el bot gana
    useEffect(() => {
        if (!defeat) {
            setBotBoard(newBoards);
            setBotSelectedPositions(Array.from({ length: boards }).map((_, index) => ({
                idBoard: index + 1,
                positions: [13]
            })));
            setBotSelectedNumbers(Array.from({ length: boards }).map((_, index) => ({
                idBoard: index + 1,
                numbers: [0]
            })));
        }
    }, [defeat]);

    const getQuantityBoards = () => {
        console.log(boards)
    }

    useEffect(() => {
        getQuantityBoards()
    }, [])

    return (
        // DE ALGUNA FORMA SE TIENE QUE OBTENER EL ID DE LOS BOTS
        // SE NECESITA SABER EL NUMERO DE TABLEROS DEL SIGUIENTE BOT PARA APLICAR EL ESTILO RESPONSIVE
        <div className={`flex flex-col items-center justify-center bg-gray-700  p-2 rounded-lg shadow-md 

        
        ${boards >= 2 ? "col-span-2" : ""}
        ${boards < 2 && (nextBoards !== 0 || nextBoards >= 2) ? "col-span-2" : ""}
        `}>
            <h2 className="text-lg font-semibold text-gray-200 mb-2">{name}</h2>

            <div className="flex flex-row gap-4">
                {
                    Array.from({ length: boards }).map((_, index) => (
                        <BotBoardNumbers key={index + 1}
                            // board={botBoard.find(b => b.id === index + 1)?.board || []}
                            board={botBoard.find(b => b.id === index + 1)?.board || []}
                            idBoard={index + 1}
                            handleSelectedPosition={handleSelectedPosition}
                        />
                    ))
                }
            </div>
        </div>
    )
}
