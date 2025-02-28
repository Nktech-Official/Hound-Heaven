import { Dust, Fire, Splash } from './particle.js';
const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6


}
const AnimationState = [
    {
        "name": "idle",
        "frames": 7
    },
    {
        "name": "jump",
        "frames": 7
    },
    {
        "name": "fall",
        "frames": 7
    },
    {
        "name": "run",
        "frames": 9
    },
    {
        "name": "dizzy",
        "frames": 11
    },
    {
        "name": "sit",
        "frames": 5
    },
    {
        "name": "roll",
        "frames": 7
    },
    {
        "name": "bite",
        "frames": 7
    },
    {
        "name": "ko",
        "frames": 12
    },
    {
        "name": "gethit",
        "frames": 4
    }
];
class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;

    }

}

export class Sitting extends State {
    constructor(game) {
        super('SITTING', game)

    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 4
        this.game.player.frameY = 5
    }
    handelInput(input) {
        if (input.includes('KeyD') || input.includes('KeyA')) {
            this.game.player.setState(states.RUNNING, 1)
        } else if (input.includes('KeyW')) {
            this.game.player.setState(states.RUNNING, 0)
        } else if (input.includes('Space')) {
            this.game.player.setState(states.ROLLING, 1.2)
        }
    }
}
export class Running extends State {
    constructor(game) {
        super('RUNNING', game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 3
        this.game.player.maxFrame = 8


    }
    handelInput(input) {
        this.game.particles.unshift(new Dust(this.game, this.game.player.x, this.game.player.y))
        // console.log(this.game.particles);
        if (input.includes('KeyS')) {
            this.game.player.setState(states.SITTING, 0)
        } else if (input.includes('KeyW')) {
            this.game.player.setState(states.JUMPING, 1)
        } else if (input.includes('Space')) {
            this.game.player.setState(states.ROLLING, 1.2)
        }

    }
}
export class Jumping extends State {
    constructor(game) {
        super('JUMPING', game)

    }
    enter() {
        this.game.player.frameX = 0

        if (this.game.player.onGround()) this.game.player.vy -= this.game.height * 0.04;
        this.game.player.maxFrame = 6
        this.game.player.frameY = 1



    }
    handelInput(input) {


        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1)
        } else if (input.includes('Space')) {
            this.game.player.setState(states.ROLLING, 1.2)
        } else if (input.includes('KeyS')) {
            this.game.player.setState(states.DIVING, 0)

        }


    }
}
export class Falling extends State {
    constructor(game) {
        super('FALLING', game)

    }
    enter() {
        this.game.player.frameX = 0

        if (this.game.player.onGround()) this.game.player.vy -= 30;
        this.game.player.maxFrame = 6
        this.game.player.frameY = 2



    }
    handelInput(input) {


        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
        } else if (input.includes('KeyS')) {
            this.game.player.setState(states.DIVING, 0)

        }


    }
}

export class Rolling extends State {
    constructor(game) {
        super('ROLLING', game)

    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 6


    }
    handelInput(input) {
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5))

        if (!input.includes('Space') && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
        } else if (!input.includes('Space') && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes('KeyW') && input.includes('Space') && this.game.player.onGround()) {
            this.game.player.vy -= this.game.height * 0.042;
        } else if (input.includes('KeyS') && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING, 0)

        }


    }
}

export class Diving extends State {
    constructor(game) {
        super('DIVING', game)

    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 6
        this.game.player.vy = 15


    }
    handelInput(input) {
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5))

        if (input.includes('Space') && this.game.player.onGround()) {
            this.game.player.setState(states.ROLLING, 1.2);
            for (let i = 0; i < 50; i++) {

                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height))
            }
        }
        else if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
            for (let i = 0; i < 50; i++) {

                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height))
            }
        }


    }
}

export class Hit extends State {
    constructor(game) {
        super('HIT', game)

    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 10
        this.game.player.frameY = 4;


    }
    handelInput(input) {

        if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        }
        else if (this.game.player.frameX >= 10 &&
            !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1)

        }


    }
}
