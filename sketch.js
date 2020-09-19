var backImage, backgr;

var ground, groundImg;
var monkey, monkey_running;

var FoodGroup, bananaImg;
var ObstaclesGroup, obstaclesImg;

var GameOver;
var score = 0;

function preload(){
  backImage = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png,Monkey_02.png,Monkey_03.png,Monkey_04.png,Monkey_05.png,Monkey_06.png,Monkey_07.png,Monkey_08.png,Monkey_09.png,Monkey_010.png");
  
  bananaImg = loadImage("banana.png");
  obstaclesImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImg);
  backgr.scale = 1.5;
  backgr.x = backgr.width/2;
  backgr.velocityX = -4;
  
  monkey = createSprite(100, 340, 20, 50);
  monkey.addAnimation(monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  score = 0;
  
}

function draw() {
  background(255);
  
  if(ground.x < 0){
    ground.x = ground.width/2
  }
  
  if(backgr.x<100){
    backgr.x = backgr.width/2;
  }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+2;
  }
  switch(score){
    case 10:  player.scale = 0.12;
              break;
    case 20:  player.scale = 0.14;
              break;
    case 30:  player.scale = 0.16;
              break;
    case 40:  player.scale = 0.18;
              break;
    default:break;
  }
  
  if(keyDown("space")){
    monkey.velocitY = -12;
  }
  
  player.velocityY = player.velocityY + 0.8;
  
  player.collide(ground);
  spawnFood();
  spawnObstacles();
  
  if(ObstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.08;
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score, 500, 50);
}

function spawnFood(){
  if(frameCount % 300 === 0){
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime=300;
    monkey.depth = banana.depth+1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(800, 350, 10, 40);
    obstacle.velocityX = -5;
    obstacle.addImage(obstaclesImg);
    obstacle.scale = 0.1;
    obstacle.liftime = 300;
    ObstaclesGroup.add(obstacle);
  }
}