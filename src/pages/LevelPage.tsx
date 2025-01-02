import { useEffect, useState } from "react";
import { levels } from "../data/levels";
import { generateTargets } from "../utils/generateTargets";
import { generateBoard } from "../utils/generateBoard";
import { Board } from "../types";
import TargetsNumbers from "../components/TargetNumbers";
import BoardNumbers from "../components/BoardNumbers";
import TargetPattern from "../components/TargetPattern";
import { Link } from "react-router";
import { dynamicInterval } from "../utils/dynamicInterval";
import Bot from "../components/Bot";

type LevelPageProps = {
    level: number
}

export default function LevelPage({ level }: LevelPageProps) {

    // Buscar el nivel en el arreglo de niveles para obtener los datos
    const dataLevel = levels.find(l => l.level === level) || levels[0];

    // Estado para el los numeros del tablero
    const [board, setBoard] = useState<Board>([]);

    // Estado para los números objetivo
    const [targets, setTargets] = useState<number[]>([]);

    // Estado para los posibles patrones ganadores
    const [patterns, setPatterns] = useState<number[][]>();


    // Estado para almacenar las posiciones de los números que ha seleccionado el usuario
    const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
    // Estado para almacenar los números que ha seleccionado el usuario
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);



    // Estado para el fin del juego
    const [gameOver, setGameOver] = useState(false);

    // Efecto para cargar los posibles patrones
    useEffect(() => {
        const patterns = dataLevel.patterns;
        setPatterns(patterns);
    }, [dataLevel])


    // Efecto para cargar el tablero
    useEffect(() => {
        const board = generateBoard();
        setBoard(board);
    }, [])


    // Función para cambiar los numeros objetivos
    const handleChangeTargets = () => {
        setTargets(generateTargets(dataLevel.targetQuantity));
    }

    // Función para establecer el fin del juego
    const handleGameOver = () => {
        // TODO: Si gameOver es true debe bloquear al jugador de que no siga jugando
        setGameOver(true);
    }

    // TODO: Se debe verificar que el usuario no haga clic sobre un numero que ya esta marcado
    const handleVerifySelectedNumber = (number, position) => {
        if (selectedNumbers.includes(number)) {
            console.log("Este número ya ha sido seleccionado")
            return true
        }
    }


    // Función para marcar un número seleccionado
    const handleClickButton = (number, position) => {
        // Si uno de los números seleccionados es igual al número objetivo, se agrega la posición a los números seleccionados
        if (targets.includes(number)) {
            if (!handleVerifySelectedNumber(number, position)) {
                setSelectedPositions([...selectedPositions, position]);
                setSelectedNumbers([...selectedNumbers, number]);
                console.log("Numero seleccionado: " + number)
            }
        }
    }

    // Función para aplicar un estilo al número seleccionado
    const handleSelectedNumber = (number, position) => {
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
            console.log("Ganaste el nivel " + level)
            setGameOver(true)
        } else {
            console.log("Sigue intentando")
        }
    }


    return (
        <div>
            <div>Pagina del nivel</div>
            <TargetsNumbers targets={targets} handleChangeTargets={handleChangeTargets} />
            <BoardNumbers board={board} handleSelectedNumber={handleSelectedNumber} handleClickButton={handleClickButton} />
            <TargetPattern level={dataLevel.level} text={dataLevel.targetText} />

            <button
                className="flex bg-cyan-400 p-2"
                onClick={() => handleCheckWinnerPattern()
                }
            > Comprobar el patron ganador</button>

            {/* TODO: Al hacer clic en el botón End Game se debe limpiar los datos */}
            <Link to="/">Salir</Link>
            {
                dataLevel.bots.map((bot) => (
                    <Bot key={bot.name} dataLevel={dataLevel} targets={targets} interval={bot.interval} name={bot.name} patterns={patterns} handleGameOver={handleGameOver} />
                ))
            }
            {
                // SI EL OPONENTE HA GANADO
                gameOver === true ? (<div className="bg-red-600 text-yellow-50">Se acabo el juego</div>) : ""
            }

        </div>
    )
}
