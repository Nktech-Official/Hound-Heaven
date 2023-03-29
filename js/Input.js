import { restartGame } from './main.js'
export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.touchY = '';
        this.touchX = ''
        this.touchTreshold = 30;
        this.clickTimer = null;
        window.addEventListener('keydown', e => {
            if ((e.code === 'KeyA' || e.code === 'KeyW' || e.code === "KeyD" || e.code === "KeyS" || e.code === "Space") && this.keys.indexOf(e.code) === -1) {
                this.keys.push(e.code)
            }
            else if (e.code === 'KeyT') {
                this.game.debug = !this.game.debug
            } else if (e.code === "KeyR" && game.gameOver) {
                restartGame()
            }


        })
        window.addEventListener('keyup', e => {
            if (e.code === 'KeyA' || e.code === 'KeyW' || e.code === "KeyD" || e.code === "KeyS" || e.code === "Space") {
                this.keys.splice(this.keys.indexOf(e.code), 1)
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