class BaseScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.scrollSpeed = 200
    }
    preload() {
        this.load.image('road', 'assets/png/level-1.png')
        this.load.image("player", "assets/png/car_player.png")
    }
    create() {
        //Load Road
        this.road = this.physics.add.sprite(160, -205, "road")
        this.road2 = this.physics.add.sprite(160, 200, "road")
        //Load Player
        this.player = this.physics.add.sprite(105-10, 350, "player")
        this.player.setCollideWorldBounds(true)
        //Movement
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        //Road Movement
        this.road.setVelocityY(this.scrollSpeed)
        this.road2.setVelocityY(this.scrollSpeed)
        if(this.road.body.y > 405){
            this.road.body.y = -405
        }
        if(this.road2.body.y > 405){
            this.road2.body.y = -405
        }
        //Player Controls
        if(this.cursors.left.isDown){
            this.player.body.x -= 5
        }
        if(this.cursors.right.isDown){
            this.player.body.x+= 5
        }
        if(this.cursors.up.isDown){
            this.player.body.y-= 5
        }
        if(this.cursors.down.isDown){
            this.player.body.y+= 3
        }
    }
}