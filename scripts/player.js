//Coded by DiepSigh
//stores everything related to player
//TO DO:
//Firing arrows, rotation uLeft uRight dLeft dRight, 

var Player = new Phaser.Class({

Extends: Phaser.Scene,

preload: function() {
    this.load.image('player', 'images/bidoff.jpg');
    this.load.image('arrow', 'images/arrow.png');
},

create: function(){

    this.maxHP;
    this.HP;
    this.magicCD; //cooldown for magic attack
    this.score;
    this.kills;
    this.upgrades;

    this.arrows;

    this.sin = Math.sin;
    this.cos = Math.cos;
    this.atan2 = Math.atan2;

    this.arrows = this.add.group();
},

initialize: function() {
    maxHP = 3;
    HP = 3;
    magicCD = 60;
    score = 0;
    kills = 0;
    upgrades = 0;
},

hurt: function(){
    HP-=1;
    //checkOverlap or call when enemy reaches end of array
},

spawn: function(){
    this.add.image(400, 400, 'player');
},

shoot: function(arrow){
    //creates sprite via group
    arrow.create(450, 350, 'arrow');
},

//check overlap with enemies
checkOverlap: function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
    
},

getPlayerHP: function(){
    return HP;
}

// function pointerMove (pointer) {  
//     var angleToPointer = Phaser.Math.Angle.BetweenPoints(ship, pointer);
//     var angleDelta = angleToPointer - ship.rotation;
    
//     angleDelta = atan2(sin(angleDelta), cos(angleDelta));

// }

// Player = function (game, x, y) {
//     this.add.image(x, y, 'player');
// }

// function createPlayer(game, x, y) {
//     var temp = new Player(game, x, y);
// }

});