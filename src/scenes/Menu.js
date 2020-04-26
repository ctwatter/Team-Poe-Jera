class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload() {
        this.load.image('logo', './assets/logo.png');
        this.load.image('start', './assets/start.png');
    }


    create() {
        this.add.rectangle(0,0,1280,720, 0xFFFFFF).setOrigin(0,0);
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#000000");
        this.logo = this.add.sprite(game.config.width/2 + 330,game.config.height/2 - 180, 
            'logo').setScale(0.5,0.5).setOrigin(0.5);

        this.start = this.add.sprite(game.config.width/2 + 330,game.config.height/2 + 50, 
                'start').setScale(0.5,0.5).setOrigin(0.5).setInteractive();

        //Called when clicked on start        
        this.start.on('pointerdown', () => {

            this.cameras.main.fade(2000, 255, 255, 255);
            this.scene.start("playScene");
            
        });

        //this is called after screen fades out completely
        this.cameras.main.on('camerafadeoutcomplete', () => {
    
            this.scene.start("playScene");
    
        });
    }
    

    update() {
        //this.scene.start("playScene");
        //this.back1.tilePositionX += 4;
    }

}