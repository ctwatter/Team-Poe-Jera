class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload() {
        this.preload.image('joe', './assets/joe.png');
    }


    create() {
        this.back = this.add.tileSprite(0,0,500,500, 'joe').setOrigin(0,0);
    }

    update() {
        console.log("test");
    }
}