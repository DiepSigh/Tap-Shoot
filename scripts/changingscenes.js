var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'sceneA' });
    },

    preload: function ()
    {
        this.load.image('menu', 'images/start.png');
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'menu');

        this.input.once('pointerdown', function () {

            console.log('From SceneA to SceneB');

            this.scene.start('sceneB');

        }, this);
    }

});

var SceneB = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneB ()
    {
        Phaser.Scene.call(this, { key: 'sceneB' });
    },

    preload: function ()
    {
        this.load.image('squirtle', 'images/squirtle.png');
    },

    create: function () 
    {
        this.add.sprite(400, 300, 'squirtle');
    },

});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: '',
    scene: [ SceneA, SceneB ]
};

var game = new Phaser.Game(config);

