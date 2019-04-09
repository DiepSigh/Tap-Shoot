var Enemy = (function(x,y,health,tag,speed,damage,maxSpeed,image){

    this.x = x;
    this.y = y;
    this.health = health;
    this.tag = tag;
    this.speed = speed;
    this.damage = damage;
    this.maxSpeed = maxSpeed;

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
    this.setTag = function(string){
        this.tag = string;
    }

});