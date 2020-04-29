class bubble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        //sound here
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.side = 0; //0 -> front, 1 -> top, 2 -> bottom
        this.good = 0; //0 -> good (blue bubble), 1 -> bad (red bubble)
        this.moveX = -10;
        this.moveY = 0;
        this.buffer = 50; //size of sprite so that it isnt cut off of screen
        this.waiting = false;
        this.speedX = 5;
    }
    
    update() {
        //console.log("bubble movin");
        //if hit boundaries or player, reset
        if(this.x < 0 - this.buffer) {
            this.resetLoc();
        } else if (this.y < 0 - this.buffer && this.side != 1) {
            this.resetLoc();
        } else if (this.y - this.buffer * 2 > game.config.height && this.side != 2) {
            this.resetLoc();
        }
        if(!this.waiting){
            this.x += this.moveX;
            this.y += this.moveY;
        }
    }

    resetLoc() {
                
 
        this.waiting = true;
        
        this.side = Phaser.Math.Between(0,2);
        //console.log("MOVING");
        if(this.side == 0){ //left
            this.x = game.config.width + this.buffer;
            this.y = Phaser.Math.Between(this.buffer, game.config.height - this.buffer);
            this.moveX = -this.speedX;
            this.moveY = Phaser.Math.Between(-10,10);
        } else if(this.side == 1) { //top
            this.x = Phaser.Math.Between(game.config.width/2, game.config.width/2 - this.buffer)
            this.y = 0 - this.buffer;
            this.moveX = -this.speedX;
            this.moveY = Phaser.Math.Between(0,10);
        } else if(this.side == 2) { //bottom
            this.x = Phaser.Math.Between(game.config.width/2, game.config.width/2 - this.buffer)
            this.y = game.config.height + this.buffer;
            this.moveX = -this.speedX;
            this.moveY = Phaser.Math.Between(-10,0);
        }




        this.scene.time.addEvent({
            delay: Phaser.Math.Between(500,2500),
            callback: ()=>{
                this.changeCloud();
                this.waiting = false;
          }
        });
    }

    changeCloud() {
        //console.log("CHANGING GOOD/BAD");
        this.good = Phaser.Math.Between(0,1);
        if(this.good == 0){
            this.setTexture('collectibles', 'gb' + Phaser.Math.Between(1,6));
            //pick random sprite from good pool
        } else {
            this.setTexture('uncollectibles', 'bb' + Phaser.Math.Between(1,5));
        }
    }
}