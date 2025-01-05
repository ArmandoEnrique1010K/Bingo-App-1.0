import { useEffect, useState } from "react";
import { levels } from "../data/levels";
import { generateTargets } from "../utils/generateTargets";
import { generateBoard } from "../utils/generateBoard";
import { Board } from "../types";
import TargetsNumbers from "../components/TargetNumbers";
import BoardNumbers from "../components/BoardNumbers";
import TargetPattern from "../components/TargetPattern";
import Bots from "../components/Bot/Bots";
import LeaveModal from "../components/LeaveModal";
import DefeatModal from "../components/Modals/DefeatModal";
import VictoryModal from "../components/Modals/VictoryModal";

type LevelPageProps = {
    level: number
    unlockLevel: (number: number) => void
}
export default function LevelPage({ level, unlockLevel }: LevelPageProps) {

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

    // Estado para el fin del juego
    const [defeat, setDefeat] = useState(false);

    // Estado para reiniciar el nivel
    const [reboot, setReboot] = useState(false)

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
        setSelectedPositions([]);
        setSelectedNumbers([]);
        setRound(0);
        setVictory(false);
        setDefeat(false)
    }, [level]);

    // TODO: los bots tambien se deben reiniciar
    // TODO: ¿Que pasaria si el jugador pierde?

    // MUESTRA LA VENTANA MODAL Y LUEGO SI EL JUGADOR HACE CLIC EN EMPEZAR DE NUEVO, SE DEBE LIMPIAR LOS DATOS
    useEffect(() => {
        if (defeat === false) {
            setBoard(generateBoard());
            setTargets([]);
            setSelectedPositions([]);
            setSelectedNumbers([]);
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

    // Función para aplicar un estilo al número seleccionado
    const handleSelectedNumber = (number: number, position: number) => {
        if (selectedPositions.includes(position)) {
            // console.log("La casilla del numero " + number + " ha sido seleccionada")
            // console.log("La casilla de la posición " + position + " ha sido seleccionada")
            return "bg-blue-500 text-white"
        }
        // Por defecto
        return "bg-orange-500 text-black"
    }

    // Función para verificar si el usuario ha completado un patrón ganador
    const handleCheckWinnerPattern = () => {
        // Verifica si los numeros que se encuentra en positionTarget, coinciden con los numeros (todos los numeros) de un arreglo que se encuentra en patterWinner
        if (patterns?.some(p => p.every(n => selectedPositions.includes(n)))) {
            console.log("El jugador ha ganado el nivel " + level)
            setVictory(true);
            setTargets([])
            // setGameOver(true)

            // Desbloquea el siguiente nivel
            // 20 es el nivel final
            if (level !== 20) {
                unlockLevel(level + 1);
            }
            // showModalVictory(true)
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


    // // POWERUP para forzar un numero del tablero

    // // Powerup para marcar numeros aleatorios

    // // Powerup para ralentizar bots

    // // Powerup para impedir que un bot gane

    // // Powe


    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
            <div className="container mx-auto p-8 flex flex-row items-center">
                <div className="flex flex-col">
                    <div className="mb-6 text-center">
                        <h1 className="text-4xl font-bold mb-2">Nivel {level}</h1>
                        <p className="text-xl">Ronda: <span className="font-semibold text-cyan-400">{round}</span></p>
                    </div>
                    <TargetsNumbers round={round} targets={targets} handleChangeTargets={handleChangeTargets} />
                    <TargetPattern level={dataLevel.level} text={dataLevel.targetText} />

                    {/* Este boton es para comprobar el patron ganador */}
                    {/* <button
                        className="flex bg-cyan-400 p-2"
                        onClick={() => handleCheckWinnerPattern()
                        }
                    >
                        Comprobar el patron ganador
                    </button> */}

                    <VictoryModal level={dataLevel.level} handleCheckWinnerPattern={handleCheckWinnerPattern} />


                    {/* Botón para abandonar partida */}
                    {/* <button onClick={exitLevel} className="bg-red-600">
                        Abandonar partida
                    </button> */}
                    <LeaveModal />

                    {
                        /* POWERUPS DE PRUEBA */
                    }
                    {/* <button onClick={handleshowBotNumbers}>Mostrar numeros de los oponentes</button> */}

                </div>
                <div className="flex">
                    <BoardNumbers board={board} handleSelectedNumber={handleSelectedNumber} handleClickButton={handleClickButton} />
                </div>


            </div>

            <div className="flex flex-row">
                {
                    dataLevel.bots.map((bot) => (

                        <Bots key={bot.name} dataLevel={dataLevel} targets={targets} interval={bot.interval} name={bot.name} patterns={patterns} handleGameOver={handleDefeat} defeat={defeat} setDefeat={setDefeat}

                        //
                        // showBotNumbers={showBotNumbers}
                        />
                        // <Bot key={bot.name} dataLevel={dataLevel} targets={targets} interval={bot.interval} name={bot.name} patterns={patterns} handleGameOver={handleGameOver}
                        // />
                    ))
                }
            </div>
            {/* READY???: Al hacer clic en el botón End Game se debe limpiar los datos */}
            {
                defeat === true ? (
                    // Esto es una ventana modal que se muestra automaticamente
                    <DefeatModal level={dataLevel.level} defeat={defeat} setDefeat={setDefeat} />
                ) : ""
            }
        </div>
    )
}
