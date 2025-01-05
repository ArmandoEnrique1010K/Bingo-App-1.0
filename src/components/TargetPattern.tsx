export default function TargetPattern({ level, text }) {

    return (
        <>
            <div>Forma el siguiente patrón</div>
            <div>{text}</div>

            {/* Dirección de la imagen que contiene el patrón */}

            <img src={`/images/patterns/level_${level}.svg`} alt={`Patrón del nivel ${level}`} />
        </>
    )
}
