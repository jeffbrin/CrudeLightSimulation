export default class Game{

    constructor(stateMachine, width, height, context){
        this.stateMachine = stateMachine;
        this.canvasHeight = height;
        this.canvasWidth = width;
        this.context = context;
        this.lastTime = 0;
    }

    start(){
        this.stateMachine.changeState('simulation');
        this.gameLoop();
    }

    gameLoop(currentTime = 0){
        let dt = currentTime - this.lastTime;

        this.update(dt);

        this.lastTime = currentTime;
		requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(dt){
        this.stateMachine.update();

        this.render();
    }

    render(){

        this.stateMachine.render();
    }

}