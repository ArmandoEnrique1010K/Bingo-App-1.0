const numbers = Array.from({ length: 25 }, (_, i) => i + 1); // Un arreglo de 1 a 25

// const numbers = [1,2,3,4 ... 24,25]
// Dividimos el arreglo en subarreglos de 5 elementos
let rows: number[][] = [];
for (let i = 0; i < numbers.length; i += 5) {
  rows = [...rows, numbers.slice(i, i + 5)];
}

// const target = [3,8,13,18,23]
type PatternBoardProps = {
  targetPositions: number[]
  color: string
}

export default function PatternBoard({ targetPositions, color }: PatternBoardProps) {

  // Marcar solamente los numeros

  // Una solución común sería usar el método filter o some, junto con includes de esta manera
  const verifyTargets = numbers.filter(n => targetPositions.includes(n))

  console.log(verifyTargets);
  return (
    <div className="flex flex-col"
    // style={{ display: 'flex', flexDirection: 'column' }}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          //   style={{ display: 'flex', justifyContent: 'center' }}
          className="flex justify-center"
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
