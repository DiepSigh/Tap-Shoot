var Spawner = (function(x,y,topLeft,topRight,botLeft,botRight){

    this.x = x;
    this.y = y;
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.botLeft = botLeft;
    this.botRight = botRight;


    this.FillTopLeft = function(){
        topLeft = [];
        for (i=0;i<4;i++){
            topLeft.push(i);
            console.log(i);
        }
    }

    //for loop to be 1-4 of array, for loop inside to create enemies...
    //trying to create a function to fill all 4 arrays without calling each individual array in its own function
    this.functioningTest = function(){
        for (i=0;i<3;i++){
            for (j=0;j<20;j++){
                var temp;
                temp = new Enemy(10,10,100,"enemy",10,10,10);
                if(i == 0){
                    topLeft.push(temp);
                }
                else if(i == 1){
                    topRight.push(temp);
                }
                else if(i == 2){
                    botRight.push(temp);
                }
                else if(i ==3){
                    botLeft.push(temp);
                }
                delete temp;
                break;
            }
        }
        console.log(topRight);
        console.log(topLeft);
        console.log(botLeft);
        console.log(botRight);
    }


    ////////////////////////////////////////
    this.fillTopRight = function(){
        topRight = [];
        for (i=0;i<4;i++){
            var temp;
            temp = new Enemy(10,10,100,"enemy",10,10,10);
            topRight.push(temp);
        }
        console.log(topRight);
    }

    this.fillbotLeft = function(){
        botLeft = [];
        for (i=0;i<4;i++){
            botLeft.push(i);
        }
    }

    this.fillbotRight = function(){
        botRight = [];
        for (i=0;i<4;i++){
            botRight.push();
        }
    }

    this.checkEnemyArrays = function(){
        if (topLeft.length < 5){
            FillTopLeft();
        }
        
        if (topRight.length < 5){
            fillTopRight();
        }

        if (botLeft.length < 5){
            fillbotLeft();
        }
        
        if (botRight.length < 5){
            fillbotRight();
        }
    }

    this.RemoveEnemyTL = function(){
        delete topLeft[0];
        
    }

    this.RemoveEnemyTR = function(){
        delete topRight[0];
        console.log(topRight);
    }

    this.RemoveEnemyBL = function(){
        delete botLeft[0];
    }

    this.RemoveEnemyBR = function(){
        delete botRight[0];
    }
});