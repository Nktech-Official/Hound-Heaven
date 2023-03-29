class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;

    }
    update() {
        this.width = this.game.width;
        this.height = this.game.height;
        if (this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier


    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);


    }
    restart() {
        this.x = 0;
        this.y = 0;
        this.width = this.game.width;
        this.height = this.game.height;

    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.Layer1Image = document.getElementById('layer1')
        this.layer1 = new Layer(this.game, this.width, this.height, 0.2, this.Layer1Image)
        this.Layer2Image = document.getElementById('layer2')
        this.layer2 = new Layer(this.game, this.width, this.height, 0.4, this.Layer2Image)
        this.Layer3Image = document.getElementById('layer3')
        this.layer3 = new Layer(this.game, this.width, this.height, 0.6, this.Layer3Image)
        this.Layer4Image = document.getElementById('layer4')
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.Layer4Image)

        this.Layer5Image = document.getElementById('layer5')
        this.layer5 = new Layer(this.game, this.width, this.height, 2, this.Layer5Image)
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5,]
    }
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update()
        })
    }
    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context)
        })
    }
    restart() {
        this.backgroundLayers.forEach(layer => {
            layer.restart()
        })
    }
}