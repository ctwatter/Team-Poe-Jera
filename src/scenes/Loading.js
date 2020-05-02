class Loading extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
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
        this.load.image('logo', './assets/logo.png')
        this.load.image('start', './assets/start.png')
        this.load.image('background', './assets/bg.png')
        //this.load.image('player', './assets/playerTest.png')

        this.load.image('gb1', './assets/gb1.png')
        this.load.image('gb2', './assets/gb2.png')
        this.load.image('trail', './assets/trailParticle.png')
        this.load.image('2xscore', './assets/legosi.png');
        this.load.image('fgc3', './assets/fgCloud3.png')

        //load atlases
        this.load.atlas('collectibles', './assets/collectibles.png','./assets/collectibles.json')
        this.load.atlas('uncollectibles', './assets/uncollectibes.png','./assets/uncollectibles.json')
        this.load.atlas('player', './assets/playerSprites.png', './assets/playerSprites.json');
        this.load.atlas('titleGuy', './assets/titleSprites.png', './assets/titleSprites.json');
        this.load.atlas('fg', './assets/fg.png', './assets/fg.json');

        //load audios
        this.load.audio('bgm', './assets/bgm.wav')
        this.load.audio('bonk', './assets/sfx_bonk.wav')
        this.load.audio('poof', './assets/sfx_good.wav')
        this.load.audio('starting', './assets/sfx_start.wav')

        //done loading, move to menu
        this.time.delayedCall(2000, () => {
            this.cameras.main.fadeOut(2000,255, 255, 255);
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.time.delayedCall(500, () => {
                    this.scene.transition({
                        target: 'menuScene',
                        duration: 10,
                    });
                });
            });
        });
    }
}