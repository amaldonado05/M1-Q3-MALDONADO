const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let catcher;
let cat;
let cursors;
let winText;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('catcher', 'assets/catcher.png');
    this.load.image('cat', 'assets/cat.png');
}

function create() {
    this.add.image(400, 300, 'background');

    catcher = this.physics.add.sprite(400, 500, 'catcher').setScale(0.6);
    catcher.setCollideWorldBounds(true);

    cat = this.physics.add.sprite(Phaser.Math.Between(50, 750), 0, 'cat').setScale(0.8);
    cat.setBounce(0.5);
    cat.setCollideWorldBounds(true);

    cat.body.setSize(cat.width * 0.6, cat.height * 0.6);
    cat.body.setOffset(cat.width * 0.2, cat.height * 0.2);

    cursors = this.input.keyboard.createCursorKeys();

    winText = this.add.text(400, 250, '', {
        fontSize: '32px',
        fill: '#ffffff'
    }).setOrigin(0.5);

    this.physics.add.overlap(catcher, cat, catchCat, null, this);
}

function update() {
    if (cursors.left.isDown) {
        catcher.setVelocityX(-300);
    } else if (cursors.right.isDown) {
        catcher.setVelocityX(300);
    } else {
        catcher.setVelocityX(0);
    }
}

function catchCat(player, cat) {
    cat.disableBody(true, true); 
    winText.setText('You caught the cat! F5 to play again!');
}
