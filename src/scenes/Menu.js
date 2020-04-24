class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload() {
        this.load.image('logo', './assets/logo.png');
    }


    create() {
        this.back1 = this.add.sprite(game.config.width/2,game.config.height/2, 'logo').setOrigin(0.5);
    }

    update() {
        this.scene.start("playScene");
        //this.back1.tilePositionX += 4;
    }
}