class gameoverScreen extends Phaser.Scene {
    constructor(){
        super("gameoverScreen")
    }
    init(score){
        this.myScore = isNaN(score) ? 0 : score;
    }
    preload(){
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
        this.my = {sprite: {}, text: {}};
    }
    create(){
        let my = this.my;
        let gameover = this.add.bitmapText(425, 250, "rocketSquare", "GAME OVER");
        let retry = this.add.bitmapText(375, 350, "rocketSquare", "Click to retry");
        let highscore = this.add.bitmapText(325, 450,"rocketSquare", "Your Score was: " + this.myScore);
    }
    update(){
        let my = this.my;
        this.input.on('pointerdown', (pointer) =>{
            this.scene.start("Scene1");
        }
        )
    }
}