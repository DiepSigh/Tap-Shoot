class GameScene extends Phaser.Scene{

   constructor(){
    super('MyGameScene');
   }

    GameScene()
    {
        Phaser.Scene.call(this, { key: 'GameScene' });
    }

    preload()
    {
        this.load.image('enemy', 'images/greenbox.png');
    }

    create()
    {
        for (var i = 0; i < 10; i++)
        {
            var x = Phaser.Math.Between(0, 800);
            var y = Phaser.Math.Between(0, 600);

            var box = this.add.image(x, y, 'enemy');

            box.setInteractive();
        }

        this.input.on('gameobjectup', this.clickHandler, this);
        //TestFunction();
    }

    clickHandler(pointer, box)
    {
        box.input.enabled = false;
        box.setVisible(false);

        this.events.emit('addScore');
    }

    TestFunction(){
        console.log("HELLO");
    }

};

/*class UIScene extends Phaser.Scene{

    UIScene()
    {
        Phaser.Scene.call(this, { key: 'UIScene', active: true });

        this.score = 0;
    }

    create()
    {
        var info = this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#FF0000' });

        var ourGame = this.scene.get('GameScene');

        ourGame.events.on('addScore', function () {

            this.score += 10;

            info.setText('Score: ' + this.score);

        }, this);
    }

};*/

/*var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    //parent: '',
    scene: [ GameScene, UIScene ]
};

var game = new Phaser.Game(config);*/