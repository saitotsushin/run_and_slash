class BootScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'BootScene'
    });
  }
  preload() {
    const progress = this.add.graphics();

    // Register a load progress event to show a load bar
    this.load.on('progress', (value) => {
        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
    });

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on('complete', () => {
        // prepare all animations, defined in a separate file
        progress.destroy();
        // this.scene.start('TitleScene');
        this.scene.start('GameScene');
    });


    // this.load.image('boss1_hand2', 'assets/images/boss1_hand2.png');


    this.load.image('tiles', 'assets/tilemaps/tile.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap.json');

    //spritesheetは画像のサイズを合わせないとframe errorになる...
    this.load.spritesheet('player', 'assets/images/player.png', { frameWidth: 18, frameHeight: 30 });    
    this.load.image('bullet', 'assets/images/bullet.png');
  }
}

export default BootScene;
