var MenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'MenuScene' });
    },

    preload: function ()
    {
        this.load.image('menu', 'images/start.png');
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'menu');

        this.input.once('pointerdown', function () {

            console.log('From MenuScene to GameScene');

            this.scene.start('GameScene');

        }, this);
    }

});

var GameScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'GameScene' });
    },

    preload: function ()
    {
        this.load.image('enemy', 'images/greenbox.png');
    },

    create: function ()
    {
        for (var i = 0; i < 10; i++)
        {
            var x = Phaser.Math.Between(0, 800);
            var y = Phaser.Math.Between(0, 600);

            var box = this.add.image(x, y, 'enemy');

            //  Make them all input enabled
            box.setInteractive();
        }

        this.input.on('gameobjectup', this.clickHandler, this);
    },

    clickHandler: function (pointer, box)
    {
        //  Disable our box
        box.input.enabled = false;
        box.setVisible(false);

        //  Dispatch a Scene event
        this.events.emit('addScore');
    }

});

var UIScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function UIScene ()
    {
        Phaser.Scene.call(this, { key: 'UIScene', active: true });

        this.score = 0;
    },

    create: function ()
    {
        //  Our Text object to display the Score
        var info = this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#FF0000' });

        //  Grab a reference to the Game Scene
        var ourGame = this.scene.get('GameScene');

        //  Listen for events from it
        ourGame.events.on('addScore', function () {

            this.score += 10;

            info.setText('Score: ' + this.score);

        }, this);
    }

});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: '',
    scene: [ MenuScene, GameScene, UIScene ]
};

var game = new Phaser.Game(config);