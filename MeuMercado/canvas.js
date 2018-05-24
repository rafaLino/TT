
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
//I'm getting almost the whole screen to avoid problems
canvas.height =  window.innerHeight-10;
canvas.width =  window.innerWidth-10 ;

// Properties
//You can change any value here, just for fun
var qtdeBolinhas = 52;
var colorArray =["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#cddc39","#ffeb3b"];
var InitialRadius = 3.5;
var distanceToDrawLines = 160;
var distanceToCircleGrow= 80;

//I'm setting mouse object starting at the "middle" of the screen just to have it initialized
var mouse ={
    x:canvas.width/2,
    y:canvas.height/2
}

// Resize event (it does not work as well when you reduce the windows size)
window.addEventListener('resize', function(event){
   canvas.height =  window.innerHeight-10;
   canvas.width =  window.innerWidth-10 ;
   c.clearRect(0,0,canvas.width,canvas.height);
  });

//Mouse Move Event To interact whit the circles
window.addEventListener('mousemove',
function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})

// Using Pitagoras  to get the distance of Two Objects that have a X and Y
 function getDistance(c1 ,c2){
    
    let x1 = c1.x ;
    let y1 = c1.y ;
    let x2 = c2.x ;
    let y2 = c2.y ;
    let x = x2-x1;
    let y = y2-y1;
    return (Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));

 }
//
//Circle Object
//
function Circle(x,y,color,velocityX,velocityY,radius){
    this.x=x;
    this.y=y;
    this.velocityX= velocityX;
    this.velocityY= velocityY;
    this.color = color;
    this.radius = radius;


    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.fillStyle = this.color;
        c.fill();
        this.drawLines();


    }
    this.drawLines = function(){
        ci.forEach(element => {
        if(getDistance(this,element)<=distanceToDrawLines){
            c.beginPath();
            c.moveTo(this.x,this.y);
            c.lineTo(element.x,element.y);
            c.strokeStyle = this.color;
            c.stroke(); 
        }
            
        });
    }

    this.update = function(){
        // this will make the ball
        if(this.x+5 >= canvas.width || this.x-5 <=0)
            this.velocityX = -this.velocityX;
        if(this.y+5 >= canvas.height || this.y-5 <-0)
            this.velocityY = -this.velocityY;

        if(getDistance(this,mouse)<distanceToCircleGrow)
        {
            if(this.radius<7)
            {
                this.radius= this.radius + 0.1 ;
            }
        }
        else{
            if(this.radius>=3.5){
                this.radius = this.radius - 0.1;
            }
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
        this.draw();
    }
    
}

var ci = [qtdeBolinhas];
    for(i=0;i<qtdeBolinhas;i++){
        var x= (Math.random()* (1+ canvas.width-5));
        var y= (Math.random()* (1+ canvas.height-5));
        var color = Math.round((Math.random()* (1+ colorArray.length)));
         var velocityX = Math.round((Math.random()* (1+2)));
         var velocityY = Math.round((Math.random()* (1+2)));
        ci[i] = new Circle(x,y,colorArray[color],velocityX,velocityY,InitialRadius);
    }
   


    function animate() {
       
        requestAnimationFrame(animate); 
        c.clearRect(0,0,canvas.width,canvas.height);
      
      
        for(i=0;i<qtdeBolinhas;i++){
            ci[i].update();
        }

    }
       animate();
