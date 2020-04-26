let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    resolution: window.devicePixelRatio,
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
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);

let keySpace;