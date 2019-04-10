//Coded by DiepSigh
//stores everything related to player
//TO DO:
//Firing arrows, rotation uLeft uRight dLeft dRight, 

function preload() {
    this.load.image('player', 'assets/link.png');
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
    this.add.image(100,100, 'player');
    this.anchor.set(0.5);
    this.game.physics.enable(this);
}

function createPlayer(x, y) {
    var temp = new Player(game, x, y);
    game.add.existing(temp);
}