import Game from "../lib/Game.js";
import StateMachine from "../lib/StateMachine.js";
import { canvas, CANVAS_HEIGHT, CANVAS_WIDTH, context } from "./globals.js";
import SimulationState from "./states/SimulationState.js";


canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1')

canvas.style.backgroundColor = "beige";
document.body.appendChild(canvas);

const stateMachine = new StateMachine();
stateMachine.addState('simulation', new SimulationState());

const game = new Game(stateMachine, CANVAS_WIDTH, CANVAS_HEIGHT, context);
game.start();