class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload() {
        this.load.image('background1', './assets/sceneryTest.png');
        this.load.image('player', './assets/playerTest.png')
    }


    create() {
        this.back1 = this.add.tileSprite(0,0,1280,720, 'background1').setOrigin(0,0);
        this.player = this.add.sprite(0, 360, 'player').setOrigin(0,0);
    }

    update() {
        
        this.back1.tilePositionX += 4;
    }
}