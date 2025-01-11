import { useEffect, useState } from "react";
import { levels } from "../data/levels";
import { generateTargets } from "../utils/generateTargets";
import { generateBoard } from "../utils/generateBoard";
import { Board } from "../types";
import TargetsNumbers from "../components/Target/TargetNumbers";
import BoardNumbers from "../components/Player/BoardNumbers";
import TargetPattern from "../components/Target/TargetPattern";
import Bots from "../components/Bot/Bots";
import LeaveModal from "../components/Modal/LeaveModal";
import DefeatModal from "../components/Modal/DefeatModal";
import VictoryModal from "../components/Modal/VictoryModal";
import { powerUps } from "../data/powerUps";

type LevelPageProps = {
    level: number
    unlockLevel: (number: number) => void
    unlockPowerUp: (powerUpId: number) => void
    unlockedPowerUps: number[]
}
export default function LevelPage({ level, unlockLevel, unlockPowerUp, unlockedPowerUps }: LevelPageProps) {

    // Buscar el nivel en el arreglo de niveles para obtener los datos
    const dataLevel = levels.find(l => l.level === level) || levels[0];

    // // Estado para el nivel actual
    // const [currentLevel] = useState<number>(dataLevel.level)


    // Estado para el los numeros del tablero
    const [board, setBoard] = useState<Board>([]);

    // Estado para los números objetivo
    const [targets, setTargets] = useState<number[]>([]);

    // Estado para los posibles patrones ganadores
    const [patterns, setPatterns] = useState<number[][]>([]);


    // Estado para almacenar las posiciones de los números que ha seleccionado el usuario
    const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
    // Estado para almacenar los números que ha seleccionado el usuario
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);



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
        const patterns = dataLevel.patterns;
        setPatterns(patterns);
    }, [dataLevel])


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

    useEffect(() => {
        setBoard(generateBoard());
        setTargets([]);
        setSelectedPositions([13]);
        setSelectedNumbers([0]);
        setRound(0);
        setVictory(false);
        setDefeat(false)
    }, [level]);

    // READY: los bots tambien se deben reiniciar
    // TODO: ¿Que pasaria si el jugador pierde?

    // MUESTRA LA VENTANA MODAL Y LUEGO SI EL JUGADOR HACE CLIC EN EMPEZAR DE NUEVO, SE DEBE LIMPIAR LOS DATOS
    useEffect(() => {
        if (defeat === false) {
            setBoard(generateBoard());
            setTargets([]);
            setSelectedPositions([13]);
            setSelectedNumbers([0]);
            setRound(0);
            setVictory(false)
        }
    }, [defeat]);




    // Función para cambiar los numeros objetivos
    const handleChangeTargets = () => {
        setTargets([]);
        setRound(round + 1)
        setTimeout(() => {
            setTargets(generateTargets(dataLevel.targetQuantity));
        }, 1000)
    }

    // Función para establecer el fin del juego (si el oponente gano)
    const handleDefeat = () => {
        setDefeat(true);
    }


    // Verifica que el numero ya se encuentre marcado en el tablero
    const handleVerifySelectedNumber = (number: number): boolean => {
        if (selectedNumbers.includes(number)) {
            console.log("Este número ya ha sido seleccionado")
            return true;
        }
        return false;
    }


    // Función para marcar un número seleccionado
    const handleClickButton = (number: number, position: number) => {
        // Si uno de los números seleccionados es igual al número objetivo, se agrega la posición a los números seleccionados
        if (targets.includes(number)) {
            if (!handleVerifySelectedNumber(number)) {
                setSelectedPositions([...selectedPositions, position]);
                setSelectedNumbers([...selectedNumbers, number]);
                console.log("Numero seleccionado: " + number)
            }
        }
    }

    // Función para aplicar un estilo al número seleccionado según su posición
    const handleSelectedNumber = (position: number) => {
        if (selectedPositions.includes(position)) {
            // console.log("La casilla del numero " + number + " ha sido seleccionada")
            // console.log("La casilla de la posición " + position + " ha sido seleccionada")
            return true;
            // return "bg-blue-500 text-white"
        }
        // Por defecto
        return false;
        // return "bg-orange-500 text-black"
    }

    // Los powerups se desbloquean al completar los niveles:
    const powerUpLevels = [3, 6, 9, 12, 15, 18];

    const unlockPowerUpsByLevel = (level: number) => {
        const index = powerUpLevels.indexOf(level);
        if (index !== -1) {
            unlockPowerUp(index + 1); // Desbloquea el power-up correspondiente
        }
    };

    // Función para verificar si el usuario ha completado un patrón ganador
    const handleCheckWinnerPattern = () => {
        // Verifica si los numeros que se encuentra en positionTarget, coinciden con los numeros (todos los numeros) de un arreglo que se encuentra en patterWinner
        if (patterns?.some(p => p.every(n => selectedPositions.includes(n)))) {
            console.log("El jugador ha ganado el nivel " + level)
            setVictory(true);
            setDefeat(false) // Redundancia
            setTargets([])
            // setGameOver(true)

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
            unlockPowerUpsByLevel(level)

            return true;
        } else {
            console.log("Sigue intentando")
            return false;
        }
    }



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

    const statusPowerUps = powerUps.map(p => p.status)
    const [powerUpsStatus, setPowerUpsStatus] = useState<boolean[]>(statusPowerUps);

    // PRIMER POTENCIADOR
    const [delayedSlowBot, setDelayedSlowBot] = useState(1);
    const [slowBotNumbersRoundsLeft, setSlowBotNumbersRoundsLeft] = useState(0);

    // SEGUNDO POTENCIADOR
    const [turnOffBotRoundsLeft, setTurnOffBotRoundsLeft] = useState<{ [key: string]: number }>({});
    //  const [activateTurnOffBot, setActivateTrunOffBot] = useState(false) // Activado el potenciador
    const [selectedBot, setSelectedBot] = useState('') // Bot seleccionado

    // const [turnedOff, setTurnedOff] = useState(false); // Apagado del bot
    const [activateTurnOffBot, setActivateTurnOffBot] = useState<boolean>(false);

    const handleActivatePowerUp = (powerUpId: number) => {
        // SLOW BOTS
        if (powerUpId === 1) {
            // Tiempo de retraso (triplica el tiempo de demora del bot)
            setDelayedSlowBot(3);
            setSlowBotNumbersRoundsLeft(5);
            // Slice requiere 2 argumentos, la posición inicial y la posición final
            const newArray = [
                ...powerUpsStatus.slice(0, powerUpId - 1),
                false,
                ...powerUpsStatus.slice(powerUpId)
            ]

            setPowerUpsStatus(newArray);
            console.log('ID DEL POTENCIADOR: ' + powerUpId)
            console.log(newArray)
            console.log(newArray[powerUpId - 1])
            console.log('Todos los bots van a ser lentos durante 5 turnos')
        }

        // TURN OFF BOT
        if (powerUpId === 2) {
            // ACTIVA EL POTENCIADOR PARA SELECCIONAR UN BOT
            setActivateTurnOffBot(true)


            setTurnOffBotRoundsLeft(5)
            const newArray = [
                ...powerUpsStatus.slice(0, powerUpId - 1),
                false,
                ...powerUpsStatus.slice(powerUpId)
            ]

            setPowerUpsStatus(newArray);



            console.log('Un bot se va a desactivar, seleccione un bot')
        }
    }

    const handleSelectedBot = (botId: string) => {
        setSelectedBot(botId);
        setTurnOffBotRoundsLeft(prev => ({ ...prev, [botId]: 5 }));
        setActivateTurnOffBot(false);
        console.log(`El bot ${botId} se ha desactivado por 5 turnos`);
    };

    // EFECTO PARA RALENTIZAR BOTS
    useEffect(() => {
        if (slowBotNumbersRoundsLeft > 0) {
            setSlowBotNumbersRoundsLeft(slowBotNumbersRoundsLeft - 1);

            if (slowBotNumbersRoundsLeft === 1) {
                // Última ronda: desactiva el power-up
                setDelayedSlowBot(1)
                console.log('SE ACABO EL EFECTO DE SLOW BOT')
            }
        }
    }, [round]); // Ejecuta cada vez que `round` cambia


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

    useEffect(() => {
        const updatedRoundsLeft = { ...turnOffBotRoundsLeft };
        Object.keys(turnOffBotRoundsLeft).forEach(botId => {
            if (turnOffBotRoundsLeft[botId] > 0) {
                updatedRoundsLeft[botId] -= 1;

                if (turnOffBotRoundsLeft[botId] === 1) {
                    delete updatedRoundsLeft[botId];
                    console.log(`Se acabó el efecto de TURN OFF BOT para el bot ${botId}`);
                }
            }
        });
        setTurnOffBotRoundsLeft(updatedRoundsLeft);
    }, [round]);


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
                        <TargetPattern level={dataLevel.level} text={dataLevel.targetText} handleCheckWinnerPattern={handleCheckWinnerPattern} />

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
                            powerUps.filter(p => unlockedPowerUps.includes(p.id)).map(p => (
                                <div key={p.id}>
                                    {
                                        powerUpsStatus[p.id - 1] === true ? (
                                            <button className="mx-2 bg-green-500" onClick={() => handleActivatePowerUp(p.id)}>{p.name}</button>
                                        ) : (
                                            ""
                                        )
                                    }

                                    {
                                        powerUpsStatus[p.id - 1] === false ? (
                                            <div className="bg-red-600">{p.name}</div>
                                        ) : (
                                            ""
                                        )

                                    }
                                </div>

                            ))
                        }
                        <BoardNumbers board={board} handleSelectedNumber={handleSelectedNumber} handleClickButton={handleClickButton} />
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
                        dataLevel.bots.map((bot) => (

                            <Bots key={bot.name} dataLevel={dataLevel} targets={targets} interval={bot.interval} name={bot.name} patterns={patterns} handleGameOver={handleDefeat} defeat={defeat} handleSetDefeat={handleSetDefeat} victory={victory} handleSetVictory={handleSetVictory} delayedSlowBot={delayedSlowBot} activateTurnOffBot={activateTurnOffBot}

                                // turnedOff={turnedOff} setTurnedOff={setTurnedOff}

                                selectedBot={selectedBot} setSelectedBot={setSelectedBot} handleSelectedBot={handleSelectedBot} bots={dataLevel.bots}

                            //
                            // showBotNumbers={showBotNumbers}
                            />
                            // <Bot key={bot.name} dataLevel={dataLevel} targets={targets} interval={bot.interval} name={bot.name} patterns={patterns} handleGameOver={handleGameOver}
                            // />
                        ))
                    }
                </div>


            </div>

            {/* READY???: Al hacer clic en el botón End Game se debe limpiar los datos */}
            {
                defeat === true ? (
                    // Esto es una ventana modal que se muestra automaticamente
                    <DefeatModal level={dataLevel.level} handleSetDefeat={handleSetDefeat} />
                ) : ""
            }
        </div>
    )
}
