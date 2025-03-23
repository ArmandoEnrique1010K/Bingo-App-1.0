type BotNumberViewProps = {
  handleIsSelectedNumber: (idBoard: number, position: number) => boolean;
  value: {
    number: number;
    position: number;
  };
  idBoard: number;
  color: string;
};

export default function BotNumberView({
  handleIsSelectedNumber,
  value,
  idBoard,
  color,
}: BotNumberViewProps) {
  return (
    <>
      <div
        // Aplica un estilo de acuerdo a la condición ternaria
        className={`text-xs sm:text-sm sm:size-6 size-4 text-center sm:border-2 border-0 border-gray-600 text-white 
                    ${
                      handleIsSelectedNumber(idBoard, value.number) === true
                        ? `bg-${color}-500`
                        : "bg-gray-500"
                    }`}
      >
        {/* El bot no muestra los numeros de su tablero */}
        {value.position === 13 ? "F" : /*""*/ value.number}
      </div>
    </>
  );
}
