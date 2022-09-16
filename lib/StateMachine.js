export default class StateMachine{
    constructor(){
        this.states = {}
    }

    addState(name, state){
        this.states[name] = state;
    }

    changeState(state, params = null){
        if (this.currentState)
            this.currentState.exit();
        this.currentState = this.states[state];
        this.currentState.enter(params);
    }

    update(dt){
        this.currentState.update(dt);
    }

    render(){
        this.currentState.render();
    }
}