import Bullet from './Bullet';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {

    super(
      config.scene,
      config.x,
      config.y,
      config.key
    );
    config.scene.anims.create({
      key: 'run',
      frames: config.scene.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });  
    config.scene.anims.create({
      key: 'wait',
      frames: config.scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    }); 
    // this.scene = config.scene;

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.status = {
      power: 10
    };
    this.jumpTimer = 0;
    this.jumpCount = 0;
    this.jumpCountMax = 2;
    this.isJumping = false;
    this.shotTimer = 0;
    this.isShot = false;
    this.isGround = false;

    this.MOVE_SPEED = 80;


    config.scene.physics.add.collider(
      this, 
      config.scene.groundLayer,
      this.tileCollision,
      null,
      this
    );
    /*==============================
    デバッグ
    ==============================*/
    this.debugText = this.scene.add.text(10, 10, '', { font: '10px Courier', fill: '#FFFFFF' });
    this.debugText.depth = 100;
    this.debugText.setScrollFactor(0,0);

    console.log("this.scene.map.widthInPixels",this.scene.map.widthInPixels)
  }

  update(keys, time, delta) {

    this.debugText.setText(
      [
        'keys.isTOUCH  :'+keys.isTOUCH,
        'keys.isRELEASE:'+keys.isRELEASE,
        'body.x        :'+ (this.x + this.width*1.6),
        'widthInPixels :'+this.scene.map.widthInPixels,
      ]
    );

    if(this.isGround){
      this.anims.play("run", true);
    }else{
      this.anims.play("wait", true);
    }


    if(this.scene.map.widthInPixels <= (this.x + this.width*0.5)){
      this.body.setVelocityX(0);
      return;
    }

    if(this.active && this.isGround){
      this.body.setVelocityX(this.MOVE_SPEED);
    }


    if(keys.isTOUCH === true && keys.LEFT){
      
      this.jump(keys);

    }

    if(keys.isTOUCH === true && keys.RIGHT){
      // if(!this.isShot){
        this.fromShotPool();
      // }
    }
    if(this.shotTimer > 0){
      this.shotTimer -= delta;
    }else{
      this.isShot = false;
    }

    if(keys.isRELEASE === true){

      this.isJumping = false;
      
    }


    if(this.jumpTimer > 0){
      this.jumpTimer -= delta;
    }

    this.isGround = false;

  }

  jump(keys) {
    
    if (!this.isJumping && this.isGround) {
      this.jumpTimer = 500;
      this.jumpCount++;
      console.log("this.jumpCount1",this.jumpCount)
    }

    if(this.jumpCount < this.jumpCountMax
      && 0 < this.jumpCount
      && 0 > this.body.velocity.y
      && !this.isJumping
    ){
      this.jumpTimer = 500;
      this.jumpCount++;
      console.log("this.jumpCount2",this.jumpCount)
    }else{
      
    }

    /*
    TODO
    二回までの判定追加
    */

    // if(this.jumpCountMax === this.jumpCount
    //   && !this.isJumping
    // ){
    //   this.jumpCount++;
    //   console.log("this.jumpCount3",this.jumpCount)
    // }
    // if(this.jumpCountMax <= this.jumpCount){
    //   return;
    // }

    if(this.jumpTimer > 0 
    ){
      this.body.setVelocityY(-100);
    }

    this.isJumping = true;

  }
  createShot(object){    
    let bullet = new Bullet({
      scene: this.scene,
      x: this.x,
      y: this.y,
      key: "bullet"
    }); 
    this.scene.playerWeaponGroup.add(bullet);
  }
  fromShotPool(){

    if(this.shotTimer > 0){
      return;
    }


    if(!this.isShot){

      this.shotTimer = 300;

      let bullet = this.scene.playerWeaponGroup.getFirst();
      if(!bullet){
        this.createShot();
        
        bullet = this.scene.playerWeaponGroup.get();
      }
      bullet.shot(
        this.status.power,
        this.x + this.width/2,
        this.y
      );      
    }

    this.isShot = true;

  }
  tileCollision(){

    this.isGround = true;

    this.jumpCount = 0;  

  }

}
