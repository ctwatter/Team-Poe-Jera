class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload() {
        this.load.image('background', './assets/bg.png');
        this.load.image('player', './assets/playerTest.png')
        this.load.image('obstacle', './assets/obstacleTest.png')
        this.load.image('enemy', './assets/enemyTest.png')
        this.load.image('gb1', './assets/gb1.png')
        this.load.image('gb2', './assets/gb2.png')

        this.load.atlas('collectibles', './assets/collectibles.png','./assets/collectibles.json')
    }


    create() {
        //this.cameras.main.fadeIn(2000,255, 255, 255);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.back1 = this.add.tileSprite(0,0,2560,720, 'background').setOrigin(0,0);
        this.player = this.physics.add.sprite(0, 355, 'player').setScale(0.4, 0.4).setOrigin(0.8,0.5);

        //testing word clouds
        this.gb1 = this.add.sprite(200,200, 'gb1').setScale(0.5, 0.5);
        this.gb2 = this.add.sprite(500,200, 'gb2').setScale(0.5, 0.5);


        this.test = this.add.sprite(600, 600, 'collectibles', 'gb1');
    }

    update() {
        
        var vx = this.player.body.velocity.x;
        //console.log(vx)
        this.tweens.add({
            targets: this.player,
            x: game.input.mousePointer.x,
            y: game.input.mousePointer.y,
            duration : 200,
            ease: 'Power',
            repeat: 0,
            yoyo: false
            // do ease function based on distance?
        })
        this.back1.tilePositionX += 1;
    }   
}