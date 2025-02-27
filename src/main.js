"use strict"

let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1000,
    height: 800,
    scene: [Scene1,Scene2,Scene3,gameoverScreen, winScreen],
    fps: { forceSetTimeOut: true, target: 60 }
}


var my = {sprite: {}};

const game = new Phaser.Game(config);
