class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload() {
        this.load.image('background1', './assets/sceneryTest.png');
        this.load.image('player', './assets/playerTest.png')
        this.load.image('obstacle', './assets/obstacleTest.png')
        this.load.image('enemy', './assets/enemyTest.png')
    }


    create() {
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.back1 = this.add.tileSprite(0,0,1280,720, 'background1').setOrigin(0,0);
        this.player = this.physics.add.sprite(0, 355, 'player').setOrigin(0,0);
    }

    update() {
        
        this.back1.tilePositionX += 4;
    }
}