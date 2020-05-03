class Loading extends Phaser.Scene {
    constructor() {
        super("loadingScene"); 
        
    }

    preload() {
        this.cameras.main.setBackgroundColor('#FFFFFF');

        let celeryCombo = this.input.keyboard.createCombo('celery', { 
            resetOnWrongKey: true,
            maxKeyDelay: 0,
            resetOnMatch: true,
            deleteOnMatch: false,
        });

        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo == celeryCombo) {
                celeryMode = true; // :^)
            }
        });

        let loadConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '48px',
            color: '#000000',
            align: 'center',
        }
       
        this.loadingText = this.add.text(game.config.width/2, game.config.height/2 - 64, "Loading", loadConfig).setOrigin(0.5);

        loadConfig.fontSize = '20px';
        this.rnd = Phaser.Math.RND;
        this.randomThings = ["見ぬが花\nReality can't compete with imagination",
                             "一刻千金\nEvery moment is precious",
                             "時は金なり\nTime is precious",
                             "おのれに忠実であれ\nBe true to yourself",
                             "待てば海路の日和あり\nGood things come to those who wait",
                             "思う念力岩をも通す\nWhere there is a will there is a way",
                             "一寸先は闇\nNo one knows what lies ahead",];
        this.randomTing = this.rnd.pick(this.randomThings);
        this.randomText = this.add.text(game.config.width/2, game.config.height/2 + 32, this.randomTing, loadConfig).setOrigin(0.5);
       
        
        
        //load images
        this.load.image('rules', './assets/rules.png');
        this.load.image('logo', './assets/logo.png')
        this.load.image('start', './assets/start.png')
        this.load.image('background', './assets/bg.png')
        this.load.image('dummy', './assets/dummy.png')
        this.load.image('trail', './assets/trailParticle.png')
        this.load.image('2xscore', './assets/bonus.png')
        this.load.image('2xindicator', './assets/2xindicator.png')
        this.load.image('fgc3', './assets/fgCloud3.png')
        this.load.image('cloudExplode', './assets/cloudParticle.png');
        

        //load atlases
        this.load.atlas('collectibles', './assets/collectibles.png','./assets/collectibles.json')
        this.load.atlas('uncollectibles', './assets/uncollectibes.png','./assets/uncollectibles.json')
        this.load.atlas('rainbowTrail', './assets/trailParticle-SheetRainbowPastel.png', './assets/trailParticle.json')
        this.load.atlas('player', './assets/playerSprites.png', './assets/playerSprites.json')
        this.load.atlas('titleGuy', './assets/titleSprites.png', './assets/titleSprites.json')
        this.load.atlas('taitorugai', './assets/tidalSprite.png', './assets/titleSprites.json')
        this.load.atlas('fg', './assets/fg.png', './assets/fg.json')

        //load audios
        this.load.audio('bgm', './assets/bgm.wav')
        this.load.audio('bonk', './assets/sfx_bonk.wav')
        this.load.audio('poof', './assets/sfx_good.wav')
        this.load.audio('slurp', './assets/sfx_pickupstart.wav')
        this.load.audio('noslurp', './assets/sfx_pickupend.wav')
        this.load.audio('milestone', './assets/sfx_milestone.wav')
        this.load.audio('starting', './assets/sfx_start.wav')

        //load celery
        this.load.image('celery', './assets/celery.png')
        this.load.image('bad_logo', './assets/logo_celery.png') 
        this.load.audio('goodCelery', './assets/sfx_celery.wav')
        this.load.audio('badCelery', './assets/sfx_c_e_l_e_r_y.wav')
        this.load.audio('pickupCelery', './assets/sfx_yrelec.wav')
        this.load.audio('nopickupCelery', './assets/sfx_y_r_e_l_e_c.wav')
        this.load.audio('mylestun', './assets/sfx_mylestun.wav')
        this.load.audio('storting', './assets/sfx_stort.wav')

        //done loading, move to menu
        
    }

    //this is an instance of where we do 
    //scene transitions (back to menu in this case)

    create(){
        this.add.image(game.config.width/2, 550 , 'rules').setScale(0.75, 0.75).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.cameras.main.fadeOut(2000,255, 255, 255);
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.time.delayedCall(500, () => {
                    this.scene.transition({
                        target: 'menuScene',
                        duration: 20,
                    });
                });
            });
        });
    }
}
