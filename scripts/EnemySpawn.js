var Spawner = (function(){

    var x, y, topLeft, topRight, botLeft, botRight, image;

    function FillTopLeft(sprite){
        topLeft = [];

        for (i=0;i<4;i++){
            topLeft.push(sprite);
        }
    }

    function fillTopRight(sprite){
        topRight = [];

        for (i=0;i<4;i++){
            topRight.push(sprite);
        }
    }

    function fillbotLeft(sprite){
        botLeft = [];

        for (i=0;i<4;i++){
            botLeft.push(sprite);
        }
    }

    function fillbotRight(sprite){
        botRight = [];

        for (i=0;i<4;i++){
            botRight.push(sprite);
        }
    }

    function RemoveEnemyTL(){
        delete topLeft[0];
    }

    function RemoveEnemyTR(){
        delete topRight[0];
    }

    function RemoveEnemyBL(){
        delete botLeft[0];
    }

    function RemoveEnemyBR(){
        delete botRight[0];
    }



})();