var config = {
    type: Phaser.AUTO, 
    width: 800,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true,
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
};

var game = new Phaser.Game(config);
window.addEventListener("resize", resize, false);

var centerButton;
var topLeftButton;
var topRightButton;
var botLeftButton;
var botRightButton;

var levelTheme;
var forestSound;

var launchArrow;
var impactArrow;

function preload ()
{
    //Sound Effects
    this.load.audio('launchArrow', ['audio/launch.mp3']);
    this.load.audio('impactArrow', ['audio/impact.mp3']);


    //Image controller buttons
    this.load.image('button', 'images/button.png');


    //Generation random number for preload
    var randPreload = Phaser.Math.Between(0, 1); 
    
    //Preload  ----------- FOREST MAP -----------
    if(randPreload === 0)
    {
        //TEST
        //this.load.image('test', 'test.png');

        //level audio theme preload
        this.load.audio('levelTheme', ['audio/levelThemeMap1.mp3' ]);
        this.load.audio('atmosphereSound', ['audio/forestSound.mp3' ]);


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

        //level audio theme preload
        this.load.audio('levelTheme', ['audio/levelThemeMap2.mp3']);
        this.load.audio('atmosphereSound', ['audio/desertSound.mp3' ]);

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

    launchArrow =  this.sound.add('launchArrow'); // <--- activation sound then player shoots arrow
    impactArrow = this.sound.add('impactArrow'); // <--- activation sound then arrow impacts enemy

    
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
                       
                        launchArrow.play();
                        impactArrow.play();

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
                        launchArrow.play();
                        impactArrow.play();

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
                        launchArrow.play();
                        impactArrow.play();

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
                        launchArrow.play();
                        impactArrow.play();

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
                        launchArrow.play();
                        impactArrow.play();

                       console.log("botRightButtonPressed");
                    }); 


        //Play theme sound            
        levelTheme =  this.sound.add('levelTheme');
        levelTheme.play();
        levelTheme.loop = true;
        forestSound = this.sound.add('atmosphereSound');
        forestSound.play();
        forestSound.loop = true;

        

    resize();

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
}


function update()
{

   // resize();
}





