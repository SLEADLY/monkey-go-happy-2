var Play=1;
var End =0;
var GameState=1;
var MonkeyImage;
var Monkey;

var backImage;

var MonkeyRun, MonkeyWalk, MonkeyCrash;
var ground, invisibleGround, groundImage,bananaImage,obstacleImage;

var bananaGroup, stoneGroup;
var collided;
var running;
var score;


function preload(){
running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  
 obstacleImage=loadImage("stone.png")
  
  bananaImage = loadImage("banana.png");
  

  backImage=loadImage("jungle.jpg")
  

  

}

function setup() {
  createCanvas(800, 400);
 
  
  
  
  
  ground = createSprite(200,180,800,400);
  ground.addImage("ground",backImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.scale=1.5
  
  
  
  
  invisibleGround = createSprite(400,350,800,10);
  invisibleGround.visible = false;
  
  
   Monkey = createSprite(50,180,20,50);
Monkey.addAnimation("running", running);

Monkey.scale = 0.1;
  
  
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
}



function draw() {
  background(180);
  
  if (GameState===Play){
     score = score + Math.round(getFrameRate()/60);
    
    if(keyWentDown("space")) {
Monkey.velocityY = -10;
  }
Monkey.velocityY = Monkey.velocityY + 0.8
    Monkey.collide(invisibleGround)
    
    
    
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
   
    
    if(stoneGroup.isTouching(Monkey)){
      Monkey.scale=0.1;
      //GameState=End;
       
    
  }
    if(bananaGroup.isTouching(Monkey)){
      
      score=score+2;
      bananaGroup.destroyEach();
    
  }
    switch (score){
      case 10: Monkey.scale=0.2;
        break;
      case 20: Monkey.scale=0.3;
        break;
      case 20: Monkey.scale=0.4;
        break;
      case 40: Monkey.scale=0.5;
        break;
      default:break;
    
    
    
  }
    
  }
  
 if(GameState===End){
   ground.velocityX=0;
  stoneGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);
   stoneGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);

 }
    
    
 
  

  
   spawnbanana();
  spawnStone();
  
  //collide(invisibleGround);
  
  drawSprites();
  textSize(20);
  fill("red")
   text("Score: "+ score, 500,50);
  
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = Monkey.depth;
    Monkey.depth = banana.depth + 1;
    
    banana.scale = 0.1;
    
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnStone() {
  if(frameCount % 60 === 0) {
    var Stone = createSprite(400,350,10,40);
    Stone.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    Stone.addImage("stone", obstacleImage)
       
      Stone.lifetime = 300;
    Stone.scale=0.1
    
    
    //assign scale and lifetime to the obstacle           
    
    
    //add each obstacle to the group
    stoneGroup.add(Stone);
  }
}