import { Player } from "./Player.js"
import { InputHandler } from "./Input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./Enemy.js";
import { UI } from "./Ui.js";
export class Game {
    constructor(width, height, m) {
        this.score = 0;
        this.width = width;
        this.height = height;
        this.gm = 0.17
        this.groundMargin = this.height * this.gm;
        this.speed = 0;
        this.maxSpeed = 3;
        this.debug = false;
        this.enemies = []
        this.particles = []
        this.collisions = []
        this.floatingMessages = []
        this.enemyTimer = 0
        this.enemyInterval = 1000
        this.fontColor = 'black'
        this.time = 0;
        this.maxTime = 1000 * 60 * m
        this.UI = new UI(this);
        this.gameOver = false;
        this.lives = 5;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this)
        this.player.currentState = this.player.states[0]
        this.player.currentState.enter();
        this.maxParticles = 50


    }
    update(deltaTime) {

        this.time += deltaTime;
        this.width = canvas.width;
        this.height = canvas.height
        this.groundMargin = this.height * this.gm;

        if (this.time > this.maxTime + deltaTime * 2) this.gameOver = true;
        this.background.update()
        this.player.update(this.input.keys, deltaTime)
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy()
            this.enemyTimer = 0
        } else {
            this.enemyTimer += deltaTime
        }
        this.enemies.forEach((enemy, index) => {
            enemy.update(deltaTime)
            if (enemy.markedForDeletion) this.enemies.splice(index, 1)
        })

        // particles
        this.particles.forEach((particle, index) => {
            particle.update()
        })
        if (this.particles.length > this.maxParticles) {
            this.particles.length = this.maxParticles;
        }


        //collisonAnimation
        this.collisions.forEach((collision, index) => {
            collision.update(deltaTime)
        })
        //collisonAnimation
        this.floatingMessages.forEach((floatingMessage) => {
            floatingMessage.update()
        })

        this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion)
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
        this.particles = this.particles.filter(particle => !particle.markedForDeletion)
        this.collisions = this.collisions.filter(collision => !collision.markedForDeletion)

    }
    draw(context) {
        this.background.draw(context)
        this.player.draw(context)

        //enemies
        this.enemies.forEach(enemy => {
            enemy.draw(context)
        })

        // particles 
        this.particles.forEach(particle => {
            particle.draw(context)
        })

        //collisionAnimation
        this.collisions.forEach(collision => {
            collision.draw(context)
        })


        //  Float Mesage
        this.floatingMessages.forEach((floatingMessage) => {
            floatingMessage.draw(context)
        })

        this.UI.draw(context)


    }
    addEnemy() {
        if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this))
        else if (this.speed > 0 && Math.random() > 0.5) this.enemies.push(new ClimbingEnemy(this))
        this.enemies.push(new FlyingEnemy(this))
        // console.log(this.enemies);


    }
    restartGame() {
        this.gameOver = false;
        this.time = 0;
        this.score = 0
        this.lives = 5;
        this.enemies = []
        this.particles = []
        this.collisions = []
        this.floatingMessages = []
        this.player.restart()
        this.background.restart()
        this.player.currentState = this.player.states[0]
        this.player.currentState.enter();


    }
}