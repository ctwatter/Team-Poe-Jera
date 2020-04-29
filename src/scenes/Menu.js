class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload() {
        this.load.image('logo', './assets/logo.png');
        this.load.image('start', './assets/start.png');

        this.load.audio('starting', './assets/sfx_start.wav');
    }


    create() {
        this.cameras.main.setBackgroundColor("#FFFFFF");
        this.logo = this.add.sprite(game.config.width/2 + 330,game.config.height/2 - 180, 
            'logo').setScale(0.5,0.5).setOrigin(0.5);

        this.start = this.add.sprite(game.config.width/2 + 330,game.config.height/2 + 50, 
                'start').setScale(0.5,0.5).setOrigin(0.5).setInteractive();
  
        this.starting = false;

        this.start.on('pointerdown', () => {
            this.starting = true;
        });


        let scoreConfig = {
            fontFamily: 'Times New Roman Bold',
            fontSize: '26px',
            color: '#000000',
            align: 'left',
            padding: {
                top: 15,
                bottom: 15,
                left: 15,
                right: 15
            },
            
        }
        this.highscore = this.add.text(game.config.width - 20,game.config.height,"Highscore: " + HighScore, scoreConfig).setOrigin(1,1);
    }
    

    update() {
        if (this.starting) {
            this.cameras.main.scrollY -= 4;
            if (this.cameras.main.scrollY <= -1080) {
                this.transitioning();
                this.starting = false;
            }
        }
    }


    transitioning() {
        this.sound.play('starting');
        this.scene.transition({
            target: "playScene",
            duration: 1000,
        });
    }
}