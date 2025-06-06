// CONSTANTES ESTATICAS, SOLAMENTE MODIFICAR EN UN ENTORNO DE DESARROLLO

import { Modal } from "../types";

// Numero de numeros objetivos por turno por defecto
export const DEFAULT_TARGETS = 3

// Turnos maximos por nivel
export const MAX_TURNS = 20;

// Nivel final
export const FINAL_LEVEL = 30;

// Tiempo de respuesta de reacción del bot si ha ganado (milisegundos) (/1000)
export const BOT_REACTION_DELAY = 5000


// Numero máximo de potenciadores
// export const MAX_POWERUPS = 3;
// https://github.com/tailwindlabs/tailwindcss/discussions/13881

// TIPOS DE VENTANA MODAL VENTANA MODAL
export const VICTORY_MODAL: Modal = {
	type: "victory",
	title: "Felicidades, usted gano🏅",
	message: "Usted a derrotado a los bots. Puedes proceder al siguiente nivel.",
	textButton: {
		left: "Siguiente nivel",
		right: "Salir al menú"
	}
}

export const DEFEAT_MODAL: Modal = {
	type: "defeat",
	title: "Fin del juego🤖",
	message: "Uno de los bots te ha ganado. ¿Deseas volver a intentar este nivel? ",
	textButton: {
		left: "Volver a intentarlo",
		right: "Salir al menú"
	}
}

export const NO_MORE_ROUNDS_MODAL: Modal = {
	type: "defeat",
	title: "No hay más intentos🎲",
	message: "Usted ha sobrepasado el limite de turnos. ¿Deseas volver a intentar este nivel",
	textButton: DEFEAT_MODAL.textButton
}

export const EXIT_MODAL: Modal = {
	type: "exit",
	title: "¿Deseas abandonar la partida?🚪",
	message: "Tu progreso actual no se guardara. ",
	textButton: {
		left: "Si",
		right: "No"
	}
}

export const FINAL_LEVEL_VICTORY_MODAL: Modal = {
	type: "victory",
	title: VICTORY_MODAL.title,
	message: "Usted a derrotado a todos los bots del juego.",
	textButton: {
		left: "Salir al menú",
		right: "" // FALSY
	}
}

export const START_LEVEL_MODAL: Modal = {
	type: "start",
	title: "Nivel ",
	message: "¿Listo para empezar?",
	textButton: {
		left: "Ok",
		right: ""
	}
}

// MUSIC



export const CHANGING = {
	name: 'changing',
	volume: -19
}

export const DREAMS = {
	name: 'dreams',
	volume: -15.5
}

export const END = {
	name: 'end',
	volume: -16
}

export const LIFE = {
	name: 'life',
	volume: -13
}

export const MOONLIGHT = {
	name: 'moonlight',
	volume: -16
}

export const READY = {
	name: 'ready',
	volume: -12
}

export const STONE = {
	name: 'stone',
	volume: -6
}

export const TAP = {
	name: 'tap',
	volume: -16
}