class BaseScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.scrollSpeed = 200
    }
    preload() {
        this.load.image('road', 'assets/png/level-1.png');
        this.load.image("player", "assets/png/car_player.png");

        //UI Load
        this.load.image("fuelBar", 'assets/png/fuel-bar-inner.png');
        this.load.image('fuelOutline', 'assets/png/fuel-bar-outer.png', )

    }
    create() {
        //Load Road
        this.road = this.physics.add.sprite(160, -205, "road");
        this.road2 = this.physics.add.sprite(160, 200, "road");
        //Load Player
        this.player = this.physics.add.sprite(162, 350, "player");
        this.player.setCollideWorldBounds(true)
        //Load Fuel
        this.add.text(5, 3, 'Fuel:', {
            font: '15px Arial'
        });
        this.fuelBar = {};
        this.fuelBar.outline = this.add.sprite(48, 24, 'fuelOutline');
        this.fuelBar.outline.setScale(0.22)
        this.fuelBar.bar = this.add.sprite(48, 24, 'fuelBar');
        this.fuelBar.bar.setScale(0.22)
        this.fuelBar.mask = this.add.sprite(this.fuelBar.bar.x, this.fuelBar.bar.y, "fuelBar");

        //Timer
        this.time.addEvent({delay:1, callback:this.updateFuelBar, callbackScope: this, repeat: -1 });

    }


    update() {
        //Road Movement
        this.road.setVelocityY(this.scrollSpeed)
        this.road2.setVelocityY(this.scrollSpeed)
        if (this.road.body.y > 405) {
            this.road.body.y = -405
        }
        if (this.road2.body.y > 405) {
            this.road2.body.y = -405
        }
        //Player Controls and Collision with Path
        if (this.player.x >= 207) {} else if (this.input.activePointer.x >= 160 & this.input.activePointer.isDown) {
            this.player.body.x += 45
            if (this.input.activePointer.isDown = false) {
                this.player.body.x = 0
            }
        }

        if (this.player.x <= 160) {} else if (this.input.activePointer.x <= 159 & this.input.activePointer.isDown) {
            this.player.body.x -= 45
            if (this.input.activePointer.isDown = false) {
                this.player.body.x = 0
            }
            // //Speed Controler
            // if(this.scrollSpeed <= 1){
            //     this.scrollSpeed = 0
            // }

            // if(this.scrollSpeed >= 400){SW
            //     this.scrollSpeed = 400
            // }

            
        }
        //Fuel Bar Controler
        this.fuelBar.mask.visible = false;
        this.fuelBar.mask.offSet = 100;
        this.fuelBar.bar.mask = new Phaser.Display.Masks.BitmapMask(this, this.fuelBar.mask);
    }

    updateFuelBar() {
        // this.fuelBar.mask.offSet = this.fuelBar.bar.width - (0.2)
        // this.fuelBar.mask.x = this.fuelBar.bar.x - this.fuelBar.mask.offSet;
        this.fuelBar.mask.x -= 1;
        console.log(this.fuelBar.mask);
    }

}