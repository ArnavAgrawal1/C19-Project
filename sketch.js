var space, rocket, comet;
var rocketImg, spaceImg, cometImg;
var cometsGroup;
var Score = 0;
var gameState = "play";


function preload(){

    spaceImg = loadImage("space.png");
    rocketImg = loadImage("rock.png");
    cometImg = loadImage("comet.png");

}

function setup() {
 
    createCanvas(600,600);

     space = createSprite(300,300);
     space.addImage(spaceImg);
     space.velocityY = 1;
     space.scale = 2.3;

     cometsGroup = new Group();
     invisibleBlockGroup = new Group();

     rocket = createSprite(300,450);
     rocket.addImage(rocketImg);
     rocket.scale = 0.2;
}

function draw() {
    background(0);

    if (space.y > 350) {

        space.y = 300;
        
    }
    
    if (gameState === "play") {

      Score = Score + Math.round(getFrameRate()/50);

        if(keyDown("left_arrow")){
          rocket.x = rocket.x - 3;
        }
        
        if(keyDown("right_arrow")){
          rocket.x = rocket.x + 3;
        }
        
        if(keyDown("space")){
          rocket.velocityY = -10;
        }
        
        rocket.velocityY = rocket.velocityY + 0.8
        
        if(space.y > 400){
          space.y = 300
        }

        if (rocket.y > 600) {

          gameState = "end"
                    
        }

        spawnComets();

        drawSprites();
          textSize(20);
          fill(255);
          text("Score: "+ Score,500,30);
          
    }

    if(cometsGroup.isTouching(rocket)){
      rocket.velocityY = 0;
      gameState = "end"
    }

    if (gameState === "end"){
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("Game Over", 230,250)
      }
    
}

function spawnComets() {

    if (frameCount % 240 === 0) {
        comet = createSprite(200, -300);
        
        comet.x = Math.round(random(120,400));
        
        comet.addImage(cometImg);
        comet.scale = 0.1;
                
        comet.velocityY = 1.5;
        
        rocket.depth = comet.depth;
        rocket.depth +=1;
       
        comet.lifetime = 800;
        cometsGroup.add(comet);
    }
}