var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);



function preload(){
    this.load.image('enemy', 'images/bidoff.jpg');
}

function create(){
    this.add.image('enemy',0,0);
}

function update(){

}

var Spawner = (function(x,y,topLeft,topRight,botLeft,botRight){
    this.x = x;
    this.y = y;
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.botLeft = botLeft;
    this.botRight = botRight;

    var speed, health, damage;

    var ScreenH, ScreenW;

    var Spawning = false;

    var image;


    //fill variables to increase difficulty
    this.fillVars = function(){
        var temp = new Enemy(10,10,100,"enemy",10,10,10,false);
        //when we get a set screen variable, set ScreenH and ScreenW to the screen width and height variable

        speed = temp.GetSpeed();
        health = temp.GetHealth();
        damage = temp.GetDamage();
    }
    //fill top left array
    this.FillTopLeft = function(){
        topLeft = [];
        for (i=0;i<8;i++){
            var temp;
            temp = new Enemy(10,10,health,"enemy",speed,damage,10, false);
            topLeft.push(temp);
            console.log(i);
        }
    }
    //fill top right array
    this.fillTopRight = function(){
        topRight = [];
        for (i=0;i<8;i++){
            var temp;
            temp = new Enemy(10,10,health,"enemy",speed,damage,10, false);
            topRight.push(temp);
        }
        console.log(topRight);
    }
    //fill bottom left array
    this.fillbotLeft = function(){
        botLeft = [];
        for (i=0;i<8;i++){
            var temp;
            temp = new Enemy(10,10,health,"enemy",speed,damage,10, false);
            botLeft.push(temp);
        }
    }
    //fill bottom right array
    this.fillbotRight = function(){
        botRight = [];
        for (i=0;i<8;i++){
            var temp;
            temp = new Enemy(10,10,health,"enemy",speed,damage,10, false);
            botRight.push(temp);
        }
    }
    //remove enemy from top left
    this.RemoveEnemyTL = function(){
        for(i=0;i<topLeft.length;i++){
            if(topLeft[i].GetHealth <= 0){
                topLeft[i].Reset();
            }
        }
    }
    //remove enemy from top right
    this.RemoveEnemyTR = function(){
        for(i=0;i<topRight.length;i++){
            if(topRight[i].GetHealth <= 0){
                topRight[i].Reset();
            }
        }
    }
    //remove enemy from bottom left
    this.RemoveEnemyBL = function(){
        for(i=0;i<botLeft.length;i++){
            if(botLeft[i].GetHealth <= 0){
                botLeft[i].Reset();
            }
        }
    }
    //remove enemy from bottom right 
    this.RemoveEnemyBR = function(){
        for(i=0;i<botRight.length;i++){
            if(botRight[i].GetHealth <= 0){
                botRight[i].Reset();
            }
        }
    }

    //spawn enemy to top left
    this.SpawnEnemyTL = function(){
        console.log("spawningTL");
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
    this.SpawnEnemyTR = function(){
        for (i=0;i<topRight.length;i++){
            if (!topRight[i].GetActive()){
                topRight[i].SetPos(ScreenW,0);
                topRight[i].SetActive(true);
                break;
            }
        }
    }

    //spawn enemy to bottom left
    this.SpawnEnemyBL = function(){
        for (i=0;i<botLeft.length;i++){
            if (!botLeft[i].GetActive()){
                botLeft[i].SetPos(0,ScreenH);
                botLeft[i].SetActive(true);
                break;
            }
        }
    }

    //spawn enemy to bottom right
    this.SpawnEnemyBR = function(){
        for (i=0;i<botRight;i++){
            if(!botRight[i].GetActive()){
                botRight[i].SetPos(ScreenW, ScreenH);
                botRight[i].SetActive(true);
                break;
            }
        }
    }

    //this function runs a timer and spawns in an enemy based on time.
    this.SpawnEnemies = function(){
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

    //this removes all for the special attack
    this.RemoveAll = function(){
        for (i=0;i<8;i++){
            if(topLeft[i].GetActive){
                topLeft[i].Reset();
            }
            if(topRight[i].GetActive){
                topRight[i].Reset();
            }
            if(botLeft[i].GetActive){
                botLeft[i].Reset();
            }
            if(botRight[i].GetActive){
                botRight[i].Reset();
            }
        }
    }

    //this loads the image of the enemy
    this.loadEnemy = function(){
        //this.load.image('enemy', 'images/bidoff.jpg');
    }


    //this takes a enemy type, passes in its position, draws the image on that position
    this.drawEnemy = function(E){
        var TempE = E;
        var tempX = TempE.GetPosX();
        var tempY = TempE.GetPosY();
        this.add.image('enemy',tempX,tempY);
    }

});