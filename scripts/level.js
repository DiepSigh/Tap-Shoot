var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 800,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            fps: 60
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

window.addEventListener("resize", resize, false);

var centerButton;
var topLeftButton;
var topRightButton;
var botLeftButton;
var botRightButton;

//PLAYER VARIABLES
var HP = 3;
var speed = 1; //speed of arrow
var arrowTRActive = false;
var arrowTLActive = false;
var arrowBRActive = false;
var arrowBLActive = false;
var sin = Math.sin;
var cos = Math.cos;
var atan2 = Math.atan2;

//ENEMY VARIABLES
var EX = 0;
var EY = 0;
var Ehp = 100;
var Espeed = 1;
var Edmg = 1;
var EmxSpeed = 4;
var Eactive = false;

//SPAWNER VARIABLES
var topLeft = [];
var topRight = [];
var botLeft = [];
var botRight = [];
var ScreenH, ScreenW;


function preload ()
{

    //PLAYER
    this.load.image('player', 'images/link.png');
    this.load.image('arrowTR', 'images/arrowTR.png');
    this.load.image('arrowTL', 'images/arrowTL.png');
    this.load.image('arrowBR', 'images/arrowBR.png');
    this.load.image('arrowBL', 'images/arrowBL.png');

    //ENEMY
    this.load.image('enemy', 'images/bidoff.jpg');

    //Image controller buttons
    
    this.load.image('button', 'images/button.png');

    //Generation random number for preload

    var randPreload = Phaser.Math.Between(0, 1); 
    
    //Preload  ----------- FOREST MAP -----------
    if(randPreload === 0)
    {
        //TEST
        //this.load.image('test', 'test.png');

        //Background tiles
        this.load.image('bg', 'images/map/forest/bg.png');

        //Enemies spawn towers
        this.load.image('enemy_spawn_tower', 'images/map/forest/enemy_spawn_tower.png');
        this.load.image('ruins_right', 'images/map/forest/ruins_right.png');
        this.load.image('ruins_left', 'images/map/forest/ruins_left.png');

        //Lake 
        this.load.image('lake01', 'images/map/forest/lake01.png');
        this.load.image('lake02', 'images/map/forest/lake02.png');
        this.load.image('lake03', 'images/map/forest/lake03.png');
        this.load.image('lake04', 'images/map/forest/lake04.png');

        //Rock
        this.load.image('rock01', 'images/map/forest/rock01.png');
        this.load.image('rock02', 'images/map/forest/rock02.png');
        this.load.image('rock03', 'images/map/forest/rock03.png');

        //Tower in center
        this.load.image('tower', 'images/map/forest/tower_forest.png');

        //Background trees
        this.load.image('tree01', 'images/map/forest/tree01.png');
        this.load.image('tree02', 'images/map/forest/tree02.png');
        this.load.image('tree03', 'images/map/forest/tree03.png');
        this.load.image('tree04', 'images/map/forest/tree04.png');
        this.load.image('tree05', 'images/map/forest/tree05.png');
        this.load.image('tree06', 'images/map/forest/tree06.png');
        this.load.image('tree07', 'images/map/forest/tree07.png');

        //Grass
        this.load.image('grass01', 'images/map/forest/grass01.png');
        this.load.image('grass02', 'images/map/forest/grass02.png');
        this.load.image('grass03', 'images/map/forest/grass03.png');
        this.load.image('grass04', 'images/map/forest/grass04.png');

    }

    //Preload  ----------- DESERT MAP -----------
    if(randPreload === 1)
    {
        //TEST
        //this.load.image('test', 'test.png');

        //Background tiles
        this.load.image('bg', 'images/map/desert/bg.png');


        //Enemies spawn towers
        this.load.image('enemy_spawn_tower', 'images/map/desert/enemy_spawn_tower.png');
        this.load.image('ruins_right', 'images/map/desert/ruins_right.png');
        this.load.image('ruins_left', 'images/map/desert/ruins_left.png');

        //Lake
        this.load.image('lake01', 'images/map/desert/lake01.png');
        this.load.image('lake02', 'images/map/desert/lake02.png');
        this.load.image('lake03', 'images/map/desert/lake03.png');
        this.load.image('lake04', 'images/map/desert/lake04.png');

        //Rock
        this.load.image('rock01', 'images/map/desert/rock01.png');
        this.load.image('rock02', 'images/map/desert/rock02.png');
        this.load.image('rock03', 'images/map/desert/rock03.png');

        //Castle in center
        this.load.image('tower', 'images/map/desert/tower_desert.png');

        //Background trees
        this.load.image('tree01', 'images/map/desert/tree01.png');
        this.load.image('tree02', 'images/map/desert/tree02.png');
        this.load.image('tree03', 'images/map/desert/tree03.png');
        this.load.image('tree04', 'images/map/desert/tree04.png');
        this.load.image('tree05', 'images/map/desert/tree05.png');
        this.load.image('tree06', 'images/map/desert/tree06.png');
        this.load.image('tree07', 'images/map/desert/tree07.png');

        //Grass
        this.load.image('grass01', 'images/map/desert/grass01.png');
        this.load.image('grass02', 'images/map/desert/grass02.png');
        this.load.image('grass03', 'images/map/desert/grass03.png');
        this.load.image('grass04', 'images/map/desert/grass04.png');

    }


}

function create ()
{
    
    var tempX = 50;
    var tempY = 50;

    for(x=0; x<8; x++)
    {

        this.add.image(tempX, tempY, 'bg');


        for(y=0; y<8; y++)
        {
            this.add.image(tempX, tempY, 'bg');

            // <--- Spawn tower in the center of the map
            if(x === 4 && y === 4 ) 
            {
                this.add.image(tempX - 50, tempY - 50, 'tower'); 

            }

            // <--- Spawn ruins enemy spawn
            if(x === 0 && y === 0 ) 
            {  
                this.add.image(tempX , tempY, 'ruins_left');  this.add.image(tempX, tempY - 25, 'enemy_spawn_tower'); 

            }
            if(x === 0 && y === 7 ) 
            { 
                 this.add.image(tempX, tempY, 'ruins_right'); this.add.image(tempX, tempY - 25, 'enemy_spawn_tower');
          
            }
            if(x === 7 && y === 0 ) 
            { 
                 this.add.image(tempX, tempY, 'ruins_left'); this.add.image(tempX, tempY - 25, 'enemy_spawn_tower');
  
            }
            if(x === 7 && y === 7 ) 
            { 
                 this.add.image(tempX, tempY, 'ruins_right'); this.add.image(tempX, tempY - 25, 'enemy_spawn_tower');
      

            }

            // Adding on map bunch of trees or bushes from the top
            if(x === 0 && (y === 1) || x === 0 && (y === 2) || x === 0 && (y === 3) || x === 0 && (y === 4) || x === 0 && (y === 5) || x === 0 && (y === 6) ||
            x === 1 && (y === 2) || x === 1 && (y === 3) || x === 1 && (y === 4) || x === 1 && (y === 5) ||
            x === 2 && (y === 3) || x === 2 && (y === 4) 
            )
            {
                
                this.add.image(tempX, tempY, 'bg'); // <--- Adding background tile


                        var randGrass = Phaser.Math.Between(0, 5);
                        if(randGrass === 0) { this.add.image(tempX, tempY, 'grass01'); }
                        if(randGrass === 1) { this.add.image(tempX, tempY, 'grass02'); }
                        if(randGrass === 2) { this.add.image(tempX, tempY, 'grass03'); }
                        if(randGrass === 3) { this.add.image(tempX, tempY, 'grass04'); }

                        var randLake = Phaser.Math.Between(0, 10);
                        if(randLake === 0) { this.add.image(tempX, tempY, 'lake01');  }
                        if(randLake === 3) { this.add.image(tempX, tempY, 'lake02');  }
                        if(randLake === 5) { this.add.image(tempX, tempY, 'lake03');  }
                        if(randLake === 7) { this.add.image(tempX, tempY, 'lake04');  }


                        var randRock = Phaser.Math.Between(0, 5);
                        if(randRock === 0) { this.add.image(tempX - randRock, tempY - 15, 'rock01'); }
                        if(randRock === 1) { this.add.image(tempX - randRock, tempY - 15, 'rock02'); }
                        if(randRock === 2) { this.add.image(tempX - randRock, tempY - 15, 'rock03'); }


                        var randTree = Phaser.Math.Between(0, 10);
                        if(randTree === 0) { this.add.image(tempX, tempY - 35, 'tree01'); }
                        if(randTree === 1) { this.add.image(tempX, tempY - 35, 'tree02'); }
                        if(randTree === 2) { this.add.image(tempX, tempY - 35, 'tree03'); }
                        if(randTree === 3) { this.add.image(tempX, tempY - 35, 'tree04'); }
                        if(randTree === 4) { this.add.image(tempX, tempY - 35, 'tree05'); }
                        if(randTree === 5) { this.add.image(tempX, tempY - 35, 'tree06'); }
                        if(randTree === 6) { this.add.image(tempX, tempY - 35, 'tree07'); }


            }

            //Adding on map bunch of trees or bushes from the bottom
            if(x === 5 && (y === 3) || x === 5 && (y === 4)  ||
                x === 6 && (y === 3) || x === 6 && (y === 4)  ||
            x === 7 && (y === 2) || x === 7 && (y === 3) || x === 7 && (y === 4) || x === 7 && (y === 5)
             
            )
            {
                
                var randGrass = Phaser.Math.Between(0, 5);
                if(randGrass === 0) { this.add.image(tempX, tempY, 'grass01'); }
                if(randGrass === 1) { this.add.image(tempX, tempY, 'grass02'); }
                if(randGrass === 2) { this.add.image(tempX, tempY, 'grass03'); }
                if(randGrass === 3) { this.add.image(tempX, tempY, 'grass04'); }

                var randLake = Phaser.Math.Between(0, 10);
                if(randLake === 0) { this.add.image(tempX, tempY, 'lake01');  }
                if(randLake === 3) { this.add.image(tempX, tempY, 'lake02');  }
                if(randLake === 5) { this.add.image(tempX, tempY, 'lake03');  }
                if(randLake === 7) { this.add.image(tempX, tempY, 'lake04');  }


                var randRock = Phaser.Math.Between(0, 5);
                if(randRock === 0) { this.add.image(tempX - randRock, tempY - 15, 'rock01'); }
                if(randRock === 1) { this.add.image(tempX - randRock, tempY - 15, 'rock02'); }
                if(randRock === 2) { this.add.image(tempX - randRock, tempY - 15, 'rock03'); }


                var randTree = Phaser.Math.Between(0, 10);
                if(randTree === 0) { this.add.image(tempX, tempY - 35, 'tree01'); }
                if(randTree === 1) { this.add.image(tempX, tempY - 35, 'tree02'); }
                if(randTree === 2) { this.add.image(tempX, tempY - 35, 'tree03'); }
                if(randTree === 3) { this.add.image(tempX, tempY - 35, 'tree04'); }
                if(randTree === 4) { this.add.image(tempX, tempY - 35, 'tree05'); }
                if(randTree === 5) { this.add.image(tempX, tempY - 35, 'tree06'); }
                if(randTree === 6) { this.add.image(tempX, tempY - 35, 'tree07'); }

            }


            //Adding on map bunch of trees from the left
            if(x === 1 && y === 0 ||x === 2 && y === 0 || x === 3 && y === 0 || x === 4 && y === 0 || x === 5 && y === 0 || x === 6 && y === 0 ||
                x === 2 && y === 1 || x === 3 && y === 1 || x === 4 && y === 1 || x === 5 && y === 1 ||
                 x === 3 && y === 2 || x === 4 && y === 2 
            )
            {
                
              
                var randGrass = Phaser.Math.Between(0, 5);
                if(randGrass === 0) { this.add.image(tempX, tempY, 'grass01'); }
                if(randGrass === 1) { this.add.image(tempX, tempY, 'grass02'); }
                if(randGrass === 2) { this.add.image(tempX, tempY, 'grass03'); }
                if(randGrass === 3) { this.add.image(tempX, tempY, 'grass04'); }

                var randLake = Phaser.Math.Between(0, 10);
                if(randLake === 0) { this.add.image(tempX, tempY, 'lake01');  }
                if(randLake === 3) { this.add.image(tempX, tempY, 'lake02');  }
                if(randLake === 5) { this.add.image(tempX, tempY, 'lake03');  }
                if(randLake === 7) { this.add.image(tempX, tempY, 'lake04');  }


                var randRock = Phaser.Math.Between(0, 5);
                if(randRock === 0) { this.add.image(tempX - randRock, tempY - 15, 'rock01'); }
                if(randRock === 1) { this.add.image(tempX - randRock, tempY - 15, 'rock02'); }
                if(randRock === 2) { this.add.image(tempX - randRock, tempY - 15, 'rock03'); }


                var randTree = Phaser.Math.Between(0, 10);
                if(randTree === 0) { this.add.image(tempX, tempY - 35, 'tree01'); }
                if(randTree === 1) { this.add.image(tempX, tempY - 35, 'tree02'); }
                if(randTree === 2) { this.add.image(tempX, tempY - 35, 'tree03'); }
                if(randTree === 3) { this.add.image(tempX, tempY - 35, 'tree04'); }
                if(randTree === 4) { this.add.image(tempX, tempY - 35, 'tree05'); }
                if(randTree === 5) { this.add.image(tempX, tempY - 35, 'tree06'); }
                if(randTree === 6) { this.add.image(tempX, tempY - 35, 'tree07'); }
            
            }


            //Adding on map bunch of trees from the right
            if(x === 1 && y === 7 || x === 2 && y === 7 || x === 3 && y === 7 || x === 4 && y === 7 || x === 5 && y === 7 || x === 6 && y === 7 ||
                x === 2 && y === 6 || x === 3 && y === 6 || x === 4 && y === 6 || x === 5 && y === 6 || 
                 x === 3 && y === 5 || x === 4 && y === 5 
            )
            {

               
                var randGrass = Phaser.Math.Between(0, 5);
                if(randGrass === 0) { this.add.image(tempX, tempY, 'grass01'); }
                if(randGrass === 1) { this.add.image(tempX, tempY, 'grass02'); }
                if(randGrass === 2) { this.add.image(tempX, tempY, 'grass03'); }
                if(randGrass === 3) { this.add.image(tempX, tempY, 'grass04'); }

                var randLake = Phaser.Math.Between(0, 10);
                if(randLake === 0) { this.add.image(tempX, tempY, 'lake01');  }
                if(randLake === 3) { this.add.image(tempX, tempY, 'lake02');  }
                if(randLake === 5) { this.add.image(tempX, tempY, 'lake03');  }
                if(randLake === 7) { this.add.image(tempX, tempY, 'lake04');  }


                var randRock = Phaser.Math.Between(0, 5);
                if(randRock === 0) { this.add.image(tempX - randRock, tempY - 15, 'rock01'); }
                if(randRock === 1) { this.add.image(tempX - randRock, tempY - 15, 'rock02'); }
                if(randRock === 2) { this.add.image(tempX - randRock, tempY - 15, 'rock03'); }


                var randTree = Phaser.Math.Between(0, 10);
                if(randTree === 0) { this.add.image(tempX, tempY - 35, 'tree01'); }
                if(randTree === 1) { this.add.image(tempX, tempY - 35, 'tree02'); }
                if(randTree === 2) { this.add.image(tempX, tempY - 35, 'tree03'); }
                if(randTree === 3) { this.add.image(tempX, tempY - 35, 'tree04'); }
                if(randTree === 4) { this.add.image(tempX, tempY - 35, 'tree05'); }
                if(randTree === 5) { this.add.image(tempX, tempY - 35, 'tree06'); }
                if(randTree === 6) { this.add.image(tempX, tempY - 35, 'tree07'); }
            
            }          
    
            tempX = tempX + 100;

        }

        tempY = tempY + 100;
        tempX = 50;

    }

     // --------------- BUTTONS ARE HERE  ---------------  // 

                // Adding CENTER button on screen
                centerButton = this.add.image(config.width / 2, config.height / 2, 'button');
                centerButton.setInteractive();
                centerButton.on('pointerover', function(pointer)
                    { 
                    console.log("CursorHover"); 
                    
                    });

                centerButton.on('pointerout', function(pointer)
                    {
                    console.log("CursorOut");
                    
                    });

                centerButton.on('pointerdown', function(pointer)
                    {
                    console.log("CenterButtonPressed");
                    });

                // Adding TOP LEFT button on screen
                topLeftButton = this.add.image(config.width - 750, config.height - 750, 'button');
                topLeftButton.setInteractive();
                topLeftButton.on('pointerover', function(pointer)
                    { 
                      console.log("CursorHover"); 
                      
                    });

                topLeftButton.on('pointerout', function(pointer)
                    {
                       console.log("CursorOut");
                       
                    });

                topLeftButton.on('pointerdown', function(pointer)
                    {
                        shootTL(arrows);
                       console.log("topLeftButtonPressed");
                    });

                // Adding TOP RIGHT button on screen
                topRightButton = this.add.image(config.width - 50, config.height - 750, 'button');
                topRightButton.setInteractive();
                topRightButton.on('pointerover', function(pointer)
                    { 
                      console.log("CursorHover"); 
                      
                    });

                topRightButton.on('pointerout', function(pointer)
                    {
                       console.log("CursorOut");
                       
                    });

                topRightButton.on('pointerdown', function(pointer)
                    {
                        shootTR(arrows);
                       console.log("topRightButtonPressed");
                    });   

                // Adding BOTTOM LEFT button on screen
                botLeftButton = this.add.image(config.width - 750 , config.height - 50, 'button');
                botLeftButton.setInteractive();
                botLeftButton.on('pointerover', function(pointer)
                    { 
                      console.log("CursorHover"); 
                      
                    });

                botLeftButton.on('pointerout', function(pointer)
                    {
                       console.log("CursorOut");
                       
                    });

                botLeftButton.on('pointerdown', function(pointer)
                    {
                        shootBL(arrows);
                       console.log("botLeftButtonPressed");
                    });    

                // Adding BOTTOM RIGHT button on screen
                botRightButton = this.add.image(config.width - 50, config.height - 50, 'button');
                botRightButton.setInteractive();
                botRightButton.on('pointerover', function(pointer)
                    { 
                      console.log("CursorHover"); 
                      
                    });

                botRightButton.on('pointerout', function(pointer)
                    {
                       console.log("CursorOut");
                       
                    });

                botRightButton.on('pointerdown', function(pointer)
                    {
                        shootBR(arrows);
                       console.log("botRightButtonPressed");
                    }); 

    //PLAYER               
    var arrows = this.add.group();
    player = this.physics.add.image(400, 400, 'player');

    var enemies = this.add.group();

    resize();
}


//-----------------ARROWS --------------------------------
function shootTR(arrows){
    //creates sprite via group
    if (!arrowTRActive){
        arrowTR = arrows.create(450, 350, 'arrowTR');
    
        arrowTRActive = true;
    }    
}

function shootTL(arrows){
    //creates sprite via group
    if (!arrowTLActive){
        arrowTL = arrows.create(350, 350, 'arrowTL');
        
        arrowTLActive = true;
    }
}

function shootBR(arrows){
    //creates sprite via group
    if (!arrowBRActive){
        arrowBR = arrows.create(450, 450, 'arrowBR');
        
        arrowBRActive = true;
    }
}

function shootBL(arrows){
    if (!arrowBLActive){
        arrowBL = arrows.create(350, 450, 'arrowBL');
        
        arrowBLActive = true;
    }
}

//ARROW COLLISION CHECK
function checkOverlapTop(spriteA) {

    if (spriteA.y < (config.height - 750)){
        return true;
    } else{
        return false;
    }
}

function checkOverlapBot(spriteA) {

    if (spriteA.y > (config.height - 50)){
        return true;
    } else{
        return false;
    }
}

//Player ROTATION
function pointerMove (pointer) {  
    var angleToPointer = Phaser.Math.Angle.BetweenPoints(player, pointer);
    var angleDelta = angleToPointer - player.rotation;
    
    angleDelta = atan2(sin(angleDelta), cos(angleDelta));

    player.rotation = angleToPointer;
}

//Spawner Search x,y,health,speed,damage,maxSpeed,active
function FillTopLeft(enemies){
    if (topLeft.length != 8){
        for (i=0;i<8;i++){
            var temp;
            temp = new Enemy(EX,EY,Ehp,Espeed,Edmg,EmxSpeed,Eactive);
            topLeft.push(temp);
        }
    }
}
//fill top right array
function FillTopRight(){
    if (topRight.length != 8){
        for (i=0;i<8;i++){
            var temp;
            temp = new Enemy(EX,EY,Ehp,Espeed,Edmg,EmxSpeed,Eactive);
            topRight.push(temp);
            console.log(topRight);
        }
    }
}
//fill bottom left array
function FillBotLeft(){
    if (botLeft.length != 8){
        for (i=0;i<8;i++){
            var temp;
            temp = new Enemy(EX,EY,Ehp,Espeed,Edmg,EmxSpeed,Eactive);
            botLeft.push(temp);
        }
    }
}
//fill bottom right array
function FillBotRight(){
    if (botRight.length != 8){
        for (i=0;i<8;i++){
            var temp;
            temp = new Enemy(EX,EY,Ehp,Espeed,Edmg,EmxSpeed,Eactive);
            botRight.push(temp);
        }
    }
}
//Remove Enemy from screen Top Left
function RemoveEnemyTL(){
    for(i=0;i<topLeft.length;i++){
        if(topLeft[i].GetHealth <= 0){
            topLeft[i].Reset();
        }
    }
}
//Remove Enemy from screen Top Right 
function RemoveEnemyTR(){
    for(i=0;i<topRight.length;i++){
        if(topRight[i].GetHealth <= 0){
            topRight[i].Reset();
        }
    }
}
    //remove enemy from bottom left
    function RemoveEnemyBL(){
        for(i=0;i<botLeft.length;i++){
            if(botLeft[i].GetHealth <= 0){
                botLeft[i].Reset();
            }
        }
    }
    //remove enemy from bottom right 
    function RemoveEnemyBR(){
        for(i=0;i<botRight.length;i++){
            if(botRight[i].GetHealth <= 0){
                botRight[i].Reset();
            }
        }
    }
    //spawn enemy to top left
    function SpawnEnemyTL(){
        for (i=0;i<topLeft.length;i++){
            if (!topLeft[i].GetActive()){
                topLeft[i].SetPos(0,0);
                topLeft[i].SetActive(true);
                drawEnemy(topLeft[i]);
                break;
            }
        }
    }
    
    //spawn enemy to top right 
       function SpawnEnemyTR(){
        for (i=0;i<topRight.length;i++){
            if (!topRight[i].GetActive()){
                topRight[i].SetPos(ScreenW,0);
                topRight[i].SetActive(true);
                break;
            }
        }
    }
    
    //spawn enemy to bottom left
    function SpawnEnemyBL(){
        for (i=0;i<botLeft.length;i++){
            if (!botLeft[i].GetActive()){
                botLeft[i].SetPos(0,ScreenH);
                botLeft[i].SetActive(true);
                break;
            }
        }
    }
    
    //spawn enemy to bottom right
    function SpawnEnemyBR(){
        for (i=0;i<botRight;i++){
            if(!botRight[i].GetActive()){
                botRight[i].SetPos(ScreenW, ScreenH);
                botRight[i].SetActive(true);
                break;
            }
        }
    }
    
    // need to re write the spawning of enemies over time.
    //this function runs a timer and spawns in an enemy based on time.
    function SpawnEnemies(){
        if (counter == 2){
            var temp = Phaser.Math.Between(0, 3);
            if (temp == 0){
                SpawnEnemyTL();
            }
            else if(temp == 1){
                SpawnEnemyTR();
            }
            else if(temp == 2){
                SpawnEnemyBL();
            }
            else if(temp == 3){
                SpawnEnemyBR();
            }
        }
        counter = 0;
    }
    //this takes a enemy type, passes in its position, draws the image on that position
    function drawEnemy(E){
        var TempE = E;
        var tempX = TempE.GetPosX();
        var tempY = TempE.GetPosY();
        //enemies.create(0,0,'enemy');
    }

    //Move Enemy Test 
    function moveToMiddle(){

    }


//Resize whole canvas are here
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
    //This gets the screen size for the enemies
    ScreenW = canvas.style.width;
    ScreenH = canvas.style.height;
}


function update()
{
    //Spawn stuff
    FillTopLeft();
    FillTopRight();
    FillBotLeft();
    FillBotRight();
    SpawnEnemyTL();


    //ARROW CHECK
    if (arrowTRActive) {
        arrowTR.x += speed;
        arrowTR.y -= speed;
        if (checkOverlapTop(arrowTR)){
            arrowTR.destroy();
            arrowTRActive = false;
        };
    
    }
    if (arrowTLActive) {
        arrowTL.x -= speed;
        arrowTL.y -= speed;
        if (checkOverlapTop(arrowTL)){
            arrowTL.destroy();
            arrowTLActive = false;
        };
    }
    if (arrowBRActive) {
        arrowBR.x += speed;
        arrowBR.y += speed;
        if (checkOverlapBot(arrowBR)){
            arrowBR.destroy();
            arrowBRActive = false;
        };
    }
    if (arrowBLActive) {
        arrowBL.x -= speed;
        arrowBL.y += speed;
        if (checkOverlapBot(arrowBL)){
            arrowBL.destroy();
            arrowBLActive = false;
        };
    }
    
    pointerMove(this.input.activePointer);
    //resize();
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// Enemy Script written by Rick Berenguer
var Enemy = (function(x,y,health,speed,damage,maxSpeed,active){

    this.x = x;
    this.y = y;
    this.health = health;
    this.speed = speed;
    this.damage = damage;
    this.maxSpeed = maxSpeed;
    this.active = active;

    //increases health to increase challenge
    this.increaseHealth = function(h){
        this.health +=h;
    }

    //increases speed to increase challenge
    this.increaseSpeed = function(s){
        //check if speed has increased past max speed
        if (speed >= maxSpeed){
            speed = maxSpeed;
            s = 0;
        }
        speed = speed + s;
    }

    //need some help moving enemies


    //take damage for this enemy
    this.TakeDamage = function(dmg){
        this.health -= dmg;
        if(this.health <= 0){
            return;
        }
    }

    //getter for health
    this.GetHealth = function(){
        return this.health;
    }
    //setter for health
    this.SetHealth = function(hp){
        this.health = hp;
    }
    //getter for active
    this.GetActive = function(){
        return this.active;
    }
    //setter for active
    this.SetActive = function(t){
        this.active = t;
    }
    //getter for damage
    this.GetDamage = function(){
        return this.damage;
    }
    //setter for damage
    this.SetDamage = function(d){
        this.damage = d;
    }
    //getter for speed
    this.GetSpeed = function(){
        return this.speed;
    }
    //setter for speed
    this.SetSpeed = function(s){
        this.speed = s;
    }
    //setter for position
    this.SetPos = function(x,y){
        this.x = x;
        this.y = y;
    }
    //getter for position X
    this.GetPosX = function(){
        return this.x;
    }
    // getter for position Y
    this.GetPosY = function(){
        return this.y;
    }

    //this is an update function to set the new speed, damage and health of the enemies
    this.UpdateEnemy = function(s,d,h){
        this.speed = s;
        this.damage = d;
        this.health = h;
    }

    //function to reset the player 
    this.Reset = function(){
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.health = health;
        this.speed = speed;
        this.damage = damage;
    }
});