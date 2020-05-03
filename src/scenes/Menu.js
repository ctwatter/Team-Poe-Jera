class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    create() {
        this.cameras.main.setBackgroundColor("#FFFFFF");
        this.cameras.main.fadeIn(2010,255, 255, 255);
        //create title guy
        this.anims.create({ key: 'sleep', frames: this.anims.generateFrameNames('titleGuy'), frameRate: 12, repeat: -1 });
        this.titleGuy = this.add.sprite(0, 0, 'titleGuy').setScale(0.5).setOrigin(0,0).play('sleep');

        if (!celeryMode) {
            this.logo = this.add.sprite(game.config.width/2 + 300,game.config.height/2 - 180, 
                'logo').setScale(0.5,0.5).setOrigin(0.5);
        } else {
            this.logo = this.add.sprite(game.config.width/2 + 300,game.config.height/2 - 180, 
                'bad_logo').setScale(0.5,0.5).setOrigin(0.5);
            this.sound.play('goodCelery');
        }

        this.start = this.add.sprite(game.config.width/2 + 300,game.config.height/2 + 50, 
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

        if (celeryMode) {
            scoreConfig.fontFamily = 'Comic Sans MS';
        }

        this.highscore = this.add.text(game.config.width - 20,game.config.height,"Highscore: " + HighScore, scoreConfig).setOrigin(1,1);

        this.clickStart = false;
    }
    

    update() {
        if (this.starting) {
            if (!this.clickStart) {
                if (!celeryMode) {
                    this.sound.play('starting');
                } else {
                    this.sound.play('storting');
                }
                this.clickStart = true;
            }
            this.cameras.main.scrollY -= 4;
            if (this.cameras.main.scrollY <= -1080) {
                this.transitioning();
                this.starting = false;
            }
        }
    }


    transitioning() {
        this.scene.transition({
            target: "playScene",
            duration: 1000,
        });
    }
}