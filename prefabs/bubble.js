class bubble extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key, type);
        //sound here
        scene.add.existing(this);
        this.side = 0; //0 -> front, 1 -> top, 2 -> bottom
        this.good = 0; //0 -> good (blue bubble), 1 -> bad (red bubble)
        this.moveX = -10;
        this.moveY = 0;
        this.buffer = 50; //size of sprite so that it isnt cut off of screen
        this.waiting = false;
    }


    

    update() {
        //if hit boundaries or player, reset
        if(this.x < 0 - this.buffer) {
            this.reset();
        } else if (this.y < 0 - this.buffer && this.side != 2) {
            this.reset();
        } else if (this.y + this.buffer > game.config.height && this.side != 1) {
            this.reset();
        }
        if(!this.waiting){
            this.x += this.moveX;
            this.y += this.moveY;
        }
    }

    reset() {
        this.good = Phaser.Math.Between(0,1);
        this.side = Phaser.Math.Between(0,2);
        if(this.good == 0){
            //pick random sprite from good pool
        } else {
            //pick random sprite from bad pool
        }

        if(this.side == 0){
            this.x = game.config.width + this.buffer;
            this.y = Phaser.Math.Between(this.buffer, game.config.height - this.buffer);
            this.moveX = -10;
            this.moveY = Phaser.Math.Between(-10,10);
        } else if(this.side == 1) {
            this.x = Phaser.Math.Between(game.config.width/2, game.config.width/2 - buffer)
            this.y = game.config.height + this.buffer;
            this.moveX = -10;
            this.moveY = Phaser.Math.Between(0,10);
        } else if(this.side == 2) {
            this.x = Phaser.Math.Between(game.config.width/2, game.config.width/2 - buffer)
            this.y = 0 - this.buffer;
            this.moveX = -10;
            this.moveY = Phaser.Math.Between(-10,0);
        }
    }
}