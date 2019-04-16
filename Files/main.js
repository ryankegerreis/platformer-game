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
  this.load.image("collect", "/assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.image("block", "./assets/block.png");
  this.load.image("block48", "./assets/block48.png");
  this.load.image("block96", "./assets/96box.png");
  this.load.image("flag", "./assets/flag.png");
  // this.load.spritesheet("collectables", "./assets/rpg_icons_v1.png", {
  //   frameWidth: 8,
  //   frameHeight:8
  // });

  this.load.spritesheet("player", "./assets/Character Sprites/chicken.png", {
    frameWidth: 48,
    frameHeight: 48
  });

  // this.load.spritesheet("wolf", "./assets/Character Sprites/wolf.png",{
  //   frameWidth: 40,
  //   frameHeight: 40
  // });

  // this.load.spritesheet("player2", "./assets/Character Sprites/chicken.png",{
  //   frameWidth: 48,
  //   frameHeight: 48
  // });
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

  //Moving Blocks
  //Moving Block Physics
  // movblocks = this.physics.add.group();
  // movblocks.create(100,450,"block96");

  //Player Physics
  //Initial Start position (200,500)
  player = this.physics.add.sprite(200, 500, "player");
  // player2 = this.physics.add.sprite(100, 450, "player2");

  //Bounce
  player.setBounce(0.1);
  // player2.setBounce(0.1)
  //Creates Boundaries with world
  player.setCollideWorldBounds(false);

  //Cameras
  var camera = this.cameras.main;
  camera.setViewport(0, 0, 800, 950);
  this.cameras.main.startFollow(player, true);
  //Background Color
  camera.setBackgroundColor("#301D54");
  // this.camera.fadeIn(duration); 1000;
  //player.body.velocity.x = 0;

  //Enemies
  // wolf = this.physics.add.sprite(100, 0, "wolf");
  // this.anims.create({
  //   key: "wolfIdle",
  //   frames: this.anims.generateFrameNumbers("wolf", { start: 1, end: 3 }),
  //   frameRate: 10,
  //   repeat: -1
  // });

  // this.anims.create({
  //   key: "wolfRight",
  //   frames: this.anims.generateFrameNumbers("wolf", { start: 19, end: 25 }),
  //   frameRate: 10,
  //   repeat: -1
  // });

  // this.anims.create({
  //   key: "wolfLeft",
  //   frames: this.anims.generateFrameNumbers("wolf", { start: 5, end: 8 }).flipX,
  //   frameRate: 10,
  //   repeat: -1
  // });

  //Enemy Physics
  // this.physics.add.collider(wolf, platforms);
  // this.physics.add.collider(wolf, blocks);

  //Player Controls
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 14, end: 15 }),
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
  

  // this.physics.add.collider(player, player2)
  // this.physics.add.collider(blocks, player2)
  // this.physics.add.collider(platforms, player2)

  // this.physics.add.collider(moveblocks, platforms);
  // this.physics.add.collider(moveblocks, blocks);


  //Creates Controls
  cursors = this.input.keyboard.createCursorKeys();

  //Stars
  stars = this.physics.add.group({
    key: "collect",
    // repeat: 11,
    // setXY: { x: 12, y: 0, stepX: 70 }
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
    //Collecting stars releases bombs
    // if (stars.countActive(true) === 0) {
    //   stars.children.iterate(function(child) {
    //     child.enableBody(true, child.x, 0, true, true);
    //   });

    //   var x =
    //     player.x < 400
    //       ? Phaser.Math.Between(400, 800)
    //       : Phaser.Math.Between(0, 400);

    //   var bomb = bombs.create(x, 16, "bomb");
    //   bomb.setBounce(.3);
    //   bomb.setCollideWorldBounds(true);
    //   bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    // }
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
  // scoreText.fixedToCamera=true;

  //Other Text
  this.add.text(0, 350, "Press Arrows To Move", {
    fontSize: "32px",
    fill: "#ffffff"
  });
  this.add.text(700, 250, "Press Up To Jump", {
    fontSize: "32px",
    fill: "#ffffff"
  });
  this.add.text(1650, 100, "And Collect Those Stars!", {
    fontSize: "32px",
    fill: "#ffffff"
  });

  //Enemies (Just a group like stars)
  enemies = this.physics.add.group();

  this.physics.add.collider(enemies, platforms);

  this.physics.add.collider(player, enemies, death, null, this);

  //Bomb Function/Death Mechanic
  function death(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;
  }
}
function endGame(_this) {
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

// End Create

// function moveBlock(){
//   //console.log(blocks.children.entries[0].x )
//   if(blocks.children.entries[0].x > 400){
//     blocks.children.entries[0].x++
//   }

//   if(blocks.children.entries[0].x <= 400){
//     blocks.children.entries[0].x++
//   }
// }

function update() {
  // blocks.children.entries[0].setVelocityX(-5);
  // player.setVelocityX(160);
  // player2.setVelocityX(100);
  // wolf.setVelocityX(100);

  // if (wolf.x>0) {
  // wolf.anims.play("wolfRight",true);

  // }
// console.log(player.x);

  player.anims.play("right", true);

  //Makes Controls Work
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("right", true).flipX;
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
