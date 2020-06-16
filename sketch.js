var canvas;
var player;
var bullet;
var bubble1,bubble2,bubble3,bubble4,bubble5,bubble6,bubble7,bubble8,bubble9,bubble10,bubble11,bubble12,bubble13,bubble14,bubble15;
var bubbles = [];
var leftWall,rightWall,topWall,bottomWall;
var life = 200;
var angle = 270;
var player_img,face;
var faceImg;
var sparkle = [];

function preload(){
  player_img = loadImage("playerImg.jpg");
  faceImg = loadImage("face.png");
}

function setup() {
  canvas = createCanvas(400,400);

  player = createSprite(200,350,30,30);
  player.addImage(player_img);
  player.scale = 0.35;

  bullet = createSprite(player.x,player.y,8,8);

  face = createSprite(100,200,30,30);
  face.visible = false;
  face.addImage(faceImg);
  face.scale = 0.6;
  face.rotation = 135;

//bubbles
  bubble1 = createSprite(random(10,390),random(10,390),random(20,40),random(20,40));
  bubble2 = createSprite(random(10,390),random(10,390),random(20,40),random(20,40));
  bubble3 = createSprite(random(10,390),random(10,390),random(20,40),random(20,40));
  bubble4 = createSprite(random(10,390),random(10,390),random(20,40),random(20,40));
  bubble5 = createSprite(random(10,390),random(10,390),random(20,40),random(20,40));
  bubble6 = createSprite(random(10,390),random(10,390),random(20,40),random(20,40));
  bubble7 = createSprite(random(10,390),random(10,390),random(20,40),random(20,40));
  bubble8 = createSprite(random(10,390),random(10,390),random(20,40),random(20,40));
  bubble9 = createSprite(random(10,390),random(10,390),random(20,40),random(20,40));
  bubble10 = createSprite(random(10,390),random(10,390),random(20,40),random(20,40));

  bubbles = [bubble1,bubble2,bubble3,bubble4,bubble5,bubble6,bubble7,bubble8,bubble9,bubble10];

//making Edges or walls 
  topWall = createSprite(200,5,400,10);
  bottomWall = createSprite(200,395,400,10);
  leftWall = createSprite(5,200,10,400);
  rightWall = createSprite(395,200,10,400);

  topWall.shapeColor = "lightSeaGreen";
  bottomWall.shapeColor = "lightSeaGreen";
  rightWall.shapeColor = "lightSeaGreen";
  leftWall.shapeColor = "lightSeaGreen";

//movement of bubbles
  for(var i = 0;i<bubbles.length;i++){
    bubbles[i].setVelocity(random(-5,5),random(-5,5));
  }
//sparkles when win
  for(var h = 0;h<200;h++){
    sparkle[h] = createSprite(random(0,400),random(-400,-10),5,5);
    sparkle[h].visible = false;
  }
}

function draw() {
  background(0);
  textSize(14);
  //text
  stroke(5);
  if(life>=150){
    fill("lightGreen");
  }else if(life<150 && life>100){
    fill("yellow");
  }else if(life<100 && life>50){
    fill("orange");
  }else if(life<50 && life>0){
    fill("orangered");
  }else if(life === 0){
    fill("red");
    Lose();
  }
  text("Life: "+life,50,50);

  //movement of the player
    if(keyDown(LEFT_ARROW)){
      angle -= 5;
    }else if(keyDown(RIGHT_ARROW)){
      angle += 5;
    }
    player.rotation = angle+90;

  //shooting bullets
    if(keyDown("space") && bullet.y === player.y && bullet.x === player.x){
      bullet.setSpeed(10,angle);
    }
    if(bullet.collide(leftWall) || bullet.collide(rightWall) || bullet.collide(topWall) || bullet.collide(bottomWall)){
      bullet.x = player.x;
      bullet.y = player.y;
      bullet.setSpeed(0);
    }

  //making th bubbles bounce the walls
  for(var a = 0;a<bubbles.length;a++){
    bubbles[a].bounceOff(leftWall);
    bubbles[a].bounceOff(rightWall);
    bubbles[a].bounceOff(topWall);
    bubbles[a].bounceOff(bottomWall);

  //decreasing life of the player
    if(bubbles[a].bounceOff(player)){
      life -= 2;
    }

  //designing the bubbles
    bubbles[a].visible = false;
    var rand =random(20,40);
    var r = random(0,255);
    stroke(rgb(r,255,0));
    strokeWeight(3);
    noFill();
    ellipse(bubbles[a].x,bubbles[a].y,rand,rand);

  //working of bullet
    if(bullet.collide(bubbles[a]) && bullet.posotion !== player.position){
      bullet.x = player.x;
      bullet.y = player.y;
      bullet.setSpeed(0);

      bubbles[a].destroy();
      bubbles.splice(a,1);
      life += 5;
    }    
  }

  //designing the bullet
    bullet.visible = false;
    noStroke();
    fill("red");
    ellipse(bullet.x,bullet.y,13,13);
    fill("orangered")
    ellipse(bullet.x,bullet.y,8,8);
    fill("yellow");
    ellipse(bullet.x,bullet.y,5,5);

  //winning the game 
    if(bubbles.length === 0){
      Win();
    }

  drawSprites();
}

function Lose(){
  face.visible = true;
  for(var i = 0;i<bubbles.length;i++){
    bubbles[i].destroy();
  }
  bullet.destroy();
  fill("yellow");
  stroke(50);
  push();
  textSize(25);
  text("You Lose!!!",200,200);
  pop();
}

function Win(){
  for(var s = 0;s<200;s++){
    noStroke();
    fill(rgb(random(0,255),random(0,255),random(0,255)));
    ellipse(sparkle[s].x,sparkle[s].y,5,5);
    sparkle[s].velocityY = random(1,5);
  }
  fill("yellow");
  stroke(50);
  textSize(25);
  text("You Win!!!!" ,200,200);
}