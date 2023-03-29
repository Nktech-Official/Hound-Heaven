export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Creepster";
        this.livesImage = document.getElementById('lives')


    }
    draw(context) {
        context.save();

        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;


        context.font = `${this.fontSize}px ${this.fontFamily}`
        context.textAlign = 'left'
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText(`Score: ${this.game.score}`, 20, 50);

        const seconds = Math.floor((this.game.time / 1000) % 60);
        const minutes = Math.floor((this.game.time / 1000 / 60) % 60);


        //Timer
        context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`
        context.fillText(`Time: ${minutes}:${seconds}`, 20, 80);

        //HighScore
        context.fillText(`High Score: ${localStorage.getItem('lastScore')}`, this.game.width - 180, 50);

        // Lives

        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
        }


        if (this.game.gameOver) {
            if (this.game.score > localStorage.getItem('lastScore')) {
                localStorage.setItem('lastScore', this.game.score)
                context.textAlign = 'center'
                context.font = `${this.fontSize * 0.7}px ${this.fontFamily}`
                // context.fillText('What are creatures of night afraid of? YOU!!', this.game.width * 0.5, this.game.height * 0.5 - 40)

                context.font = `${this.fontSize * 1.5}px ${this.fontFamily}`;
                context.fillText('New High Score', this.game.width * 0.5, this.game.height * 0.5 - 80)
                context.font = `${this.fontSize * 1.2}px ${this.fontFamily}`
                context.fillText(`Score: ${this.game.score}`, this.game.width * 0.5, this.game.height * 0.5 - 30)
                context.font = `${this.fontSize * 0.7}px ${this.fontFamily}`
                context.fillText('What are creatures of night afraid of? YOU!!', this.game.width * 0.5, this.game.height * 0.5 + 10)

            } else {
                context.textAlign = 'center'
                context.font = `${this.fontSize * 1.5}px ${this.fontFamily}`;
                context.fillText('Love at First Bite?', this.game.width * 0.5, this.game.height * 0.5 - 80)
                context.font = `${this.fontSize * 1.2}px ${this.fontFamily}`
                context.fillText(`Score: ${this.game.score}`, this.game.width * 0.5, this.game.height * 0.5 - 30)
                // context.font = `${this.fontSize * 0.7}px ${this.fontFamily}`
                // context.fillText('What are creatures of night afraid of? YOU!!', this.game.width * 0.5, this.game.height * 0.5 + 20)
            }
            context.font = `${this.fontSize * 0.6}px ${this.fontFamily}`
            context.fillText('Press R key to Restart Or Swipe Down', this.game.width * 0.5, this.game.height * 0.5 + 40)
        }
        context.restore();


    }

}