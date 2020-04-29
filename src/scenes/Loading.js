class Loading extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        let loadConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '26px',
            color: '#000000',
        }
        this.loadingText = this.add.text(game.config.width/2, game.config.height/2, "Loading...", loadConfig).setOrigin(0.5);
        loadConfig.fontSize = '16px';
        this.progressText = this.add.text(game.config.width/2, game.config.height/2 + 40, "", loadConfig).setOrigin(0.5);
        this.progressUpdate("0%");
        this.load.image('logo', './assets/logo.png')
        this.progressUpdate("6%");
        this.load.image('start', './assets/start.png')
        this.progressUpdate("12%");
        this.load.image('background', './assets/bg.png')
        this.progressUpdate("18%");
        this.load.image('player', './assets/playerTest.png')
        this.progressUpdate("24%");
        this.load.image('obstacle', './assets/obstacleTest.png')
        this.progressUpdate("30%");
        this.load.image('enemy', './assets/enemyTest.png')
        this.progressUpdate("36%");
        this.load.image('gb1', './assets/gb1.png')
        this.progressUpdate("42%");
        this.load.image('gb2', './assets/gb2.png')
        this.progressUpdate("48%");
        this.load.image('trail', './assets/trailParticle.png')
        this.progressUpdate("54%");

        this.load.atlas('collectibles', './assets/collectibles.png','./assets/collectibles.json')
        this.progressUpdate("60%");
        this.load.atlas('uncollectibles', './assets/uncollectibes.png','./assets/uncollectibles.json')
        this.progressUpdate("72%");

        this.load.audio('bgm', './assets/bgm.wav')
        this.progressUpdate("79%");
        this.load.audio('bonk', './assets/sfx_bonk.wav')
        this.progressUpdate("86%");
        this.load.audio('poof', './assets/sfx_good.wav')
        this.progressUpdate("93%");
        this.load.audio('starting', './assets/sfx_start.wav')
        this.progressUpdate("100%");
        this.cameras.main.fadeOut(2000,255, 255, 255);
        this.cameras.main.on('camerafadeoutcomplete', () => {
            this.time.delayedCall(500, ()=> {
                this.scene.transition({
                    target: 'menuScene',
                    duration: 10,
                });
            });
        });
    }

    progressUpdate(text) {
        this.progressText.setText(text);
    }
}