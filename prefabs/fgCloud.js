class fgCloud extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, type) {
        super(scene, x, y, texture, frame);

        //scene.physics.add.existing(this);
        scene.add.existing(this);
       
        this.moveX = -75;
        this.buffer = 50; //size of sprite so that it isnt cut off of screen
        
    }

    update(){
        this.x += moveX;

        if(this.x <= -2000)
        {
            this.scene.time.addEvent({
                delay: Phaser.Math.Between(10000,15000),
                callback: () => {
                    this.setTexture('uncollectibles', 'bb' + Phaser.Math.Between(1,5));
                    this.x = 1280;
                }
            });
        }
    }

    
}