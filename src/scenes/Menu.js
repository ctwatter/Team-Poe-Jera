class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload() {
        //this.load.image('background1', './assets/sceneryTest.png');
    }


    create() {
        //this.back1 = this.add.tileSprite(0,0,1280,720, 'background1').setOrigin(0,0);
    }

    update() {
        this.scene.start("playScene");
        //this.back1.tilePositionX += 4;
    }
}