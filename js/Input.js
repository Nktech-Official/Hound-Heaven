import { restartGame } from './main.js'
export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.touchY = '';
        this.touchX = ''
        this.touchTreshold = 30;
        this.clickTimer = null;
        this.keyMap = {
            "ArrowLeft":"KeyA",
            "ArrowUp":"KeyW",
            "ArrowRight":"KeyD",
            "ArrowDown":"KeyS",
            "KeyA":"KeyA",
            "KeyW":"KeyW",
            "KeyD":"KeyD",
            "KeyS":"KeyS",
            "Space":"Space",
            "KeyT":"KeyT",
            "KeyR":"KeyR"
        }
        window.addEventListener('keydown', e => {
            if ((this.keyMap[e.code] === 'KeyA' || this.keyMap[e.code] === 'KeyW' || this.keyMap[e.code] === "KeyD" || this.keyMap[e.code] === "KeyS" || this.keyMap[e.code] === "Space") && this.keys.indexOf(this.keyMap[e.code]) === -1) {
                this.keys.push(this.keyMap[e.code])
            }
            else if (this.keyMap[e.code] === 'KeyT') {
                this.game.debug = !this.game.debug
            } else if (this.keyMap[e.code] === "KeyR" && game.gameOver) {
                restartGame()
            }

        })
        window.addEventListener('keyup', e => {
            if (this.keyMap[e.code] === 'KeyA' || this.keyMap[e.code] === 'KeyW' || this.keyMap[e.code] === "KeyD" || this.keyMap[e.code] === "KeyS" || this.keyMap[e.code] === "Space") {
                this.keys.splice(this.keys.indexOf(this.keyMap[e.code]), 1)
            }


        })
        canvas.addEventListener('touchstart', e => {
            // console.log(e);
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
            // if (this.clickTimer == null) {
            //     this.clickTimer = setTimeout(function () {
            //         this.clickTimer = null;

            //     }, 500)
            // } else {
            //     clearTimeout(this.clickTimer);
            //     this.clickTimer = null;
            //     if (this.keys.includes('Space')) {
            //         // this.keys.splice(this.keys.indexOf('Space'),)
            //     } else {
            //         this.keys.push('Space')
            //     }

            // }

        })
        canvas.addEventListener('touchmove', e => {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;

            if (swipeDistanceY > this.game.height / 2 && game.gameOver) {
                restartGame()
            }
            //Verticle 
            if (swipeDistanceY < -this.touchTreshold && this.keys.indexOf('KeyW') === -1) this.keys.push('KeyW')
            else if (swipeDistanceY > this.touchTreshold && this.keys.indexOf('KeyS') === -1) this.keys.push('KeyS')

            //Horizontail
            if (swipeDistanceX < -this.touchTreshold && this.keys.indexOf('KeyA') === -1) { this.keys.push('KeyA'); }
            else if (swipeDistanceX > this.touchTreshold && this.keys.indexOf('KeyD') === -1) { this.keys.push('KeyD'); }


            //restart 

        })
        canvas.addEventListener('touchend', e => {
            console.log(this.keys);
            this.keys.splice(this.keys.indexOf('KeyW'), 1)
            this.keys.splice(this.keys.indexOf('KeyS'), 1)
            this.keys.splice(this.keys.indexOf('KeyA'), 1)
            this.keys.splice(this.keys.indexOf('KeyD'), 1)
            // this.keys.splice(this.keys.indexOf('Space'), 1)
            if (this.clickTimer == null) {
                this.clickTimer = setTimeout(function () {
                    this.clickTimer = null;

                }, 100)
            } else {
                clearTimeout(this.clickTimer);
                this.clickTimer = null;
                if (this.keys.includes('Space')) {
                    // this.keys.splice(this.keys.indexOf('Space'),)
                } else {
                    this.keys.push('Space')
                }

            }
        })


    }
}