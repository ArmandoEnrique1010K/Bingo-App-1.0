import { useEffect, useState } from "react";

const numbers = Array.from({ length: 25 }, (_, i) => i + 1); // Un arreglo de 1 a 25

// const numbers = [1,2,3,4 ... 24,25]
// Dividimos el arreglo en subarreglos de 5 elementos
let rows: number[][] = [];

for (let i = 0; i < numbers.length; i += 5) {
  rows = [...rows, numbers.slice(i, i + 5)];
}

// const target = [3,8,13,18,23]
type PatternBoardProps = {
  color: string
  patterns: number[][]
}

// 1 6 11 16 21
// 2 7 ...   22
// .   .      .
// .      .   .
// 5 8 ...   25

export default function PatternBoard({ color, patterns }: PatternBoardProps) {

  //Para cambiar el índice de patterns cada 5 segundos y reiniciarlo a 0 cuando llegue al índice máximo, puedes usar el hook useState para mantener el índice actual y useEffect para actualizarlo periódicamente. Aquí tienes cómo puedes hacerlo:


  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);

  // Marcar solamente los numeros
  // patterns contiene un arreglo bidimensional
  // Ejemplo: [[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15]]

  const verifyTargets = patterns[currentPatternIndex];



  // LOS PATRONES DEBEN SER DINAMICOS, CADA 5 SEGUNDOS DEBE CAMBIAR AL SIGUIENTE

  // Ejecutar siempre cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPatternIndex((prevIndex) => (prevIndex + 1) % patterns.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [patterns.length]);



  // console.log(verifyTargets);
  return (
    <div className="flex flex-row justify-center"
    // style={{ display: 'flex', flexDirection: 'column' }}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          //   style={{ display: 'flex', justifyContent: 'center' }}
          className="flex flex-col"
        >
          {row.map((num, colIndex) => (
            <div
              key={colIndex}
              className={`size-8 border-solid border-2 border-gray-700 flex items-center justify-center ${verifyTargets.includes(num) ? `bg-${color}-500` : "bg-gray-600"}`}
            //   style={{
            //     width: '40px',
            //     height: '40px',
            //     border: '1px solid black',
            //     display: 'flex',
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //   }}
            >
              {/* {num} */}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
