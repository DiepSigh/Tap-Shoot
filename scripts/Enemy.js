var Enemy = (function(x,y,health,tag,speed,damage,maxSpeed, active){

    this.x = x;
    this.y = y;
    this.health = health;
    this.tag = tag;
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
    this.moveToMiddle = function(){

    }

    //take damage for this enemy
    this.TakeDamage = function(dmg){
        this.health -= dmg;
        if(this.health <= 0){
            return;
        }
    }

    //getter for tag
    this.GetTag = function(){
        return this.tag;
    }

    //setter for tag
    this.SetTag = function(string){
        this.tag = string;
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


    function preload(){
        this.load.image('Enemy', 'sprites/enemy.jpg');
    }

    function create(){
        this.add.image(this.x,this.y,'Enemy');
    }
});