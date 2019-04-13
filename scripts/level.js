var config = {
    type: Phaser.AUTO, 
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
//PLAYER VARIABLES
var HP = 3;
var speed = 1; //speed of arrow
var kills = 0;
var score = 0;
var magicCharge = 1;
var magicCoins = 0;
//Arrows
var arrowTRActive = false;
var arrowTLActive = false;
var arrowBRActive = false;
var arrowBLActive = false;
//Magic Arrows
var magicArrowTRActive = false;
var magicArrowTLActive = false;
var magicArrowBRActive = false;
var magicArrowBLActive = false;
//Cursor
var sin = Math.sin;
var cos = Math.cos;
var atan2 = Math.atan2;
//Text Display
var magicText = '';
var scoreText = '';
var lifeText = '';
var levelText = '';

var magicTemp = 0;
var scoreTemp = 0;
var lifeTemp = 0;
var levelTemp = 0;

var launchArrow;
var impactArrow;
var magic;

var enemyLeftSide;
var enemyRightSide;

var magicArrowTL;
var magicArrowBL;
var magicArrowTR;
var magicArrowBR;

function preload ()
{
    //Enemy sprite preload 
    this.load.spritesheet('enemyRightSide', 'images/enemy/bat/bat_RightSide.png', { frameWidth: 97, frameHeight: 62, endFrame: 5} );
    this.load.spritesheet('enemyLeftSide', 'images/enemy/bat/bat_LeftSide.png', { frameWidth: 97, frameHeight: 62, endFrame: 5} );
    //Magic sprites preload
    this.load.spritesheet('magicArrowTL', 'images/magic/magicLT.png', { frameWidth: 100, frameHeight: 100, endFrame: 3} );
    this.load.spritesheet('magicArrowTR', 'images/magic/magicRT.png', { frameWidth: 100, frameHeight: 100, endFrame: 3} );
    this.load.spritesheet('magicArrowBL', 'images/magic/magicLB.png', { frameWidth: 100, frameHeight: 100, endFrame: 3} );
    this.load.spritesheet('magicArrowBR', 'images/magic/magicRB.png', { frameWidth: 100, frameHeight: 100, endFrame: 3} );
    //Sound Effects
    this.load.audio('launchArrow', ['audio/launch.mp3']);
    this.load.audio('impactArrow', ['audio/impact.mp3']);
    //PLAYER
    this.load.image('player', 'images/archer.png');
    this.load.image('arrowTR', 'images/arrowTR.png');
    this.load.image('arrowTL', 'images/arrowTL.png');
    this.load.image('arrowBR', 'images/arrowBR.png');
    this.load.image('arrowBL', 'images/arrowBL.png');

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
        var randPreloadTheme = Phaser.Math.Between(0, 1); 
        if(randPreloadTheme === 0){this.load.audio('levelTheme', ['audio/levelTheme1Map1.mp3' ]);}
        if(randPreloadTheme === 1){this.load.audio('levelTheme', ['audio/levelTheme2Map1.mp3' ]);}
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
        var randPreloadTheme = Phaser.Math.Between(0, 1); 
        if(randPreloadTheme === 0 ){this.load.audio('levelTheme', ['audio/levelTheme1Map2.mp3']);}
        if(randPreloadTheme === 1 ){this.load.audio('levelTheme', ['audio/levelTheme2Map2.mp3']);}
        
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

                        if (magicCharge >= 1) {
                            magicShootTL(arrows);
                            magicShootTR(arrows);
                            magicShootBL(arrows);
                            magicShootBR(arrows);
                            playShootSound();
                            magicCharge--;
                        }
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


        // ---------- ENEMIES SPRITE ANIMATIONS HERE ----------  //
            
        // enemies for RIGHT SIDE
        //constructor
        enemyRightSide = {
            key : 'enemyRightSide',
            frames: this.anims.generateFrameNumbers('enemyRightSide', {start: 1, end: 6, first: 1}),
            frameRate: 12, // how fast animation plays
            repeat: 500 // how many times animation repeats 
            
        };
        //call constractor
        this.anims.create(enemyRightSide);
    
        //add sprites based on constructor and call animation play
        var enemyRightTop = this.add.sprite(700,100, 'enemyRightSide');
        enemyRightTop.anims.play('enemyRightSide');

        var enemyRightBot = this.add.sprite(700,700, 'enemyRightSide');
        enemyRightBot.anims.play('enemyRightSide');



        // enemies for LEFT SIDE
        //constructor
        enemyLeftSide = {
            key : 'enemyLeftSide',
            frames: this.anims.generateFrameNumbers('enemyLeftSide', {start: 1, end: 6, first: 1}),
            frameRate: 12, // how fast animation plays
            repeat: 500 // how many times animation repeats 
            
        };
        //call constructor
        this.anims.create(enemyLeftSide);
    
        //add sprites based on constructor and call animation play
        var enemyLeftTop = this.add.sprite(100,100, 'enemyLeftSide');
        enemyLeftTop.anims.play('enemyLeftSide');
                        
        var enemyLeftBot = this.add.sprite(100,700, 'enemyLeftSide');
        enemyLeftBot.anims.play('enemyLeftSide');



        // magic for LEFT TOP SIDE
        //constructor
        magicArrowTL = {
            key : 'magicArrowTL',
            frames: this.anims.generateFrameNumbers('magicArrowTL', {start: 1, end: 4, first: 1}),
            frameRate: 12, // how fast animation plays
            repeat: 500 // how many times animation repeats 
            
        };
        //call constructor
        this.anims.create(magicArrowTL);
    
        //add sprites based on constructor and call animation play
        magicArrowTL = this.add.sprite(350,350, 'magicArrowTL');
        magicArrowTL.alpha = 0;
        magicArrowTL.anims.play('magicArrowTL');

        // magic for LEFT BOT SIDE
        //constructor
        magicArrowBL = {
            key : 'magicArrowBL',
            frames: this.anims.generateFrameNumbers('magicArrowBL', {start: 1, end: 4, first: 1}),
            frameRate: 12, // how fast animation plays
            repeat: 500 // how many times animation repeats 
            
        };
        //call constructor
        this.anims.create(magicArrowBL);
    
        //add sprites based on constructor and call animation play
        magicArrowBL = this.add.sprite(350,450, 'magicArrowBL');
        magicArrowBL.alpha = 0;
        magicArrowBL.anims.play('magicArrowBL');


        // magic for RIGHT TOP SIDE
        //constructor
        magicArrowTR = {
            key : 'magicArrowTR',
            frames: this.anims.generateFrameNumbers('magicArrowTR', {start: 1, end: 4, first: 1}),
            frameRate: 12, // how fast animation plays
            repeat: 500 // how many times animation repeats 
            
        };
        //call constructor
        this.anims.create(magicArrowTR);
    
        //add sprites based on constructor and call animation play
        magicArrowTR = this.add.sprite(450,350, 'magicArrowTR');
        magicArrowTR.alpha = 0;
        magicArrowTR.anims.play('magicArrowTR');

        
        // magic for RIGHT BOT SIDE
        //constructor
        magicArrowBR = {
            key : 'magicArrowBR',
            frames: this.anims.generateFrameNumbers('magicArrowBR', {start: 1, end: 4, first: 1}),
            frameRate: 12, // how fast animation plays
            repeat: 500 // how many times animation repeats 
            
        };
        //call constructor
        this.anims.create(magicArrowBR);
    
        //add sprites based on constructor and call animation play
        magicArrowBR = this.add.sprite(450,450, 'magicArrowBR');
        magicArrowBR.alpha = 0;
        magicArrowBR.anims.play('magicArrowBR');

        ////// --------- DONE WITH SPRITE ANIMATION --------- ///////

        //Play theme sound here           
        levelTheme =  this.sound.add('levelTheme');
        levelTheme.play();
        levelTheme.loop = true;
        forestSound = this.sound.add('atmosphereSound');
        forestSound.play();
        forestSound.loop = true;

    //PLAYER               
    var arrows = this.add.group();
    player = this.physics.add.image(400, 400, 'player');
    
    //DISPLAY TEXT
    magicText = this.add.text(340, 10, 'Magic Charge', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
    scoreText = this.add.text(340, 50, 'Score', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
    lifeText = this.add.text(140, 10, 'HP', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
    levelText = this.add.text(140, 50, 'Level', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });

    resize();
}

//SOUND FUNCTIONS
function playShootSound(){
    launchArrow.play();
    impactArrow.play();
}

//-------------------------- ARROWS --------------------------------
function shootTR(arrows){
    if (!arrowTRActive){
        //creates sprite via group
        arrowTR = arrows.create(450, 350, 'arrowTR');
        playShootSound();
        arrowTRActive = true;
    }    
}

function shootTL(arrows){
    if (!arrowTLActive){
        arrowTL = arrows.create(350, 350, 'arrowTL');
        playShootSound();
        arrowTLActive = true;
    }
}

function shootBR(arrows){
    if (!arrowBRActive){
        arrowBR = arrows.create(450, 450, 'arrowBR');
        playShootSound();
        arrowBRActive = true;
    }
}

function shootBL(arrows){
    if (!arrowBLActive){
        arrowBL = arrows.create(350, 450, 'arrowBL');
        playShootSound();
        arrowBLActive = true;
    }
}

//MAGIC SHOOT ARROW I S H E R E
function magicShootBL(){
    magicArrowBL.alpha = 1;
    magicArrowBLActive = true;
}
function magicShootBR(){
    magicArrowBR.alpha = 1;
    magicArrowBRActive = true;
}
function magicShootTL(){
    magicArrowTL.alpha = 1;
    magicArrowTLActive = true;
}
function magicShootTR(){
    magicArrowTR.alpha = 1; 
    magicArrowTRActive = true;
}

//ARROW COLLISION CHECK
function checkOverlapTop(spriteA) {
    //when arrow reaches top of canvas kinda
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
    //ARROW CHECK
    if (arrowTRActive) {
        arrowTR.x += speed;
        arrowTR.y -= speed;
        if (checkOverlapTop(arrowTR)){
            arrowTR.destroy();
            magicCoins++;
            arrowTRActive = false;
        };
    }
    if (arrowTLActive) {
        arrowTL.x -= speed;
        arrowTL.y -= speed;
        if (checkOverlapTop(arrowTL)){
            arrowTL.destroy();
            magicCoins++;
            arrowTLActive = false;
        };
    }
    if (arrowBRActive) {
        arrowBR.x += speed;
        arrowBR.y += speed;
        if (checkOverlapBot(arrowBR)){
            arrowBR.destroy();
            magicCoins++;
            arrowBRActive = false;
        };
    }
    if (arrowBLActive) {
        arrowBL.x -= speed;
        arrowBL.y += speed;
        if (checkOverlapBot(arrowBL)){
            arrowBL.destroy();
            magicCoins++;
            arrowBLActive = false;
        };
    }
    
    if (magicArrowBLActive) {
        magicArrowBL.x -= speed;
        magicArrowBL.y += speed;
        if (checkOverlapBot(magicArrowBL)){
            magicArrowBL.alpha = 0;
            magicArrowBLActive = false;
            magicArrowBL.x = 350;
            magicArrowBL.y = 450;
        };
    }
    if (magicArrowBRActive) {
        magicArrowBR.x += speed;
        magicArrowBR.y += speed;
        if (checkOverlapBot(magicArrowBR)){
            magicArrowBR.alpha = 0;
            magicArrowBRActive = false;
            magicArrowBR.x = 450;
            magicArrowBR.y = 450;
        };
    }
    if (magicArrowTRActive) {
        magicArrowTR.x += speed;
        magicArrowTR.y -= speed;
        if (checkOverlapTop(magicArrowTR)){
            magicArrowTR.alpha = 0;
            magicArrowTRActive = false;
            magicArrowTR.x = 450;
            magicArrowTR.y = 350;
        };
    }
    if (magicArrowTLActive) {
        magicArrowTL.x -= speed;
        magicArrowTL.y -= speed;
        if (checkOverlapTop(magicArrowTL)){
            magicArrowTL.alpha = 0;
            magicArrowTLActive = false;
            magicArrowTL.x = 350;
            magicArrowTL.y = 350;
        };
    }

    //LEVEL UP / ARROW SPEED UP
    if (kills >= 20) {
        speed++;
        kills = 0;
        score += 5;
    }

    if (magicCoins == 10) {
        magicCharge++;
        magicCoins -= 10;
    }

    //Update Text.
    //If statements to avoid lag
    if (magicTemp != magicCharge) {
        magicText.text = "Magic Charge: " + magicCharge;
        magicTemp = magicCharge;
    }
    if (scoreTemp != score) {
        scoreText.text = "Score: " + score;
        scoreTemp = score;
    }
    if (lifeTemp != HP) {
        lifeText.text = "HP: " + HP;
        lifeTemp = HP;
    }
    if (levelTemp != speed) {
        levelText.text = "Level: " + speed;
        levelTemp = speed;
    }

    pointerMove(this.input.activePointer);
}





