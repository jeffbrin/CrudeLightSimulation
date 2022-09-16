import { clamp } from "../../lib/Utils.js";
import Vector2 from "../../lib/Vector2.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, OBSTACLES } from "../globals.js";

export default class Lamp{
    constructor(x, y, width, height, lightAngle = 45){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isPlaced = false;
        this.lightAngle = lightAngle;
    }

    update(dt){

    }

    render(){
        context.fillRect(this.x, this.y, this.width, this.height);

        if(this.isPlaced)
            this.drawLightEdges();
    }

    /**
     * Centers the lamp at the position.
     * @param {Vector2} position The position of the center of the lamp
     */
    centerOn(position){
        this.x = clamp(position.x - this.width / 2, 0, CANVAS_WIDTH - this.width);
        this.y = clamp(position.y - this.height / 2, 0, CANVAS_HEIGHT - this.height);
        this.center = position;
    }

    togglePlaced(){
        this.isPlaced = !this.isPlaced;
    }

    faceTowards(position){
        this.target = position;
    }

    drawLightEdges(){

        // Find the "corners"

        // Get the opposite side's slope
        let xDiff = (this.target.x - this.x);
        if (xDiff == 0) xDiff = 0.0001 
        let adjacentSlope = ((this.target.y - this.y) / xDiff);
        let oppositeSlope = -1/adjacentSlope;

        // Find the target length of the opposite side
        let adjacentLength = this.distanceBetween(this.center.x, this.target.x, this.center.y, this.target.y);
        let oppositeLengthTarget = Math.sin(this.lightAngle / 180 * Math.PI / 2) * adjacentLength

        // Find the corner x value which makes the opposite side the correct length
        const raysBuffer = 1;
        const farEdgePositions = []
        let positionFound = false;
        let cornerX = this.target.x;
        let cornerY;
        while(!positionFound){
            cornerX += Math.abs(oppositeSlope) < 1 ? raysBuffer + 1 : (raysBuffer + 1) / oppositeSlope;
            cornerY = this.oppositeLineFunction(cornerX, oppositeSlope);
            farEdgePositions.push(new Vector2(cornerX, cornerY));

            positionFound = this.distanceBetween(this.target.x, cornerX, this.target.y, cornerY) >= oppositeLengthTarget;
        }


        // Save the first corner
        const firstCorner = new Vector2(cornerX, cornerY);
        
        // Draw the other corner
        cornerY = this.target.y;
        for (cornerX = this.target.x; this.distanceBetween(this.target.x, cornerX, this.target.y, cornerY) < oppositeLengthTarget; cornerX -= Math.abs(oppositeSlope) < 1 ? (raysBuffer + 1) : (raysBuffer + 1) / oppositeSlope){
            cornerY = this.oppositeLineFunction(cornerX, oppositeSlope);
            farEdgePositions.push(new Vector2(cornerX, cornerY));
        }
        
        // Save the second corner
        const secondCorner = new Vector2(cornerX, cornerY);        

        // Fill the interior of the "light";
        context.fillStyle = "grey";
        farEdgePositions.forEach(pos => {
            this.drawLineTowards(this.center, pos, 10, 1);
        })
        context.fillStyle = "black";

        // Draw the corners
        context.fillRect(secondCorner.x - 10, secondCorner.y - 10, 10, 2)
        context.fillRect(firstCorner.x - 10, firstCorner.y - 10, 10, 2)

        // Draw edge lines
        this.drawLineTowards(this.center, firstCorner, 10, 2);
        this.drawLineTowards(this.center, secondCorner, 10, 2);

    }

    drawLineTowards(startingPosition, finalPosition, drawSize = 10, stepSize = 10){
        const slope = (finalPosition.y - startingPosition.y) / (finalPosition.x - startingPosition.x);

        let drawPosition = new Vector2(startingPosition.x, startingPosition.y);

        // Draw each little line
        const xPositionIncreasing = finalPosition.x > startingPosition.x;
        while((xPositionIncreasing && drawPosition.x < finalPosition.x)
            || (!xPositionIncreasing && drawPosition.x > finalPosition.x)){

            context.fillRect(drawPosition.x - drawSize, drawPosition.y - drawSize, drawSize, drawSize);
            
            if (OBSTACLES.some(obst => obst.isCollision(drawPosition.x, drawPosition.y)))
                break
                

            if (xPositionIncreasing){
                drawPosition.x += stepSize;
                drawPosition.y += stepSize * slope;
            }
            else
            {
                drawPosition.x -= stepSize;
                drawPosition.y -= stepSize * slope;
            }
            
            

            
        }
    }

    drawAllPositions(positions, size){
        positions.forEach(pos => {
            context.fillRect(pos.x - size, pos.y - size, size, size);
        });
    }

    distanceBetween(startingX, otherX, startingY, otherY){
        return Math.sqrt(Math.pow(otherX - startingX, 2) + Math.pow(otherY - startingY, 2))
    }

    /**
     * Returns the y position on the opposite line of the triangle at the given x position.
     * @param {Number} x The x position in the function.
     * @param {Number} slope The slope of the opposite line.
     */
    oppositeLineFunction(x, slope){
        return (x - this.target.x) * slope + this.target.y;
    }
}