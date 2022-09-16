import {canvas, MIN_OBSTACLES, CANVAS_HEIGHT, CANVAS_WIDTH, context, LAMP_HEIGHT, LAMP_WIDTH, MAX_OBSTACLES, MAX_OBSTACLE_SIZE, MIN_OBSTACLE_SIZE, OBSTACLES} from "../globals.js"
import Vector2 from "../../lib/Vector2.js";
import Lamp from "../objects/Lamp.js";
import Obstacle from "../objects/Obstacle.js";

export default class SimulationState{

    constructor(){
        this.cursorPosition = new Vector2(0, 0);
        this.holdingLamp = true;
    }

    enter(params){
        canvas.addEventListener("mousemove", e => {
            this.cursorPosition = new Vector2(e.clientX, e.clientY);
        })
        canvas.addEventListener("mousedown", e => {
            this.lamp.togglePlaced();
        })
        this.lamp = new Lamp(canvas.height / 2 - LAMP_HEIGHT / 2, canvas.width / 2 - LAMP_WIDTH / 2, LAMP_WIDTH, LAMP_HEIGHT);
        
        for(let i = 0; i < Math.random() * (MAX_OBSTACLES - MIN_OBSTACLES) + MIN_OBSTACLES; i++){
            OBSTACLES.push(new Obstacle(Math.random() * CANVAS_WIDTH,
                                        Math.random() * CANVAS_HEIGHT,
                                        MIN_OBSTACLE_SIZE + Math.random() * (MAX_OBSTACLE_SIZE - MIN_OBSTACLE_SIZE),
                                        MIN_OBSTACLE_SIZE + Math.random() * (MAX_OBSTACLE_SIZE - MIN_OBSTACLE_SIZE)))
        }
    }

    exit(){
        canvas.removeEventListener("mousemove");
    }

    update(dt){
        if (!this.lamp.isPlaced)
            this.lamp.centerOn(this.cursorPosition);
        else
            this.lamp.faceTowards(this.cursorPosition);
        this.lamp.update(dt);
    }

    render(){
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        OBSTACLES.forEach(obst => {
            obst.render();
        })
        this.lamp.render();
    }

}