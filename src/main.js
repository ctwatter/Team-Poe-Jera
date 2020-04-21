let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0,
            },
            checkCollision: {
                left: true,
                right: true,
            },
        },
    },
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);