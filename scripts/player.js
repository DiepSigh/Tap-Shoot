//stores everything related to player
//TO DO:
//Firing arrows, rotation uLeft uRight dLeft dRight, 

function preload() {
    game.load.image('player', 'assets/link.png');
}

//Max HP?
var HP;
var LV;
var magicCD; //cooldown for magic attack
var score;

function initialize() {
    HP = 100;
    LV = 1;
    magicCD = 60;
    score = 0;
}

function levelUp() {
    LV++;
    HP+=10;

}

function hurt(){
    HP-=10;
    //checkOverlap or call when enemy reaches end of array
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
    

}

function getPlayerHP(){
    return HP;
}

Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
}


//new Player(game, 100, 100);