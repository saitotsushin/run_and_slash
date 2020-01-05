import Player from '../sprites/Player';
// import Bullet from '../sprites/Bullet';

class GameScene extends Phaser.Scene {
  constructor(test) {
      super({
          key: 'GameScene'
      });
  }
  create(){

    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.groundLayer = this.map.createDynamicLayer('ground', this.tileset, 0, 0);
    this.groundLayer.setCollisionBetween(0, 2);
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.bounds.width = this.map.widthInPixels;
    this.physics.world.bounds.height = this.map.heightInPixels;

    this.playerWeaponGroup = this.add.group(
      {
        // classType: Bullet,
        // maxSize: 50,
        // runChildUpdate: true
      }
    );

    this.player = new Player({
      scene: this,
      key: 'player',
      x: 60,
      y: 100,
    });



    // this.physics.add.overlap(
    //   this.player,
    //   this.playerWeaponGroup,
    //   // this.player_x_item_Collision
    // );
    

    this.keys = {
      // TOUCH_START_X: 0,
      // TOUCH_START_Y: 0,
      // TOUCH_MOVE_X: 0,
      // TOUCH_MOVE_Y: 0,
      isTOUCH: false,
      DIRECTION: 0,
      LEFT: false,
      RIGHT: false,
      isRELEASE: false
    };

    this.input.on('pointerdown', function (pointer) {
      // this.keys.TOUCH_START_X = pointer.x;
      // this.keys.TOUCH_START_Y = pointer.y;
      this.keys.isTOUCH = true;
      this.keys.isRELEASE = false;
      if(pointer.x > this.game.config.width / 2){
        this.keys.LEFT = false;
        this.keys.RIGHT = true;
      }else{
        this.keys.LEFT = true;
        this.keys.RIGHT = false;
      }
    }, this);

    this.input.on('pointerup', function (pointer) {
      this.keys.isTOUCH = false;
      this.keys.isRELEASE = true;
      // this.keys.TOUCH_START_X = 0;
      // this.keys.TOUCH_START_Y = 0;
      // this.keys.DIRECTION = 0;
      this.keys.LEFT = false;
      this.keys.RIGHT = false;
    }, this);
    this.cameras.main.setBackgroundColor('#CCCCCC')
    // this.cameras.main.setBounds(
    //   0,
    //   this.scene.systems.game.config.height*-1,
    //   this.scene.systems.game.config.width,
    //   this.scene.systems.game.config.height*6
    // );
    // this.cameras.main.setScroll(this.player.x);
    this.cameras.main.setSize(this.scene.systems.game.config.width,this.scene.systems.game.config.height);
    this.cameras.main.startFollow(this.player,false,1,0,-40,0);
    // this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
  }

  update(time, delta) {
  
    this.player.update(this.keys, time, delta);

    // this.cameras.main.x -= delta/20;
    // this.cameras.main.y = 0;

    this.playerWeaponGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
  }

}

export default GameScene;
