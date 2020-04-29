class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    create() {
        Score = 0;
        this.cameras.main.fadeIn(2000,255, 255, 255);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.back1 = this.add.tileSprite(0,0,2560,720, 'background').setOrigin(0,0);
        this.player = this.physics.add.sprite(0, 355, 'player').setScale(0.4, 0.4).setOrigin(0.8,0.5);
        //this.player.setCollideWorldBounds(true);




        let airStreamParticles = this.add.particles('trail');
        let airStreamEmitter1 = airStreamParticles.createEmitter({
            follow: this.player,
            followOffset: {
                x: -25,
                y: -43
            },
            alpha: { start: .1, end: 0 },
            scale: { start: 0.1, end: 0 },
            speedX: { min: -1000, max: -500 },
            speedY: { min: -5, max: 5},
            frequency: 5,
            quantity: {min : 10, max: 10},
            //angle: { min : 0, max : 360},
            lifespan: 500
        });
        let airStreamEmitter2 = airStreamParticles.createEmitter({
            follow: this.player,
            followOffset: {
                x: -5,
                y: 40
            },
            alpha: { start: .1, end: 0 },
            scale: { start: 0.1, end: 0 },
            speedX: { min: -1000, max: -500 },
            speedY: { min: -5, max: 5},
            frequency: 5,
            quantity: {min : 10, max: 10},
            //angle: { min : 0, max : 360},
            lifespan: 500
        });
        //cloud explosion


        //airStreamEmitter.startFollow(this.player);

        airStreamEmitter1.start();
        //this.gb1 = this.add.sprite(200,200, 'gb1').setScale(0.5, 0.5);
        //this.gb2 = this.add.sprite(500,200, 'gb2').setScale(0.5, 0.5);;

        this.bubbleGroup = this.add.group({
            runChildUpdate: true
        });

        this.addBubble();
        this.addBubble();

        this.physics.add.overlap(this.player, this.bubbleGroup, this.bubbleOverlap, null, this)

        this.bgm = game.sound.add('bgm');
        this.bgm.loop = true;
        this.bgm.play();



        //adding score
        //score display
        let scoreConfig = {
            fontFamily: 'Times New Roman',
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

        this.scoreMilestone = [500, 1000, 2000, 3000, 4000, 5000];
        this.currMilestone = 0;
        this.lastMilestone = 10000;
        this.score = this.add.text(10,0, 'Score: ' + Score, scoreConfig).setOrigin(0,0);

        //game over flag
        this.gameOver = false;
    }

    addBubble() {

        let bubble1 = new bubble(this, 1280, 1000, 'gb1').setScale(0.5, 0.5);
        bubble1.resetLoc();
        this.bubbleGroup.add(bubble1);

    }

    update() {

        //var vx = this.player.body.velocity.x;
        //player movement
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
        //background movement
        this.back1.tilePositionX += 1;

        this.score.setText("Score: " + Score);


        if(this.currMilestone >= this.scoreMilestone.length){
            if(Score > this.lastMilestone)
            {
                console.log("ADD CLOUD1");
                this.lastMilestone += 5000;
                this.addBubble();
                //play chime?
            }
        } else if(Score >= this.scoreMilestone[this.currMilestone])
        {
            console.log("ADD CLOUD2");
            this.currMilestone++;
            this.addBubble();
            //play chime?
        }
    }

    bubbleOverlap(player, bubble) {
        if (!this.gameOver) {
            if(bubble.good == 0){
                //play sound here
                this.sound.play('poof');
                let cloudExParticles = this.add.particles('trail');
                let cloudExEmitter1 = cloudExParticles.createEmitter({
                    alpha: { start: 1, end: 0 },
                    scale: { start: 0.1, end: 0 },
                    speedX: { min: -500, max: 500 },
                    speedY: { min: -500, max: 500 },
                    frequency: 5,
                    quantity: {min : 10, max: 10},
                    //angle: { min : 0, max : 360},
                    lifespan: 500
                });
                Score += 100;

                cloudExEmitter1.explode(150, bubble.x, bubble.y);

                //update score
                bubble.resetLoc();
                console.log("test");
            } else {
                //game over you made a booboo

                if(Score > HighScore)
                {
                    HighScore = Score;
                }

                //do scene change
                this.sound.play('bonk');
                let cloudExParticles = this.add.particles('trail');
                let cloudExEmitter1 = cloudExParticles.createEmitter({
                    alpha: { start: 1, end: 0 },
                    scale: { start: 0.1, end: 0 },
                    speedX: { min: -500, max: 500 },
                    speedY: { min: -500, max: 500 },
                    frequency: 5,
                    quantity: {min : 10, max: 10},
                    //angle: { min : 0, max : 360},
                    lifespan: 500
                });
                cloudExEmitter1.explode(150, bubble.x, bubble.y);
                bubble.resetLoc();
                this.gameOver = true;
                this.cameras.main.fadeOut(2000,255, 255, 255);
                this.tweens.add({
                    targets: this.bgm,
                    volume: 0,
                    duration: 1500,
                });
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.transitioning();
                });
            }
        }

    }

    transitioning() {
        this.time.delayedCall(2000, () => {
            this.scene.transition({
                target: 'menuScene',
                duration: 10,
            });
        });
    }
}
