class Scene3 extends Phaser.Scene {
    bunnyPath;
    flyPath;
    bunnyCurve;
    constructor(){
        super("Scene3")
    }
    init (score)
    {
        this.myScore = isNaN(score) ? 0 : score;
    }
    preload(){
        this.load.setPath("./assets/"); 
        this.load.image("player", "player_05.png");
        this.load.image("bulletPlayer","environment_05.png");
        this.load.image("bulletEnemy","spike_bottom.png");
        this.load.image("bunnyEnemy1", "bunny1_stand.png");
        this.load.image("bunnyEnemy2", "bunny2_stand.png");
        this.load.image("flyEnemy", "flyMan_fly.png");
        this.load.image("wingMan", "wingMan1.png");
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
        this.load.audio("enemyDead", "impactSoft_heavy_004.ogg");
        this.my = {sprite: {}, text: {}};
        this.playerHealth = 3;
        this.maxHealth = 5;
        this.playerSpeed = 7;
        this.bunnyHealth = 5;
        this.bulletSpeed = 15;
        this.bulletCooldown = 5;
        this.flyEnemyBulletCooldown = 25;
    }
    create(){
        let my = this.my;
        this.playerHealthIcon = [];
        for(let i = 0; i < 5; i++){
            this.hpIcon = this.add.sprite(900+(i*20), 20, "player");
            this.hpIcon.setScale(.4);
            this.hpIcon.visible = false;
            this.playerHealthIcon[i] = this.hpIcon;
        }
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 40, "player", null, this.left, this.right, this.playerHealth,this.playerSpeed);
        this.bullets = [];
        let bunnyPos = 70;
        this.enemyList = [];
        this.flyPath = [50,80,
            350,250,
            570,175,
            750,260,
            970,120];
        this.flyCurve = new Phaser.Curves.Spline(this.flyPath);
        my.sprite.flyMan = this.add.follower(this.flyCurve, 10, 10, "flyEnemy");
        my.sprite.flyMan.startFollow( {
            from: 0,
            to: 1,
            delay: 0,
            duration: 4000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
            rotateToPath: false,
            rotationOffset: -90
         });
        my.sprite.flyMan.visible = true;
        my.sprite.flyMan.setScale = (0.5);
        my.sprite.flyMan.health = 50;
        my.sprite.flyMan.score = 1000;
        this.enemyList.push(my.sprite.flyMan);
        this.enemyBullets = [];
        for(let i = 0; i < 10; i++){
            this.enemy = new bunnyEnemy2(this, bunnyPos + (100*i), 300, "bunnyEnemy2", null, this.bunnyHealth);
            this.enemy.setScale(0.5);
            this.enemy.score = 50
            this.enemyList.push(this.enemy);
        }
        my.text.score = this.add.bitmapText(0, 0, "rocketSquare", "Score " + this.myScore);
    }
    update(){
        let my = this.my;
        if(this.playerHealth != 0){
            for(let i = 0; i < this.playerHealth;i++){
                this.playerHealthIcon[i].visible = true;
            }
        }
        if(this.space.isDown){
            if(this.bulletCooldown < 0){
                let bullet = this.add.sprite(my.sprite.player.x, my.sprite.player.y, "bulletPlayer");
                this.bullets.push(bullet);
                this.bulletCooldown += 3;
            } else{
                this.bulletCooldown -= 1;
            }
        }
        if(this.bullets && this.bullets.length > 0) {
            this.bullets.forEach((bullet) => {
                bullet.y -= this.bulletSpeed;
                for (let i = 0; i < this.enemyList.length; i++) {
                    if (this.collides(this.enemyList[i], bullet)) {
                        this.enemyList[i].health -= 1;
                        if(this.enemyList[i].health < 0){
                            this.enemyList[i].visible = false;
                            this.myScore += this.enemyList[i].score;
                            this.enemyList[i].destroy();
                            this.enemyList.splice(i, 1);
                            this.updateScore();
                            this.sound.play("enemyDead", {
                                volume: 1
                            });
                        }
                        bullet.y = -100;
                        break;
                    }
                }

            })
        }
        this.bullets = this.bullets.filter(bullet => bullet.y > -10);
        if (my.sprite.flyMan.health > 0) {
            if (my.sprite.flyMan.health < 25) {
                if (this.flyEnemyBulletCooldown < 0) {
                    let flyBullet1 = this.add.sprite(my.sprite.flyMan.x - 25, my.sprite.flyMan.y + 10, "bulletEnemy");
                    let flyBullet2 = this.add.sprite(my.sprite.flyMan.x, my.sprite.flyMan.y + 15, "bulletEnemy");
                    let flyBullet3 = this.add.sprite(my.sprite.flyMan.x + 25, my.sprite.flyMan.y + 10, "bulletEnemy");

                    this.enemyBullets.push(flyBullet1, flyBullet2, flyBullet3);

                    this.flyEnemyBulletCooldown += Math.floor((Math.random() * 10) + 18);
                } else {
                    this.flyEnemyBulletCooldown -= 1;
                }
            } else {
                if (this.flyEnemyBulletCooldown < 0) {
                    let flyBullet = this.add.sprite(my.sprite.flyMan.x, my.sprite.flyMan.y, "bulletEnemy");
                    this.enemyBullets.push(flyBullet);
                    this.flyEnemyBulletCooldown += Math.floor((Math.random() * 10) + 18);
                } else {
                    this.flyEnemyBulletCooldown -= 1;
                }
            }
        }
        
        my.sprite.player.update();
        if(this.enemyList != null){
            for(let i = 0; i < this.enemyList.length; i ++){
                this.enemyList[i].update();
                if(this.flyEnemyBulletCooldown < 0){
                    let flyBullet = this.add.sprite(this.enemyList[i].x, this.enemyList[i].y, "bulletEnemy");
                    flyBullet.setScale(.5);
                    this.enemyBullets.push(flyBullet);
                    this.flyEnemyBulletCooldown += Math.floor((Math.random() * 10)+40);
                } else{
                    this.flyEnemyBulletCooldown -= 1;
                }
            }
        }
        if(this.enemyBullets && this.enemyBullets.length > 0) {
            this.enemyBullets.forEach(flyBullet => {
                flyBullet.y += 5;
                if(this.collides(flyBullet, my.sprite.player)) {
                    this.playerHealth -= 1;
                    flyBullet.y = 1200;
                    this.playerHealthIcon[this.playerHealth].visible = false;
                    flyBullet.destroy();
                }
            });
            this.enemyBullets = this.enemyBullets.filter(flyBullet => flyBullet.y <= 1000);
        }
        
        if(this.playerHealth < 0){
            this.scene.start("gameoverScreen", this.myScore);
        }
        if(this.enemyList.length == 0){
            this.scene.start("winScreen", this.myScore);
        }
    }

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/3 + b.displayWidth/3)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/3 + b.displayHeight/3)) return false;
        return true;
    }

    updateScore() {
        let my = this.my;
        my.text.score.setText("Score " + this.myScore);
    }
}