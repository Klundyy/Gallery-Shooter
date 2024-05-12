class winScreen extends Phaser.Scene {
    constructor(){
        super("winScreen")
    }
    init(score){
        this.myScore = score;
    }
    preload(){
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
        this.my = {sprite: {}, text: {}};
    }
    create(){
        let my = this.my;
        let win = this.add.bitmapText(425, 250, "rocketSquare", "You Win");
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