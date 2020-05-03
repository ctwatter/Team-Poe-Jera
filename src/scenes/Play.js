class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    create() {
        Score = 0;
        maxSpeed = -10;
        this.cameras.main.fadeIn(2000,255, 255, 255);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.back1 = this.add.tileSprite(0,0,2560,720, 'background').setOrigin(0,0);


        this.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('player'), frameRate: 8, repeat: -1 });


        this.player = this.physics.add.sprite(0, 355, 'player').setScale(0.3).play('idle').setOrigin(.75, .4);


        this.airStreamParticles = this.add.particles('rainbowTrail');
        this.airStreamEmitter1 = this.airStreamParticles.createEmitter({
            follow: this.player,
            frame: ['trailParticle 0.png'],
            followOffset: {
                x: -17,
                y: -34
            },
            alpha: { start: 0, end: 0 },
            scale: { start: 0.1, end: 0 },
            speedX: { min: -1500, max: -250 },
            speedY: { min: -5, max: 5},
            frequency: 5,
            quantity: {min : 10, max: 10},
            //angle: { min : 0, max : 360},
            lifespan: 500
        });
        this.airStreamEmitter2 = this.airStreamParticles.createEmitter({
            follow: this.player,
            frame: ['trailParticle 0.png'],
            followOffset: {
                x: 10,
                y: 50
            },
            alpha: { start: 0, end: 0 },
            scale: { start: 0.1, end: 0 },
            speedX: { min: -1500, max: -250 },
            speedY: { min: -5, max: 5},
            frequency: 5,
            quantity: {min : 10, max: 10},
            //angle: { min : 0, max : 360},
            lifespan: 500
        });



        // //airStreamEmitter.startFollow(this.player);

        this.airStreamEmitter1.start();
        this.airStreamEmitter2.start();
        this.airStreamAlpha = 0;

        this.bubbleGroup = this.add.group({
            runChildUpdate: true
        });

        this.addBubble(0);
        this.addBubble(0);
        this.addBubble(2);

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

        this.scoreMilestone = [1000, 2000, 4000, 6000, 8000, 10000];
        this.currMilestone = 0;
        this.lastMilestone = 15000;
        this.backgroundSpeed = 1;
        this.foregroundSpeed = -15;
        this.framerate = 8;
        this.score = this.add.text(10,0, 'Score: ' + Score, scoreConfig).setOrigin(0,0);
        this.pickupIndicator = this.add.image(25, 48, '2xindicator').setScale(0.25,0.25).setOrigin(0,0);
        this.pickupIndicator.alpha = 0;

        //game over flag
        this.gameOver = false;

        this.rainbowOn = false;
        this.doRainbow(1);
        this.scoreMult = 1;

        //add fg cloud
        this.fgc = this.add.sprite(0, 0, 'fg', 'fgCloud1').setOrigin(0,0);

    }

    addBubble(type) {

        if(type != 2){
        let bubble1 = new bubble(this, 1280, 1000, 'gb1', 0, type).setScale(0.5, 0.5);
        bubble1.resetLoc();
        this.bubbleGroup.add(bubble1);
        }else{
        let bubble1 = new bubble(this, 1280, 1000, 'gb1', 0, type).setScale(0.2, 0.2);
        bubble1.resetLoc();
        this.bubbleGroup.add(bubble1);
        }

    }

    update() {
        // if(this.input.keyboard.checkDown(keySpace, 0.01)){
        //     Score += 100;
        // }

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
        this.back1.tilePositionX += this.backgroundSpeed;

        if(this.currMilestone >= this.scoreMilestone.length){
            if(Score > this.lastMilestone)
            {
                this.lastMilestone += 5000;
                this.addBubble(0);
                this.backgroundSpeed += 0.5;
                this.foregroundSpeed -= 1.25;
                this.airStreamAlpha += 0.05;
                maxSpeed--;
                //play chime?
            }
        } else if(Score >= this.scoreMilestone[this.currMilestone])
        {
            this.backgroundSpeed += 1;
            this.foregroundSpeed -= 2.5;
            this.currMilestone++;
            this.addBubble(0);
            this.airStreamAlpha += 0.05;
            this.airStreamEmitter1.alpha.start += 0.05;
            this.airStreamEmitter2.alpha.start += 0.05;
            this.framerate += 2.66;
            this.player.anims.msPerFrame = 1000/this.framerate;
            maxSpeed--;
            //play chime?
        }

        this.fgc.x += this.foregroundSpeed;
        if(this.fgc.x < -3500)
        {
            this.fgc.setTexture('fg', 'fgCloud' + Phaser.Math.Between(1,3));
            this.fgc.x = 3500;
        }
    }

    bubbleOverlap(player, bubble) {
        if (!this.gameOver) {
            if(bubble.isActive) {
                bubble.isActive = false;

                if(bubble.good == 0){
                    //GOOD BUBBLE - ADD PTS
                    //----------------------
                    this.sound.play('poof');
                    let cloudExParticles = this.add.particles('cloudExplode');
                    let cloudExEmitter1 = cloudExParticles.createEmitter({
                        alpha: { start: .3, end: 0 },
                        scale: { start: .4, end: 0 },
                        speedX: { min: -250, max: 250 },
                        speedY: { min: -250, max: 250 },
                        frequency: 5,
                        quantity: {min : 10, max: 10},
                        //angle: { min : 0, max : 360},
                        lifespan: 500
                    });

                    cloudExEmitter1.explode(150, bubble.x, bubble.y);

                    bubble.resetLoc();
                    Score += 100 * this.scoreMult;
                    this.score.setText("Score: " + Score);

              } else if (bubble.good == 1) {
                    //BAD BUBBLE - YOU LOSE
                    //---------------------

                    if(Score > HighScore)
                    {
                        HighScore = Score;
                        localStorage.setItem('highScore',HighScore);
                    }

                    //do scene change
                    this.sound.play('bonk');
                    let cloudExParticles = this.add.particles('cloudExplode');
                    let cloudExEmitter1 = cloudExParticles.createEmitter({
                        alpha: { start: .3, end: 0 },
                        scale: { start: .4, end: 0 },
                        speedX: { min: -250, max: 250 },
                        speedY: { min: -250, max: 250 },
                        frequency: 5,
                        quantity: {min : 10, max: 10},
                        //angle: { min : 0, max : 360},
                        lifespan: 500
                    });
                    cloudExEmitter1.explode(150, bubble.x, bubble.y);
                    this.airStreamEmitter1.stop();
                    this.airStreamEmitter2.stop();
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

                } else {
                    //PICKUP - 2X SCORE FOR 10s
                    //-------------------------

                    this.sound.play('slurp');
                    this.scoreMult = 2;
                    this.pickupIndicator.alpha = 1;
                    this.rainbowOn = true;
                    bubble.resetLoc();
                    this.time.addEvent({
                        delay: 10000,
                        callback: () => {
                            this.scoreMult = 1;
                            this.pickupIndicator.alpha = 0;
                            this.rainbowOn = false;
                            this.airStreamEmitter1.stop();
                            this.airStreamEmitter2.stop();
                            this.sound.play('noslurp');
                            this.airStreamEmitter1 =  this.airStreamParticles.createEmitter({
                                follow: this.player,
                                frame: ['trailParticle 0.png'],
                                followOffset: {
                                    x: -18,
                                    y: -35
                                },
                                alpha: { start: this.airStreamAlpha, end: 0 },
                                scale: { start: .1, end: 0 },
                                speedX: { min: -1500, max: -250 },
                                speedY: { min: -5, max: 5},
                                frequency: 5,
                                quantity: {min : 10, max: 10},
                                //angle: { min : 0, max : 360},
                                lifespan: 500
                            });


                            this.airStreamEmitter2 =  this.airStreamParticles.createEmitter({
                                follow: this.player,
                                frame: ['trailParticle 0.png'],
                                followOffset: {
                                    x: 10,
                                    y: 50
                                },
                                alpha: { start: this.airStreamAlpha, end: 0 },
                                scale: { start: .1, end: 0 },
                                speedX: { min: -1500, max: -250 },
                                speedY: { min: -5, max: 5},
                                frequency: 5,
                                quantity: {min : 10, max: 10},
                                //angle: { min : 0, max : 360},
                                lifespan: 500
                            });
                            this.airStreamEmitter1.start();
                            this.airStreamEmitter2.start();
                            }
                    });
                }
            }
        }

    }


    doRainbow(color) {
        if(this.rainbowOn){
            this.airStreamEmitter1.stop();
            this.airStreamEmitter2.stop();
            this.airStreamEmitter1 =  this.airStreamParticles.createEmitter({
                follow: this.player,
                frame: ['trailParticle '+ color +'.png'],
                followOffset: {
                    x: -18,
                    y: -35
                },
                alpha: { start: this.airStreamAlpha, end: 0 },
                scale: { start: .1, end: 0 },
                speedX: { min: -1500, max: -250 },
                speedY: { min: -5, max: 5},
                frequency: 5,
                quantity: {min : 10, max: 10},
                //angle: { min : 0, max : 360},
                lifespan: 500
            });


            this.airStreamEmitter2 =  this.airStreamParticles.createEmitter({
                follow: this.player,
                frame: ['trailParticle '+ color +'.png'],
                followOffset: {
                    x: 10,
                    y: 50
                },
                alpha: { start: this.airStreamAlpha, end: 0 },
                scale: { start: .1, end: 0 },
                speedX: { min: -1500, max: -250 },
                speedY: { min: -5, max: 5},
                frequency: 5,
                quantity: {min : 10, max: 10},
                //angle: { min : 0, max : 360},
                lifespan: 500
            });
            this.airStreamEmitter1.start();
            this.airStreamEmitter2.start();

        }
        if(color >= 6) {
            color = 1;
        } else {
            color++;
        }
        if(!this.gameOver){
            Score += 5;
            this.score.setText("Score: " + Score);   
        }
        
        this.time.addEvent({
            delay: 100,
            callback: ()=>{
                this.doRainbow(color);
        }
        });

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