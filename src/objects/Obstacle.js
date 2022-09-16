import { context } from "../globals.js";

export default class Obstacle{
    constructor(x, y, width, height, color = "black"){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    /**
     * Checks to see if the position passed is within this obstacle's bounding box
     * @param {Number} x An x position.
     * @param {Number} y A y position.
     */
    isCollision(x, y){
        return x <= this.x + this.width
            && x >= this.x
            && y >= this.y
            && y <= this.y + this.height;
    }

    render(){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = "black";
    }
}