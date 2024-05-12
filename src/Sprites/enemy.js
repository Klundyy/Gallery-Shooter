class bunnyEnemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, health) {
        super(scene, x, y, texture, frame, health);
        this.xBounce = false;
        this.yBounce = false;
        this.oY = this.y;
        this.health = health;
        scene.add.existing(this);
    }
    update() {
        if(this.x > 1000 && this.xBounce == false){
            this.xBounce = true;
            this.x -= 5;
        } else if(this.x < 0 && this.xBounce == true){
            this.xBounce = false;
            this.x += 5;
        }
        if(this.xBounce){
            this.x-=5;
        } else{
            this.x +=5;
        }
        if(this.health < 0){
            this.visible = false;
        }
    }
}
class bunnyEnemy2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, health) {
        super(scene, x, y, texture, frame, health);
        this.health = health;
        this.xBounce = false;
        this.yBounce = false;
        this.oY = this.y;
        scene.add.existing(this);
    }
    update() {
        if(this.x > 1000 && this.xBounce == false){
            this.xBounce = true;
            this.x -= 5;
        } else if(this.x < 0 && this.xBounce == true){
            this.xBounce = false;
            this.x += 5;
        }
        if(this.xBounce){
            this.x-=5;
        } else{
            this.x +=5;
        }
        if(this.y > this.oY + 50 && this.yBounce == false){
            this.yBounce = true;
        } else if(this.y < this.oY - 50 && this.yBounce == true){
            this.yBounce = false;
        }
        if(this.yBounce){
            this.y -= 3;
        } else{
            this.y += 3;
        }
        if(this.health < 0){
            this.visible = false;
        }
    }
}
