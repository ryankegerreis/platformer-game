var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 450 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  //Assets
  this.load.image("background", "./assets/forest.png");
  this.load.image("ground", "./assets/ground.png");
  this.load.image("platform", "./assets/floatingground.png");
  this.load.image("collect", "assets/bread.png");
  this.load.image("block96", "./assets/96box.png");
  this.load.image("flag", "./assets/flag.png");
  this.load.spritesheet("player", "./assets/Character Sprites/chicken.png", {
    frameWidth: 48,
    frameHeight: 48
  });
}
//End Preload
 
function create() {
  //Start Create

  //Background: Make them 1530px apart

  this.add.image(200, 180, "background").setScale(1.6);
  this.add.image(1730, 180, "background").setScale(1.6);
  this.add.image(3260, 180, "background").setScale(1.6);
  this.add.image(4790, 180, "background").setScale(1.6);
  //Platform Physics
  platforms = this.physics.add.staticGroup();

  //Creating Platforms
  //Ground Level Platform
  platforms
    .create(200, 600, "ground")
    .setScale(0.5)
    .refreshBody();
  //More Ground: Make them 1050px apart
  platforms
    .create(1250, 600, "ground")
    .setScale(0.5)
    .refreshBody();
  platforms
    .create(2300, 600, "ground")
    .setScale(0.5)
    .refreshBody();
  platforms
    .create(3350, 600, "ground")
    .setScale(0.5)
    .refreshBody();
  platforms
    .create(4400, 600, "ground")
    .setScale(0.5)
    .refreshBody();

  //Static Block Physics
  blocks = this.physics.add.staticGroup();

  //Obstacles
  //Obstacle Group1
  blocks.create(700, 520, "block96");
  blocks.create(796, 520, "block96");
  blocks.create(892, 520, "block96");
  blocks.create(796, 424, "block96");

  //ObstacleGroup 2
  blocks.create(1300, 520, "block96");
  platforms.create(1550, 420, "platform");
  blocks.create(1750, 320, "block96");
  blocks.create(1850, 220, "block96");
  platforms.create(2100, 420, "platform");
  blocks.create(2350, 520, "block96");

  //ObstacleGroup3
  blocks.create(2750, 320, "block96");
  platforms.create(3000, 420, "platform");
  blocks.create(3250, 520, "block96");

  // ObstacleGroup4
  blocks.create(3800, 520, "block96");
  blocks.create(3896, 520, "block96");
  blocks.create(3992, 520, "block96");
  blocks.create(3896, 424, "block96");
  blocks.create(3992, 424, "block96");
  blocks.create(3992, 328, "block96");

  
  //Finish Line
  this.add.image(4400, 480, "flag");

  //Player Physics
  //Initial Start position (200,500)
  player = this.physics.add.sprite(200, 500, "player");
 

  //Bounce
  player.setBounce(0.1);

  //Creates Boundaries with world
  player.setCollideWorldBounds(false);

  //Cameras
  var camera = this.cameras.main;
  camera.setViewport(0, 0, 800, 950);
  camera.setBounds(0,0,5000,600);
  this.cameras.main.startFollow(player, true);
  
  //Background Color
  camera.setBackgroundColor("#301D54");
 
  //Player Controls
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 13, end:14 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "player", frame: 1 }],
    frameRate: 20
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 25, end: 26 }),
    frameRate: 10,
    repeat: -1
  });

  //Collider: Establishes physics between objects
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, blocks);
 
  //Creates Controls
  cursors = this.input.keyboard.createCursorKeys();

  //Stars
  stars = this.physics.add.group({
    key: "collect",
  });

  //Star Physics
  this.physics.add.collider(stars, blocks);
  this.physics.add.collider(stars, platforms);

  //Star Collectables
  stars.create(892,0,"collect");
  stars.create(1300,0,"collect");
  stars.create(1750,0,"collect");
  stars.create(1850,0,"collect");
  stars.create(2350,0,"collect");
  stars.create(2254,0,"collect");
  stars.create(2750,0,"collect");
  stars.create(3168,0,"collect");
  stars.create(3400,0,"collect");
  stars.create(3800,0,"collect");
  stars.create(3992,0,"collect");

  //Pick Up Stars
  function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText("Score: " + score).setScrollFactor(0);
  }

  //Make sure to put physics below the assets they need to work. In this case Stars.
  this.physics.add.overlap(player, stars, collectStar, null, this);

  //Score Functionality
  var score = 0;
  var scoreText;

  scoreText = this.add.text(50, 16, "score: 0", {
    fontSize: "32px",
    fill: "#ffffff"
  });
}
function endGame(_this) {
    _this.add.text(4250, 300, `Level Complete!`, {
    fontSize: "38px",
    fill: "#ffffff"
  });

  _this.physics.pause();

  player.anims.play("turn");
  
}

function newScene(_this) {
  _this.scene.pause();
}

function collectStar(player, star) {
  star.disableBody(true, true);
}

function enemyMove(enemy) {}

function update() {

  //Makes Controls Work
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }

  if (player.x > 4400) {
    newScene(this);

    endGame(this);
  }
}