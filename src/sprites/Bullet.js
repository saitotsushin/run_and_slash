
export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(config) {

    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.frame
    );

    this.power = 1;

    // this.canShot = true;
    // this.canShotTime = 0;

    this.active = false;

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.body.setGravity(0,-800);
    // console.log("config.scene.game.config.physics.arcade.gravity",config.scene.game.config.physics.arcade.gravity)
    this.body.setGravity(0, config.scene.game.config.physics.arcade.gravity.y * -1);
    
    this.speed = 100;

    // this.body.setGravity(0,0);
    // this.breakTime = 1000;
    // this.breakCounter = this.breakTime;



    this.deadPoint = {
      x: config.scene.sys.game.config.width,
      y: config.scene.sys.game.config.height
    }

    // this.deadRadius = 10;

  }

  update(time, delta) {

    if(!this.active){
      this.body.setVelocity(0,0);
      return;
    }
    // if(!this.canShot){
    //   return;
    // }
    // if(this.canShotTime > 0){
    //   this.canShotTime -= delta;
    // }else{
    //   this.canShot = true;
    // }
    if(this.deadPoint.x < this.x
      || this.x < 0
      || this.deadPoint.y < this.y
      || this.y < 0
    ){
      this.explode();  
      return;
    }
    // this.breakCounter -= delta;

    // if(this.breakCounter < 0){
    //   this.explode();   
    //   return;   
    // }

    if(this.active){
      // console.log("this",this)
      this.body.setVelocityX(this.speed);
    }
  }
  shot(power,x,y){


    this.power = power ? power : this.power;

    this.x = x;
    this.y = y;

    // if(this.canShot){
    //   this.canShotTime = 300;
    //   return;
    // }
    // this.canShot = false;

    this.setActive(true);
    this.setVisible(true);
    // this.breakCounter = this.breakTime;

  }

  explode() {

    this.setVisible(false);
    this.setActive(false);
 
    this.body.setVelocity(0,0);

  }

}
