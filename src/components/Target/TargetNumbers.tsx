import { useEffect, useState } from "react";

// No olvidar definir los types para las propiedades recibidas
type TargetNumbersProps = {
    handleChangeTargets: () => void;
    targets: number[];
    round: number;
};

export default function TargetNumbers({ handleChangeTargets, targets, round }: TargetNumbersProps) {

    // Controla la visibilidad del botón
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        // Lógica para controlar la visibilidad del botón
        if (targets.length > 0) {
            // Retrasa la visibilidad del botón después de actualizar objetivos
            const timer = setTimeout(() => setShowButton(true), 1500);
            return () => clearTimeout(timer); // Limpia el temporizador
        }

        // Oculta el botón si no hay objetivos
        setShowButton(false);
    }, [targets]);


    // Función para obtener el texto dinámico del botón
    const getButtonText = () => {
        if (round === 0) return "Iniciar partida";
        if (targets.length > 0) return "Siguiente ronda";
        return ""; // Caso para evitar mostrar texto vacío innecesario
    };

    return (
        <div className="bg-gray-700 rounded-xl p-3 shadow-lg min-h-52 w-96 mb-4">
            <h2 className="text-cyan-400 text-xl font-semibold mb-2">Objetivos</h2>

            {/* Renderiza los numeros objetivos si hay elementos en targets */}
            {targets.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 py-4">
                    {targets.map((n, index) => (
                        // Itera sobra cada número y le aplica un estilo
                        <div
                            key={index}
                            className="w-11 h-11 flex items-center justify-center border-2 
                            border-none bg-white text-black font-semibold rounded-full 
                            text-lg shadow-md shadow-black"
                        >
                            {n}
                        </div>
                    ))}
                </div>
            )}

            {/* TODO: MEJORAR LA LOGICA DEL BOTÓN AL MOMENTO DE RENDERIZARLO */}

            {/* Renderiza el botón solamente si es necesario */}
            <div className="text-center mt-2">
                {
                    // Este es un operador ternario simplificado:
                    // (condición) ? resultado_si_verdadero : resultado_si_falso
                    // En este caso, usamos el operador AND (&&) para condicionalmente
                    // renderizar el botón solo si 'showButton' es verdadero o 'round' es 0.
                    (showButton || round === 0) && (
                        <button
                            className="bg-cyan-500 text-white font-semibold px-6 py-3 
                            rounded-lg shadow-black shadow-md hover:bg-cyan-600 
                            active:bg-cyan-700 transition duration-300 mb-4"
                            // Llama a la función que actualiza los objetivos al hacer clic
                            onClick={handleChangeTargets}
                        >
                            {/* Muestra el texto del botón según lo definido en getButtonText */}
                            {getButtonText()}
                        </button>
                    )
                }
            </div>
        </div>
    );
}
