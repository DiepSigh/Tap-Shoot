//Coded by DiepSigh
//stores everything related to player
//TO DO:
//Firing arrows, rotation uLeft uRight dLeft dRight, 

function preload() {
    this.load.image('player', 'assets/bidoff.jpg');
}

var maxHP;
var HP;
var magicCD; //cooldown for magic attack
var score;
var kills;
var upgrades;

function initialize() {
    maxHP = 3;
    HP = 3;
    magicCD = 60;
    score = 0;
    kills = 0;
    upgrades = 0;
}

function levelUp() {
    HP = maxHP;
}

function hurt(){
    HP-=1;
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
    this.add.image(x,y, 'player');
    this.anchor.set(0.5);
    this.game.physics.enable(this);
}

function createPlayer(x, y) {
    var temp = new Player(game, x, y);
    this.add.image(x,y, 'player');
    game.add.existing(temp);
}