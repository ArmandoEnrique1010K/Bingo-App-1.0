import { useEffect, useState } from "react";
import { generateBoard } from "../../utils/generateBoard";
import { Level, Pattern } from "../../types";
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
    setTargets: React.Dispatch<React.SetStateAction<number[]>>

}

export default function Bots({ currentLevel, targets, interval, name, patterns, handleSetDefeat, defeat, handleSetVictory, victory, boards, setTargets }: BotsProps) {

    // Tablero del bot
    const [botBoard, setBotBoard] = useState<{ id: number, board: { position: number; number: number; }[] }[]>([]);

    // Estado para almacenar las posiciones de los números que ha seleccionado el bot
    const [botSelectedPositions, setBotSelectedPositions] = useState<{ idBoard: number, positions: number[] }[]>([]);

    // Estado para almacenar los números que ha seleccionado el bot
    const [botSelectedNumbers, setBotSelectedNumbers] = useState<{ idBoard: number, numbers: number[] }[]>([]);

    const [timeoutIds, setTimeoutIds] = useState<number[]>([]); // Array para almacenar IDs de temporizadores


    const newBoards = Array.from({ length: boards }).map((_, index) => ({
        // Se evita el id igual a 0
        id: index + 1,
        board: generateBoard()
    }));


    // TODO : DE ALGUNA MANERA, SI EL BOT HA GANADO, DEBE DEJAR DE SEGUIR EVALUANDO
    useEffect(() => {
        setBotBoard(newBoards);
    }, []);

    const [result, setResult] = useState<{ idBoard: number, targets: { position: number, number: number }[] }[]>([])

    // EVALUA TABLERO POR TABLERO
    useEffect(() => {
        if (!botBoard.length || !targets.length || defeat === true) return;

        // Limpia los temporizadores previos
        timeoutIds.forEach((id) => clearTimeout(id));
        setTimeoutIds([]); // Reinicia el array

        // UTILIZA EL STATE DE RESULT
        // const arrayTargets = result
        // const timeoutIds: NodeJS.Timeout[] = [];

        let currentDelay = 0;
        // TODO: DINAMIZAR ESTO, EL ORDEN DE LOS ELEMENTOS DEBE CAMBIAR CADA VEZ
        const newTimeoutIds: number[] = [];
        const dynamicResult = [...result]; // Copia para evitar mutación accidental

        // Dinamizar el orden de los tableros y objetivos en cada llamada
        dynamicResult.sort(() => Math.random() - 0.5);

        dynamicResult.forEach((res) => {

            res.targets.sort(() => Math.random() - 0.5);

            // RESULT TIENE LA FORMA:
            // const result: {
            //     idBoard: number;
            //     targets: {
            //         position: Position;
            //         number: number;
            //     }[];
            // }[]
            // const randomInterval = dynamicInterval() * interval;

            // const dynamicTime = dynamicInterval()

            // arrayTargets.forEach((target) => {

            // TODO: ESTO PODRIA SER DINAMICO, PUES SIEMPRE MARCA LOS TABLEROS POR ORDEN NUMERICO

            res.targets.forEach((t) => {

                const randomInterval = dynamicInterval() * interval;

                currentDelay += randomInterval;

                const timeoutId = setTimeout(() => {
                    // handleCheckNumber(board.id - 1, target.number, target.position);
                    // console.log(`${name} ha marcado en el tablero ${board.id} el número ${target.number}`)

                    // Verificar los parámetros antes de llamar a handleCheckNumber
                    // console.log(`Marcando número en el tablero ${res.idBoard}:`, t);
                    handleCheckNumber(res.idBoard, t.number, t.position);
                    console.log(`${name} ha marcado en el tablero ${res.idBoard} el número ${t.number}`);
                    console.log(`Se demoró ${(randomInterval).toFixed(2)} milisegundos`);

                    // timeoutIdsRef.current.push(timeoutId); // Almacenar el ID del temporizador

                }, currentDelay);
                newTimeoutIds.push(timeoutId);

                // timeoutIds.current.push(timeoutId); // Almacenar el ID del temporizador
                // newTimeoutIds.push(timeoutId); // Almacena el ID del temporizador
                // setTimeoutIds([...newTimeoutIds, timeoutId])
            });
        });
        //setTimeoutIds(newTimeoutIds); // Actualiza el estado con los nuevos IDs de temporizadores
        setTimeoutIds(newTimeoutIds);

        // Limpiar temporizadores si los objetivos cambian
        return () => {
            // timeoutIdsRef.current.forEach((id) => clearTimeout(id));
            // timeoutIdsRef.current = [];

            // Limpieza automática al desmontar el componente
            newTimeoutIds.forEach((id) => clearTimeout(id));

        };
    }, [currentLevel, targets, botBoard, interval, result, name, defeat]);

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

            // botBoard.forEach((board, index) => {
            //     // console.log(botBoard.find(b => b.id === index))


            //     const arrayTargets = board.board.filter(n => targets.includes(n.number))
            //     // const arrayTargets = board.position.filter(n => targets.includes(n.number));
            //     console.log(`Números objetivos en el tablero ${index + 1}: `);
            //     console.log(arrayTargets);


            // });

            // let result: { idBoard: number, targets: { position: Position, number: number }[] }[] = []
            botBoard.forEach((board, index) => {
                const arrayTargets = board.board.filter(n => targets.includes(n.number));

                // result = [
                //     {
                //         idBoard: index,
                //         targets: arrayTargets
                //     },
                //     ...result
                // ]

                // setResult(prevResult => [
                //     ...prevResult,
                //     {
                //         idBoard: index + 1,
                //         targets: arrayTargets
                //     }
                // ]);

                setResult(prevResult => [
                    ...prevResult,
                    {
                        // POR ALGUNA RAZON ES +1
                        idBoard: index + 1,
                        targets: arrayTargets
                    }
                ]);

            })




        }

        if (targets.length === 0) {
            setResult([])
        }

    }, [targets]);


    useEffect(() => {
        console.log(`Números objetivos por cada tablero: `)
        console.log(result)
    }, [result])


    // READY: CREAR UNA FUNCIÓN PARA VERIFICAR SI EL BOT YA TIENE MARCADO UN NUMERO Y SU POSICION EN EL TABLERO
    const handleVerifyNumber = (idBoard: number, number: number) => {
        if (botSelectedNumbers.some(board => board.idBoard === idBoard && board.numbers.includes(number))) {
            return false;
        }
        return true;
    }


    // Función para marcar el numero de forma automatica
    const handleCheckNumber = (idBoard: number, number: number, position: number) => {


        setBotSelectedNumbers(prevState =>
            prevState.map(board =>
                board.idBoard === idBoard
                    ? {
                        // Agrega el elemento al arreglo si no se encuentra ahi, no se repite
                        ...board, numbers: handleVerifyNumber(idBoard, number) ? [...board.numbers, number] : [...board.numbers]
                    }
                    : board
            )
        );

        // positions: board.positions.some(pos => pos.x === position.x && pos.y === position.y)
        //     ? board.positions
        //     : [...board.positions, position]


        setBotSelectedPositions(prevState =>
            prevState.map(board =>
                board.idBoard === idBoard
                    ? {
                        ...board,
                        positions: handleVerifyNumber(idBoard, number) ? [...board.positions, position] : [...board.positions]

                    }
                    : board
            ))
        // return [...prev, position];
    }

    // MARCA LA POSICION SELECCIONADA

    const handleSelectedPosition = (idBoard: number, position: number) => {
        // return botSelectedPositions.some()

        // if (botSelectedPositions.some(pos => pos.idBoard === idBoard && pos.positions.some(p => p.x === position.x && p.y === position.y))) {
        if (botSelectedPositions.some(pos => pos.idBoard === idBoard && pos.positions.some(p => p === position))) {
            //  === position.x && pos.y === position.y)) {
            return true;
        }
        return false;
    };

    const handleCheckWinnerPatternBot = () => {

        // TODO: ¿DETIENE LA EJECUCIÓN DE LA FUNCIÓN?
        if (defeat === true) {
            console.log("EL BOT SE DETIENE")
            return
        };

        if (defeat === false) {
            // Iterar sobre cada tablero del bot
            for (const board of botSelectedPositions) {
                // Verificar si este tablero tiene un patrón ganador
                const hasWinningPattern = patterns?.some(pattern =>
                    pattern.every(position =>
                        // board.positions.some(pos => pos.x === position.x && pos.y === position.y)
                        board.positions.some(pos => pos === position)

                    )
                );

                if (hasWinningPattern) {
                    console.log(
                        `Tu oponente ${name} tiene el patrón asignado en su tablero ${board.idBoard}, tienes 5 segundos para intentar ganarle, nivel: ${currentLevel.level}`
                    );

                    // Marcar derrota después de 5 segundos si el jugador no gana
                    const timeoutId = setTimeout(() => {
                        if (victory) {
                            console.log("El jugador ganó antes de que el bot terminara");
                            handleSetDefeat(false);
                        } else {
                            handleSetDefeat(true);
                            handleSetVictory(false);
                            // TODO: MEJORAR ESTO, LOS DEMÁS BOTS NO DEBEN SEGUIR MARCANDO NUMEROS Y DEBEN DEJAR DE EVALUAR
                            setTargets([]) // SE LIMPIAN LOS NUMEROS OBJETIVOS
                            handleSetDefeat(true);
                            console.log("SE ACABO EL JUEGO: el bot ganó");
                        }
                    }, 5000);

                    // Limpieza del timeout si es necesario
                    return () => clearTimeout(timeoutId);
                }
            }

        }

        // Si ningún tablero tiene un patrón ganador
        // console.log("El bot sigue intentando, no tiene un patrón ganador en ninguno de sus tableros");
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
        setBotSelectedPositions(Array.from({ length: boards }).map((_, index) => ({
            idBoard: index + 1,
            positions: [13]
        })))
        setBotSelectedNumbers(Array.from({ length: boards }).map((_, index) => ({
            idBoard: index + 1,
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

            setBotSelectedPositions(Array.from({ length: boards }).map((_, index) => ({
                idBoard: index + 1,
                positions: [13]
            })))
            setBotSelectedNumbers(Array.from({ length: boards }).map((_, index) => ({
                idBoard: index + 1,
                numbers: [0]
            })))

        }
    }, [defeat])


    return (
        <div className="flex flex-col items-center p-2 bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-200 mb-2">{name}</h2>

            <div className="flex flex-row gap-4">
                {
                    Array.from({ length: boards }).map((_, index) => (
                        <BotBoardNumbers key={index + 1}
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
