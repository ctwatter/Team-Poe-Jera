/*

*/

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    resolution: window.devicePixelRatio,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
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
    scene: [Loading, Menu, Play],
};

let game = new Phaser.Game(config);

let HighScore = parseInt(localStorage.getItem('highScore')) || 0; //code to do local storage of highscore was gotten from 
                                                                  //https://www.dynetisgames.com/2018/10/28/how-save-load-player-progress-localstorage/
let Score = 0;
let maxSpeed = -10;

let celeryMode = false;