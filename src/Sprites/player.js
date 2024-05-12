class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, leftKey, rightKey, playerHealth,playerSpeed){
        super(scene, x, y, texture, frame);

        this.left = leftKey;
        this.right = rightKey;
        this.playerSpeed = playerSpeed;
        this.playerHealth = playerHealth;
        scene.add.existing(this);

        return this;
    }
    update(){
        if(this.left.isDown){
            if (this.x > (this.displayWidth/2)) {
                this.x -= this.playerSpeed;
            }
        }
        if (this.right.isDown) {
            if (this.x < (game.config.width - (this.displayWidth/2))) {
                this.x += this.playerSpeed;
            }
        }
    }
}