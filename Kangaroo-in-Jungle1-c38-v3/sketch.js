/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;
var kangaroo, kangaroo_collided, kangaroo_running;
var trex, trex_running, trex_collided;
var jungle, invisibleGround;
var shrub, shrub, shrub2, shrub3;
var obstaclesGroup, obstacle1, obstacle;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.7;
  jungle.x = width /2;

  kangaroo = createSprite(50, 300);
  kangaroo.addAnimation("running", kangaroo_running);
  kangaroo.addAnimation("collided", kangaroo_collided);
  kangaroo.scale = 0.2;
  kangaroo.setCollider("circle", 0, 0, 300);
  //kangaroo.debug = true;

  invisibleGround = createSprite(width/2, height-10, width, 20);
  invisibleGround.visible = false;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  
  kangaroo.camera = camera.position.x-270;

  if(gameState === PLAY){

    jungle.velocityX = -5;

    if(jungle.x < 100){
      jungle.x = width/2;
    }

    if(keyDown("space")){
      kangaroo.velocityY = -10
    }

    kangaroo.velocityY = kangaroo.velocityY + 0.8;

    spawnShrub();
    spawnObstacles();

    if(kangaroo.isTouching(shrubsGroup)){
      score = score + 1;
      shrubsGroup.destroyEach();
    }

    if(kangaroo.isTouching(obstaclesGroup)){
      gameState = END;
    }

  }

  

  kangaroo.collide(invisibleGround);

  drawSprites();

  if(gameState === END){

    jungle.velocityX = 0;
    shrubsGroup.destroyEach();
    obstaclesGroup.destroyEach();
    fill ("black");
    textSize(30);
    text("GAME OVER!!!", width/2-100, height/2);

  }

}

function spawnObstacles(){

  if(frameCount % 80 === 0){

    obstacle = createSprite(camera.position.x+500, 350, 40, 10);
    obstacle.addImage("obstacle", obstacle1);
    obstacle.scale = 0.3;
    obstacle.velocityX = -5;
    obstacle.lifetime = width/5;
    obstaclesGroup.add(obstacle);

  }

}

function spawnShrub(){

  if(frameCount % 150 === 0){

    shrub = createSprite(camera.position.x+500, 330, 40, 10);
    shrub.velocityX = -5;
    var rand = Math.round(random(1,3));
    shrub.scale = 0.1;
    switch (rand) {
      case 1: shrub.addImage("shrub1", shrub1);
              break;
      case 2: shrub.addImage("shrub2", shrub2);
              break;
      case 3: shrub.addImage("shrub3", shrub3);
              break;
      
    
      default: break;
        
    }

    shrub.lifetime = width/5;
    shrubsGroup.add(shrub);

  }

}