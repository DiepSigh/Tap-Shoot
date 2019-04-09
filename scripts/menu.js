var Menu = {

    preload : function() {
        game.load.image('menu', './assets/images/playbutton.jpg');
    },

    create: function() {
        this.add.sprite(0, 0, 'menu');
    },

    startGame: function() {
        this.state.start('Game');

    }

};