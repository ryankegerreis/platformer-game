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
  this.load.image("platform","./assets/platform.png")
  this.load.image("collect", "/assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.image("block", "./assets/block.png");
  this.load.image("block48", "./assets/block48.png");
  this.load.image("block96", "./assets/block96.png");
  // this.load.spritesheet("collectables", "./assets/rpg_icons_v1.png", {
  //   frameWidth: 8,
  //   frameHeight:8 
  // });
  //Old Player Icon
  // this.load.spritesheet("player", "./assets/dude.png", {
  //   frameWidth: 32,
  //   frameHeight: 48
  // });
  this.load.spritesheet("player", "./assets/Character Sprites/chicken.png",{
    frameWidth: 48,
    frameHeight: 48
  });

  this.load.spritesheet("player2", "./assets/Character Sprites/chicken.png",{
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
    .create(200, 600, "ground").setScale(.5).refreshBody();
  //More Ground: Make them 1050px apart
  platforms.create(1250,600,"ground").setScale(.5).refreshBody();
  platforms.create(2300,600,"ground").setScale(.5).refreshBody();
  platforms.create(3350,600,"ground").setScale(.5).refreshBody();
  platforms.create(4400,600,"ground").setScale(.5).refreshBody();
  //Normal Platforms=======================================
  // platforms.create(600, 400, "platform");
  // platforms.create(50, 250, "platform");
  platforms.create(1000, 420, "platform");
  platforms.create(2850, 420, "platform");
  
  //Blocks================================================
  //Block Physics
  blocks = this.physics.add.staticGroup();

  //Obstacle Blocks
  // blocks.create(1000,300, "block").setScale(2);
  // blocks.create(500,540, "block").setScale(2);
  // blocks.create(600,540, "block").setScale(3);
  blocks.create(700,520, "block96");
  // blocks.create(1250,320, "block96"); 
  blocks.create(1650,500, "block96");
  blocks.create(1850,400, "block96");
  blocks.create(2100,350, "block48");

    //Second Obstacle Set
    blocks.create(2450,500, "block96");
    blocks.create(2550,370, "block48");
    blocks.create(2450,280, "block48");
    


  //Player Physics
  //Initial Start position (100,450)
  player = this.physics.add.sprite(100, 450, "player");
  player2 = this.physics.add.sprite(100, 450, "player2");


  player.setBounce(0.1);
  player2.setBounce(0.9)
  //Creates Boundaries with world
  // player.setCollideWorldBounds(false);


  //Cameras
var camera = this.cameras.main;
camera.setViewport(0,0,800,950)
this.cameras.main.startFollow(player,true)
// this.camera.fadeIn(duration); 1000;
//player.body.velocity.x = 0;

  //Player Controls
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 13, end: 14 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "player", frame: 1}],
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
  this.physics.add.collider(player, player2)
  this.physics.add.collider(blocks, player2)
  this.physics.add.collider(platforms, player2)

  //Creates Controls
  cursors = this.input.keyboard.createCursorKeys();

  //Stars
  stars = this.physics.add.group({
    key: "collect",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });
  //Pick Up Stars
  function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText("Score: " + score);

    if (stars.countActive(true) === 0) {
      stars.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(.3);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  //Make sure to put physics below the assets they need to work. In this case Stars.
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);

  //Score Functionality
  var score = 0;
  var scoreText;

  scoreText = this.add.text(16, 16, "score: 0", {fontSize:"32px", fill: "#ffffff"});
  // scoreText.fixedToCamera=true;

//Other Text
this.add.text(0, 350, "Press Arrows To Move", {fontSize:"32px", fill: "#ffffff"});
this.add.text(700, 250, "Press Up To Jump", {fontSize:"32px", fill: "#ffffff"});
this.add.text(1650, 100, "And Collect Those Stars!", {fontSize:"32px", fill: "#ffffff"});
  //Enemies (Just a group like stars)
  bombs = this.physics.add.group();

  this.physics.add.collider(bombs, platforms);

  this.physics.add.collider(player, bombs, hitBomb, null, this);

  //Bomb Function/Death Mechanic
  function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);
}
// End Create

function moveBlock(){
  //console.log(blocks.children.entries[0].x )
  if(blocks.children.entries[0].x > 400){
    blocks.children.entries[0].x++ 
  } 

  if(blocks.children.entries[0].x <= 400){
    blocks.children.entries[0].x++ 
  } 
}


function update() {
  blocks.children.entries[0].setVelocityX(-5);
  // player.setVelocityX(160);
  // player2.setVelocityX(100);

  player.anims.play("right", true);

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
}