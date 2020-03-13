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

        //Time Score
        this.textTimeScore = this.add.text(config.width - 45, 3, '0', {
            font: '15px Arial'
        });

        this.textMinuteTimeScore = this.add.text(config.width - 110, 3, 'Timer: 0 :', {
            font: '15px Arial'
        });

        this.timeScore = 0;
        this.minuteScore = 0;
        this.speedIncreaseInterval = 5;

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
        this.fuelBar.mask.setScale(0.22);

        //Tick Timers
        this.time.addEvent({
            delay: 200,
            callback: this.updateFuelBar,
            callbackScope: this,
            repeat: -1
        });
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimeScore,
            callbackScope: this,
            repeat: -1
        });

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
        }
        //Fuel Bar Controler
        this.fuelBar.mask.visible = false;
        this.fuelBar.bar.mask = new Phaser.Display.Masks.BitmapMask(this, this.fuelBar.mask);
    }

    updateFuelBar() {
        this.fuelBar.mask.x -= 1;
    }

    updateTimeScore() {
        this.timeScore++;
        //Update score text to reflect time
        this.textTimeScore.setText("" + this.timeScore);

        //Changes the Speed dependant on the Time played
        if ((this.timeScore % this.speedIncreaseInterval) == 0) {
            this.scrollSpeed += 50;
        }
        //Updates the minute and resets the seconds back to  
        if (this.timeScore === 60) {
            this.timeScore = 0
            this.minuteScore++
            this.textMinuteTimeScore.setText("Timer: " + this.minuteScore + " :")
        }
    }

}