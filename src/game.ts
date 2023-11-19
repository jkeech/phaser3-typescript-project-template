import * as Phaser from "phaser";

export default class Demo extends Phaser.Scene {
  private dog: Phaser.Physics.Arcade.Sprite;
  private background: Phaser.GameObjects.TileSprite;

  constructor() {
    super("demo");
  }

  preload() {
    this.load.image("background", "assets/background.jpeg");
    this.load.image("dog", "assets/dog.png");
  }

  create() {
    this.background = this.add.tileSprite(
      0,
      0,
      this.scale.width,
      this.scale.height,
      "background"
    );

    this.background.setOrigin(0, 0).setScrollFactor(0);

    this.dog = this.physics.add
      .sprite(this.scale.width / 3, 650, "dog")
      .setDisplaySize(90, 90)
      .setCollideWorldBounds(true)
      .setBounce(0.2);

    // this.cameras.main
    //   .setBounds(0, 0, 1021 * 2, 716)
    //   .set
    //   .setZoom(1)
    //   .setName("main")
    //   .startFollow(this.dog, true, 0.5, 0.5);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      //this.dog.setVelocityX(-160);
      this.background.tilePositionX -= 6;
    } else if (cursors.right.isDown) {
      //this.dog.setVelocityX(160);
      this.background.tilePositionX += 6;
    } else {
      this.dog.setVelocityX(0);
    }

    if (cursors.up.isDown && this.dog.body.blocked.down) {
      this.dog.setVelocityY(-330);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#000000",
  width: 1021,
  height: 716,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      debug: false,
    },
  },
  scene: Demo,
};

const game = new Phaser.Game(config);
