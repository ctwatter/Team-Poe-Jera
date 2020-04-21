class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload() {
        this.load.image('joe', './assets/joe50.png');
    }


    create() {
        this.back = this.add.tileSprite(0,0,1280,720, 'joe').setOrigin(0,0);
    }

    update() {
        
    }
}