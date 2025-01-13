import { useEffect, useState } from "react";
import { levels } from "../data/levels";
import { generateTargets } from "../utils/generateTargets";
import { generateBoard } from "../utils/generateBoard";
import { Pattern, Position } from "../types";
import TargetsNumbers from "../components/Target/TargetNumbers";
import BoardNumbers from "../components/Player/BoardNumbers";
import TargetPattern from "../components/Target/TargetPattern";
import Bot from "../components/Bot/Bot";
import LeaveModal from "../components/Modal/LeaveModal";
import DefeatModal from "../components/Modal/DefeatModal";
import VictoryModal from "../components/Modal/VictoryModal";

type LevelPageProps = {
    level: number
    unlockLevel: (number: number) => void
}
export default function LevelPage({ level, unlockLevel }: LevelPageProps) {

    // Obtiene los datos del nivel actual usando el metodo find.
    // Se utiliza levels[0], en el caso de que sea undefined (probabilidad casi nula de que suceda eso)
    const currentLevel = levels.find(l => l.level === level) || levels[0];

    // Variables de estado
    const [board, setBoard] = useState<{ id: number, board: { position: Position; number: number; }[] }[]>([]); // Tableros del jugador
    const [targets, setTargets] = useState<number[]>([]); // Numeros objetivos
    const [patterns, setPatterns] = useState<Pattern[]>([]); // Patrones ganadores

    // POR CADA TABLERO

    // Posiciones de los numeros que ha seleccionado el usuario
    // const [selectedPositions, setSelectedPositions] = useState<{ x: number, y: number }[]>([]);

    const [selectedPositions, setSelectedPositions] = useState<{ idBoard: number, positions: { x: number, y: number }[] }[]>([]);


    // Estado para almacenar los números que ha seleccionado el usuario
    // const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [selectedNumbers, setSelectedNumbers] = useState<{ idBoard: number, numbers: number[] }[]>([]);


    // Estado para el fin del juego si el jugador gano
    const [victory, setVictory] = useState(false)

    // Estado para el fin del juego si el bot gana
    const [defeat, setDefeat] = useState(false);

    // Estado para reiniciar el nivel
    // const [reboot, setReboot] = useState(false)

    // Estado para el turno o ronda
    const [round, setRound] = useState(0)

    // Efecto para cargar los posibles patrones
    useEffect(() => {
        const patterns = currentLevel.patterns;
        setPatterns(patterns);
    }, [currentLevel])


    // Efecto para cargar el tablero
    // useEffect(() => {
    //     const board = generateBoard();
    //     setBoard(board);
    // }, [])

    // Se debera limpiar todos los numeros marcados del tablero cuando pase de nivel o pierda el nivel
    // useEffect(() => {
    //     if (victory === false || defeat === false) {
    //         setTargets([])
    //         // No funciona cuando paso de nivel
    //         setBoard(generateBoard());
    //         setSelectedPositions([])
    //         setSelectedNumbers([])
    //         setRound(0)
    //     }
    // }, [victory, defeat])


    // GENERA NUEVOS TABLEROS DE ACUERDO A LA CANTIDAD ASIGNADA EN EL NIVEL
    const newBoards = Array.from({ length: currentLevel.boards }).map((_, index) => ({
        // Se evita el id igual a 0
        id: index + 1,
        board: generateBoard()
    }));

    // console.log((newBoards))

    useEffect(() => {
        // setBoard(generateBoard());

        // TODO: Debe llamar a generateBoard por cada tablero para generar uno nuevo


        setBoard(newBoards)

        setTargets([]);
        // setSelectedPositions([13]);

        // ASIGNA EN TODOS LOS TABLEROS
        // setSelectedPositions([{ x: 2, y: 2 }]);
        // setSelectedNumbers([0]);
        setSelectedPositions(Array.from({ length: currentLevel.boards }).map((_, index) => ({
            idBoard: index,
            positions: [{ x: 2, y: 2 }]
        })))

        setSelectedNumbers(Array.from({ length: currentLevel.boards }).map((_, index) => ({
            idBoard: index,
            numbers: [0]
        })))


        setRound(0);
        setVictory(false);
        setDefeat(false)
    }, [level]);



    // READY: los bots tambien se deben reiniciar
    // TODO: ¿Que pasaria si el jugador pierde?

    // MUESTRA LA VENTANA MODAL Y LUEGO SI EL JUGADOR HACE CLIC EN EMPEZAR DE NUEVO, SE DEBE LIMPIAR LOS DATOS
    useEffect(() => {
        if (defeat === false) {
            setBoard(newBoards);
            setTargets([]);


            // setSelectedPositions([{ x: 2, y: 2 }]);
            // setSelectedNumbers([0]);
            setSelectedPositions(Array.from({ length: currentLevel.boards }).map((_, index) => ({
                idBoard: index,
                positions: [{ x: 2, y: 2 }]
            })))
            setSelectedNumbers(Array.from({ length: currentLevel.boards }).map((_, index) => ({
                idBoard: index,
                numbers: [0]
            })))

            setRound(0);
            setVictory(false)
        }
    }, [defeat]);




    // Función para cambiar los numeros objetivos
    const handleChangeTargets = () => {
        setTargets([]);
        setRound(round + 1)
        setTimeout(() => {
            setTargets(generateTargets(currentLevel.targetQuantity));
        }, 1000)
    }

    // Función para establecer el fin del juego (si el oponente gano)
    const handleDefeat = () => {
        setDefeat(true);
    }


    // Verifica que el numero ya se encuentre marcado en el tablero
    const handleVerifySelectedNumber = (idBoard: number, number: number): boolean => {
        if (selectedNumbers.some(board => board.idBoard === idBoard && board.numbers.includes(number))) {
            console.log("Este número ya ha sido seleccionado")
            return true;
        }
        return false;
    }


    // Función para marcar un número seleccionado
    const handleClickButton = (idBoard: number, number: number, position: { x: number, y: number }) => {
        // Si uno de los números seleccionados es igual al número objetivo, se agrega la posición a los números seleccionados
        if (targets.includes(number)) {
            if (!handleVerifySelectedNumber(idBoard, number)) {
                setSelectedPositions(prevState =>
                    prevState.map(board =>
                        board.idBoard === idBoard
                            ? { ...board, positions: [...board.positions, position] }
                            : board
                    )
                );
                setSelectedNumbers(prevState =>
                    prevState.map(board =>
                        board.idBoard === idBoard
                            ? { ...board, numbers: [...board.numbers, number] }
                            : board
                    )
                );
                console.log("El usuario selecciono el numero: " + number)
            }
        }
    }

    // Función para aplicar un estilo al número seleccionado según su posición
    const handleSelectedNumber = (idBoard: number, position: { x: number, y: number }) => {
        // console.log("Posiciones seleccionadas: " + JSON.stringify(selectedPositions))
        if (selectedPositions.some(board => board.idBoard === idBoard && board.positions.some(pos => pos.x === position.x && pos.y === position.y))) {
            return true;
        }

        // Ejemplo: [{x: 2, y:2}, {x:1, y:1}]

        // if (selectedPositions.includes(position)) {
        // }

        // if (selectedPositions.some(board => board.positions.some(pos => pos.x === position.x && pos.y === position.y))) {
        //     return true;
        //     // return "bg-blue-500 text-white"
        // }

        // console.log("La casilla del numero " + number + " ha sido seleccionada")
        // console.log("La casilla de la posición " + position + " ha sido seleccionada")

        // Por defecto
        return false;
        // return "bg-orange-500 text-black"
    }

    // Los powerups se desbloquean al completar los niveles:
    // const powerUpLevels = [3, 6, 9, 12, 15, 18];

    // const unlockPowerUpsByLevel = (level: number) => {
    //     const index = powerUpLevels.indexOf(level);
    //     if (index !== -1) {
    //         unlockPowerUp(index + 1); // Desbloquea el power-up correspondiente
    //     }
    // };

    // Función para verificar si el usuario ha completado un patrón ganador
    const handleCheckWinnerPattern = () => {
        // Verifica si los numeros que se encuentra en positionTarget, coinciden con los numeros (todos los numeros) de un arreglo que se encuentra en patterWinner
        // if (patterns?.some(p => p.every(n => selectedPositions.includes(n)))) {

        // TODO: DIFERENCIA ENTRE EVERY, SOME E INCLUDES

        // TODO: EN UNO DE LOS TABLEROS, SI EXISTE EL PATRON OBJETIVO, DEBE TERMINAR LA PARTIDA

        // ERROR: AL PARECER REALIZA UNA COMPARACIÓN UNIENDO TODOS TABLEROS???
        // if (patterns?.some(p => p.every(n => selectedPositions.some(pos => pos.positions.some(position => position.x === n.x && position.y === n.y))))) {

        //     console.log("El jugador ha ganado el nivel " + level)
        //     setVictory(true);
        //     setDefeat(false)

        //     // LIMPIA LOS OBJETIVOS PARA EVITAR QUE EL BOT SIGA MARCANDO
        //     setTargets([])


        //     // Desbloquea el siguiente nivel
        //     // 20 es el nivel final
        //     if (level !== 20) {
        //         unlockLevel(level + 1);
        //     }
        //     // showModalVictory(true)

        //     // DESBLOQUEAR POWERUP POR CADA 3 NIVELES
        //     // if (level === 3){
        //     //     unlockPowerUp(1)
        //     // }

        //     // Trata de desbloquear un powerup
        //     // unlockPowerUpsByLevel(level)

        //     return true;
        // } else {
        //     console.log("Sigue intentando")
        //     return false;
        // }


        for (const board of selectedPositions) {
            if (patterns?.some(p => p.every(n => board.positions.some(position => position.x === n.x && position.y === n.y)))) {
                console.log("El jugador ha ganado el nivel " + level);
                setVictory(true);
                setDefeat(false);

                // LIMPIA LOS OBJETIVOS PARA EVITAR QUE EL BOT SIGA MARCANDO
                setTargets([]);

                // Desbloquea el siguiente nivel
                // 20 es el nivel final
                if (level !== 20) {
                    unlockLevel(level + 1);
                }
                // showModalVictory(true)

                // DESBLOQUEAR POWERUP POR CADA 3 NIVELES
                // if (level === 3){
                //     unlockPowerUp(1)
                // }

                // Trata de desbloquear un powerup
                // unlockPowerUpsByLevel(level)

                return true;
            }
        }

        console.log("Sigue intentando");
        return false;
    };




    // POWERUPS

    // // Estado para visualizar los numeros de los bots
    // const [showBotNumbers, setShowBotNumbers] = useState(false)
    // const [showBotNumbersRoundsLeft, setShowBotNumbersRoundsLeft] = useState(0);


    // // Muestra los numeros de los bots por 5 rondas
    // const handleshowBotNumbers = () => {

    //     setShowBotNumbers(true);
    //     setShowBotNumbersRoundsLeft(5); // Dura 5 rondas

    // }

    // useEffect(() => {
    //     if (showBotNumbersRoundsLeft > 0) {
    //         setShowBotNumbersRoundsLeft(showBotNumbersRoundsLeft - 1);

    //         if (showBotNumbersRoundsLeft === 1) {
    //             // Última ronda: desactiva el power-up
    //             setShowBotNumbers(false);
    //         }
    //     }
    // }, [round]); // Ejecuta cada vez que `round` cambia


    // TODO: INVESTIGAR SOBRE EL USO DE POWERUPS

    // Se pueden desbloquear al completar el nivel: 3, 6, 9, 12, 15, 18

    // Ralentizar a todos los bots (ralentiza el tiempo de demora) por 3 rondas
    // Un bot pierde 5 rondas
    // Forzar un numero deseado (selecciona el número que será sorteado en la siguiente ronda)
    // Desmarcar 1 número (afecta a todos los bots, recordar que el numero puede volver a aparecer en la lista de numeros objetivos) 
    // Marcar números vecinos (si n es el numero seleccionado, debe marcar los numeros: n-2, n-1, n+1 y n+2)
    // Clarividencia (tu puedes ver los números de los bots por 5 rondas)


    //console.log(unlockedPowerUps)
    // [1, 2]

    // Buscar powerups desbloqueado por cada elemento de unlockedPowerUps
    //console.log(powerUps)

    // console.log(unlockedPowerUps)
    // const unlockedPowerUpsList = powerUps.filter(p => unlockedPowerUps.includes(p.id));
    // unlockedPowerUpsList.forEach(p => {
    //     console.log(`Power-Up Desbloqueado: ${p.name}`);
    // });

    // const statusPowerUps = powerUps.map(p => p.status)
    // const [powerUpsStatus, setPowerUpsStatus] = useState<boolean[]>(statusPowerUps);

    // // PRIMER POTENCIADOR
    // const [delayedSlowBot, setDelayedSlowBot] = useState(1);
    // const [slowBotNumbersRoundsLeft, setSlowBotNumbersRoundsLeft] = useState(0);

    // // SEGUNDO POTENCIADOR
    // const [turnOffBotRoundsLeft, setTurnOffBotRoundsLeft] = useState<{ [key: string]: number }>({});
    // //  const [activateTurnOffBot, setActivateTrunOffBot] = useState(false) // Activado el potenciador
    // const [selectedBot, setSelectedBot] = useState('') // Bot seleccionado

    // // const [turnedOff, setTurnedOff] = useState(false); // Apagado del bot
    // const [activateTurnOffBot, setActivateTurnOffBot] = useState<boolean>(false);

    // const handleActivatePowerUp = (powerUpId: number) => {
    //     // SLOW BOTS
    //     if (powerUpId === 1) {
    //         // Tiempo de retraso (triplica el tiempo de demora del bot)
    //         setDelayedSlowBot(3);
    //         setSlowBotNumbersRoundsLeft(5);
    //         // Slice requiere 2 argumentos, la posición inicial y la posición final
    //         const newArray = [
    //             ...powerUpsStatus.slice(0, powerUpId - 1),
    //             false,
    //             ...powerUpsStatus.slice(powerUpId)
    //         ]

    //         setPowerUpsStatus(newArray);
    //         console.log('ID DEL POTENCIADOR: ' + powerUpId)
    //         console.log(newArray)
    //         console.log(newArray[powerUpId - 1])
    //         console.log('Todos los bots van a ser lentos durante 5 turnos')
    //     }

    //     // TURN OFF BOT
    //     if (powerUpId === 2) {
    //         // ACTIVA EL POTENCIADOR PARA SELECCIONAR UN BOT
    //         setActivateTurnOffBot(true)


    //         setTurnOffBotRoundsLeft(5)
    //         const newArray = [
    //             ...powerUpsStatus.slice(0, powerUpId - 1),
    //             false,
    //             ...powerUpsStatus.slice(powerUpId)
    //         ]

    //         setPowerUpsStatus(newArray);



    //         console.log('Un bot se va a desactivar, seleccione un bot')
    //     }
    // }

    // const handleSelectedBot = (botId: string) => {
    //     setSelectedBot(botId);
    //     setTurnOffBotRoundsLeft(prev => ({ ...prev, [botId]: 5 }));
    //     setActivateTurnOffBot(false);
    //     console.log(`El bot ${botId} se ha desactivado por 5 turnos`);
    // };

    // // EFECTO PARA RALENTIZAR BOTS
    // useEffect(() => {
    //     if (slowBotNumbersRoundsLeft > 0) {
    //         setSlowBotNumbersRoundsLeft(slowBotNumbersRoundsLeft - 1);

    //         if (slowBotNumbersRoundsLeft === 1) {
    //             // Última ronda: desactiva el power-up
    //             setDelayedSlowBot(1)
    //             console.log('SE ACABO EL EFECTO DE SLOW BOT')
    //         }
    //     }
    // }, [round]); // Ejecuta cada vez que `round` cambia


    // FUNCIONA, SELECCIONA EL BOT Y LO DESACTIVA
    // useEffect(() => {
    //     if (selectedBot !== "") {
    //         setActivateTrunOffBot(false)
    //         // Apaga el bot
    //         setTurnedOff(true)
    //         console.log("EL BOT " + selectedBot + " SE DESACTIVO POR 5 TURNOS")
    //     }

    //     if (turnOffBotRoundsLeft > 0) {
    //         setTurnOffBotRoundsLeft(turnOffBotRoundsLeft - 1);

    //         if (turnOffBotRoundsLeft === 1) {
    //             // Última ronda: desactiva el power-up
    //             setTurnedOff(false)
    //             setSelectedBot("")
    //             console.log('SE ACABO EL EFECTO DE TURN OFF BOT')
    //         }
    //     }

    // }, [selectedBot, round])

    // useEffect(() => {
    //     const updatedRoundsLeft = { ...turnOffBotRoundsLeft };
    //     Object.keys(turnOffBotRoundsLeft).forEach(botId => {
    //         if (turnOffBotRoundsLeft[botId] > 0) {
    //             updatedRoundsLeft[botId] -= 1;

    //             if (turnOffBotRoundsLeft[botId] === 1) {
    //                 delete updatedRoundsLeft[botId];
    //                 console.log(`Se acabó el efecto de TURN OFF BOT para el bot ${botId}`);
    //             }
    //         }
    //     });
    //     setTurnOffBotRoundsLeft(updatedRoundsLeft);
    // }, [round]);


    // const unlocked = powerUps.filter(p => p.id);
    // unlocked.forEach(p => {
    //     console.log(`Power-Up Desbloqueado: ${p.name}`);
    // });



    // // Powerup para marcar numeros aleatorios

    // // Powerup para ralentizar bots

    // // Powerup para impedir que un bot gane

    // // Powe


    const handleSetDefeat = (boolean: boolean) => {
        setDefeat(boolean)
    }

    const handleSetVictory = (boolean: boolean) => {
        setVictory(boolean)
    }



    // Efecto de gradiente en tailwindcss
    // bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700
    return (
        <div className="w-full min-h-screen bg-gray-800 text-white m-auto">
            <div className="flex flex-col">
                <div className="container mx-auto py-4 flex flex-row items-start gap-6 justify-center">
                    <div className="flex flex-col">
                        {/* TODO: ESTO PODRIA SER UN NUEVO COMPONENTE??? */}
                        <div className="mb-4 text-center bg-gray-700 rounded-xl p-1">
                            <h1 className="text-2xl font-bold mb-2">Nivel {level}</h1>
                            <p className="text-lg">Ronda: <span className="font-semibold text-cyan-400">{round}</span></p>
                        </div>


                        {/* Componente de los numeros objetivos */}
                        {/* TODO: MEJORAR LA LOGICA DE TARGETS, POR UN MILISEGUNDO SE VE QUE SE MUESTRA UN BOTON??? */}
                        <TargetsNumbers round={round} targets={targets} handleChangeTargets={handleChangeTargets} />

                        {/* Componente del patrón ganador */}
                        <TargetPattern level={currentLevel.level} text={currentLevel.targetText} handleCheckWinnerPattern={handleCheckWinnerPattern} />

                        {/* Este boton es para comprobar el patron ganador */}
                        {/* <button
                        className="flex bg-cyan-400 p-2"
                        onClick={() => handleCheckWinnerPattern()
                        }
                    >
                        Comprobar el patron ganador
                    </button> */}



                        {/* Botón para abandonar partida */}
                        {/* <button onClick={exitLevel} className="bg-red-600">
                        Abandonar partida
                    </button> */}
                        {/* <LeaveModal /> */}

                        {
                            /* POWERUPS DE PRUEBA */
                        }
                        {/* <button onClick={handleshowBotNumbers}>Mostrar numeros de los oponentes</button> */}

                    </div>
                    <div className="flex flex-col">
                        {
                            // READY: CREAR UN ARREGLO, LA CANTIDAD DE ELEMENTOS ESTA DADO POR "currentLevel.boards", DEBE RENDERIZAR BOARDNUMBERS POR CADA ELEMENTO DEL ARREGLO
                            Array.from({ length: currentLevel.boards }).map((_, index) => (
                                <BoardNumbers
                                    key={index}
                                    idBoard={index}
                                    board={board.find(b => b.id === index + 1)?.board || []}
                                    handleSelectedNumber={handleSelectedNumber}
                                    handleClickButton={handleClickButton}
                                />
                            ))


                        }
                        {/* <BoardNumbers board={board} handleSelectedNumber={handleSelectedNumber} handleClickButton={handleClickButton} /> */}
                        <div className="bg-gray-700 flex flex-row gap-3 px-3 justify-center items-center rounded-b-xl py-4">
                            <VictoryModal level={level} handleCheckWinnerPattern={handleCheckWinnerPattern} />
                            <LeaveModal />
                        </div>
                    </div>


                </div>

                {/* SECCION PARA AGRUPAR TODOS LOS BOTS */}
                {/* grid grid-cols-4 grid-rows-2 */}

                {/* TODO: AUN NO ES RESPONSIVO */}
                <div className="flex flex-row items-center justify-center mx-auto mt-4 gap-2 mb-4">
                    {
                        currentLevel.bots.map((bot) => (

                            <Bot key={bot.name} currentLevel={currentLevel} targets={targets} interval={bot.interval} name={bot.name} patterns={patterns} boards={bot.boards} handleGameOver={handleDefeat} defeat={defeat} handleSetDefeat={handleSetDefeat} victory={victory} handleSetVictory={handleSetVictory} setTargets={setTargets}

                            />
                        ))
                    }
                </div>


            </div>

            {/* READY???: Al hacer clic en el botón End Game se debe limpiar los datos */}
            {
                defeat === true ? (
                    // Esto es una ventana modal que se muestra automaticamente
                    <DefeatModal level={currentLevel.level} handleSetDefeat={handleSetDefeat} />
                ) : ""
            }
        </div>
    )
}
