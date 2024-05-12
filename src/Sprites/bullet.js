class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene,x,y,texture,frame);
        this.isVisible = false;
        this.isActive = false;
        return this;
    }
    update(){
        if(this.isActive){
            this.y -= this.speed;
            if(this.y < -(this.displayHeight/2)){
                this.makeInactive
            }
        }
    }
    makeActive() {
        this.isVisible = true;
        this.isActive = true;
    }

    makeInactive() {
        this.isVisible = false;
        this.isActive = false;
    }
}