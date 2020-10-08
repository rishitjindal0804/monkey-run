var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score

var monkeystop;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  monkeystop = loadAnimation("sprite_0.png")
}



function setup() {
  createCanvas(600, 300);
  
  monkey = createSprite(50,280,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,280,900,20);
  ground.velocityX= -4
  ground.x = ground.width /2;
    ground.log=(ground.x);
  
  
  invisibleGround = createSprite(200,280 ,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 monkey.debug = false;
  
  score = 0;
  

}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  
  if(gameState === PLAY){
    
    //move the ground
    ground.velocityX = -(2+score/100);
    //scoring
    score = score + Math.round(frameCount/60);
    if (score%100===0 && score>0) {
       
      
     }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 159) {
        monkey.velocityY = -12;
      
    }
    
    //add gravity
    monkey.velocityY =monkey.velocityY + 0.8
  
 monkey.collide(invisibleGround)
    
    if (foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      
    }
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
     
     
    }
    spawnbanana();
  
  
    spawnObstacles();
  }
   else if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0
     
      
        text("click on the monkey to reset te game", 50,50)
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
   }
  
  
  if(mousePressedOver(monkey)) {
    
    
      reset();
  }
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,250,10,40);
   obstacle.velocityX = -(4+score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      case 2: obstacle.addImage(obstacleImage);
              break;
      case 3: obstacle.addImage(obstacleImage);
              break;
      case 4: obstacle.addImage(obstacleImage);
              break;
      case 5: obstacle.addImage(obstacleImage);
              break;
      case 6: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 180 === 0) {
     banana = createSprite(600,80,40,10);
    banana.y = Math.round(random(80,160));
    banana.addImage(bananaImage);
   banana .scale = 0.1 ;
    banana.velocityX = -(3+score / 100);
    
     //assign lifetime to the variable
    banana.lifetime = 250;

    
    
    
   foodGroup.add(banana);
    }
}
 function reset(){
  gameState = PLAY;
 
  
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running);
  
  score = 0;
  
}