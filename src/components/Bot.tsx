import { useEffect, useRef, useState } from 'react'
import { generateBoard } from '../utils/generateBoard';
import { dynamicInterval } from '../utils/dynamicInterval';
import { Board } from '../types';
import BoardNumbers from './BoardNumbers';

type BotProps = {
}

export default function Bot({ dataLevel, targets, interval, name, patterns, handleGameOver }) {

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
                handleTargetNumber(target.number, target.position);
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
    const handleTargetNumber = (number: number, position: number) => {
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
    const handleSelectedNumber = (number: number) => {
        if (botSelectedNumbers.includes(number)) {
            console.log("La casilla del numero " + number + " ha sido seleccionada")
            // console.log("La casilla de la posición " + position + " ha sido seleccionada")
            return "bg-blue-500 text-white"
        }
        // Por defecto
        return "bg-orange-500 text-black"

    }


    // Función para verificar si el oponente ha ganado
    const handleCheckWinnerPatternBot = () => {
        if (patterns?.some(p => p.every(n => botSelectedPositions.includes(n)))) {
            console.log("Tu oponente " + name + " ganó el nivel " + dataLevel.level);

            // READY: Definir una función que solamente se ejecute una vez si el oponente ha ganado, de tal manera que espere 5 segundos para imprimir el mensaje de victoria
            setTimeout(() => {
                // setVictory(true);
                handleGameOver();
                console.log("SE ACABO EL JUEGO");
            }, 5000);

        }
        // else {
        //     console.log("Tu oponente sigue intentando");
        // }
    };


    // Cada vez que se actualice la posición del objetivo, se verifica si el oponente ha ganado
    useEffect(() => {
        handleCheckWinnerPatternBot();
    }, [botSelectedNumbers]);

    return (
        <div>
            <div>Tablero del bot {name}</div>
            <BoardNumbers

                type="bot"
                board={botBoard}
                handleSelectedNumber={handleSelectedNumber}
                handleClickButton={handleTargetNumber}

            //positionTarget={positionTarget}
            />
        </div>
    )
}
