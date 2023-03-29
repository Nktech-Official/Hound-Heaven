/**@type {HTMLCanvasElement} */

import { Game } from "./Game.js";


const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

canvas.width = Math.max(w, h) || 1000
canvas.height = Math.min(w, h) || 600;
console.log(canvas.width, canvas.height);


const game = new Game(canvas.width, canvas.height, 1);
let lastTime = 0
let gameOver = false
export function animate(timeStamp) {
    if (localStorage.getItem('lastScore') === null) {
        localStorage.setItem('lastScore', 0)
    }
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context)
    game.update(deltaTime)
    if (!game.gameOver || !gameOver) { requestAnimationFrame(animate) }
    if (game.gameOver) {
        gameOver = true;
    }
}

export function restartGame() {
    gameOver = false
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    console.log(lastTime);
    lastTime = performance.now()
    console.log(lastTime);
    game.restartGame();
    animate(lastTime);
}

canvas.addEventListener('click', () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) { elem.requestFullscreen(); }
    if (!gameOver) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }

})
document.addEventListener('fullscreenchange', () => {
    if (!gameOver) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
}, false);


console.log(game);
window.addEventListener('load', function (
) {
    animate(0)
})