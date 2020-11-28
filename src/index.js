import 'phaser';
import circle from 'url:./assets/circle.png';

export default class Demo extends Phaser.Scene
{
    constructor ()
    {
        super('demo');
        this.ship = null
        this.planet = null
        //this.planet2 = null
    }

    preload ()
    {
        this.load.image('circle', circle);
    }

    create ()
    {
        this.planet = this.physics.add.image(600, 500, 'circle').setScale(2).refreshBody();
        //this.planet2 = this.physics.add.image(1200, 200, 'circle').setScale(2).refreshBody();
        this.ship = this.physics.add.image(800, 350, 'circle').setScale(0.5).refreshBody();
        // add collision
        //this.ship.setCollideWorldBounds(true);
        // Set an initial motion
        this.ship.setVelocityX(500)
        // cap the velocity
        this.ship.setMaxVelocity(1000)
    }

    update()
    {
        const cursors = this.input.keyboard.createCursorKeys();

        // Calculate gravity as the normalised vector from the ship to the planet
        const vector = new Phaser.Math.Vector2(
            this.planet.body.x - this.ship.body.x,
            this.planet.body.y - this.ship.body.y
        );
        //const vector2 = new Phaser.Math.Vector2(
            //this.planet2.body.x - this.ship.body.x,
            //this.planet2.body.y - this.ship.body.y
        //);
        //vector.add(vector2)

        if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
          // Normalize and multiply by actual strength of gravity desired
          this.ship.body.gravity = vector.normalize().multiply(new Phaser.Math.Vector2(1000, 1000))
        } else {
          this.ship.body.gravity = vector.normalize().multiply(new Phaser.Math.Vector2(500, 500))
        }

        if (cursors.right.isDown) {
            this.ship.setVelocityX(this.ship.body.velocity.x + 1)
        } else if (cursors.left.isDown) {
            this.ship.setVelocityX(this.ship.body.velocity.x - 1)
        }

        if (cursors.up.isDown) {
            this.ship.setVelocityY(this.ship.body.velocity.y - 1)
        } else if (cursors.down.isDown) {
            this.ship.setVelocityY(this.ship.body.velocity.y + 1)
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: Demo,
};

const game = new Phaser.Game(config);
