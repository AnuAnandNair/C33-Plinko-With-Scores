var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var particle;

var divisionHeight=300;
var score =0;
var turn=0;

var gameState="play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

    for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    }

    //First row
    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));//new Plinko(j,75) is pushed into the array. When displayed, it will create a objecta nd display it at (j,75)
    }

    //Second row
    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

    //Third row
     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     //fourth row
     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }    
}
 
function draw() {
  background("black");
  textSize(20);
  text("Score : "+score,20,30);
  Engine.update(engine);
 
  ground.display();
  
   for (var i = 0; i < plinkos.length; i++) {     
     plinkos[i].display();     
   }

   /*if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
     //score++;
   }
 
   for (var j = 0; j < particles.length; j++) {   
     particles[j].display();
   }*/

   for (var k = 0; k < divisions.length; k++) {     
     divisions[k].display();
   }

   stroke("yellow");
   line(0,430, 800,430);

   text("500",25,550);
   text("500",105,550);
   text("500",185,550);
   text("500",265,550);
   text("100",345,550);
   text("100",425,550);
   text("100",505,550);
   text("200",585,550);
   text("200",665,550);
   text("200",745,550);

   if(particle!=null)//given so that initially when function draw runs, particle.display is called and since particle is not defined, 
                     //it cannot display undefined object or null object.
                     //So when mousePressed happens and particle is created, then only display should be called. 
                     //To avoid the error of "cannot read property "display" of undefined" which comes in the  beginning 
                     //when the program starts and mouse is not pressed, this condition is added
   {
      particle.display();


      //if(particle.body.position.y>430)//the particle becomes null at this y value and the x given inside and particle disappears at the yellow line
      if(particle.body.position.y>760)
      {
        if(particle.body.position.x<300){
          score=score+500;
          particle=null;//if not the particle will be always at y>430 and x also satisfied, teh score will go on increasing infinitely
        }else if(particle.body.position.x>301 && particle.body.position.x<600){
          score=score+100;
          particle=null;
        }else if(particle.body.position.x>601 && particle.body.position.x<900){
          score=score+200;
          particle=null;
        }

        if(turn>=5){          
          gameState="end";
          //textSize(25);
          //fill("white");
          //text("GameOver",400,400); displays once when turn=5 and since the particle is null after setting the last score, the if block will continue and GameOver will disappear
        }
      }
    }
        if(gameState==="end"){    //should be given outside if(particle!=null) to break that if block and come out of it to stop the game. 
                                  //If given inside that if block, since the particle is null after setting score each time, the if block will 
                                  //continue to run display GameOver once when the turn becomes >=5                                     
          textSize(25);
          fill("white");
          text("GameOver",400,400);
        }
    }
 
function mousePressed(){
  if(gameState==="play"){
    turn++;
    particle=new Particle(mouseX,10,10,10);
  }
}