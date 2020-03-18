Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}

let lanePos = [115, 160, 205];
let x = lanePos.randomElement();

class BaseScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.scrollSpeed = 200;
        this.fuelFallSpeed = 350;
        this.fuelDrain = 1;
        this.fuelRegain = 25;
        this.maxFuel = 48;
        this.maxScrollSpeed = 600;
        this.maxFuelFallSpeed = 950;
    }
    preload() {
        this.load.image('road', 'assets/png/level-1.png');
        this.load.image("player", "assets/png/car_player.png");

        //UI Load
        this.load.image("fuelBar", 'assets/png/fuel-bar-inner.png')

        //Item Loader
        this.load.image('gasCan', 'assets/png/item_gas.png')

    }
    create() {
        console.log(this.fuelFallSpeed)
        //Load Road
        this.road = this.physics.add.sprite(160, -205, "road");
        this.road2 = this.physics.add.sprite(160, 200, "road");
        //Load Player
        this.player = this.physics.add.sprite(162, 350, "player");
        this.player.setCollideWorldBounds(true)
        //Load Items
        this.gasCan = this.physics.add.sprite(x, 50, 'gasCan')
        this.gasCan.setScale(0.9)
        this.physics.add.overlap(this.gasCan, this.player, this.addFuel, null, this)
        this.physics.add.overlap(this.gasCan, this.player, this.disposeOfGasCan, null, this)

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
        this.fuelBar.bar = this.add.sprite(48, 24, 'fuelBar');
        this.fuelBar.bar.setScale(0.22)
        this.fuelBar.mask = this.add.sprite(this.maxFuel, 24, "fuelBar");
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
        this.fuelBar.bar.mask = new Phaser.Display.Masks.BitmapMask(this, this.fuelBar.mask);
    }
    update() {
        console.log(this.fuelFallSpeed)
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
        if (this.player.x >= 200) {} else if (this.input.activePointer.x >= 160 & this.input.activePointer.isDown) {
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
        if (this.scrollSpeed <= 0) {
            this.scene.pause()
        }

        if (this.fuelBar.mask.x >= this.maxFuel) {
            this.fuelBar.mask.x = this.maxFuel
        }

        //Speed Control
        if (this.scrollSpeed >= this.maxScrollSpeed) {
            this.scrollSpeed = this.maxScrollSpeed
        }

        if (this.fuelFallSpeed >= this.maxFuelFallSpeed) {
            this.fuelFallSpeed = this.maxFuelFallSpeed
        }


        //Gas Can Physics
        this.gasCan.setVelocityY(this.fuelFallSpeed);
        if (this.gasCan.y > 400) {
            x = lanePos.randomElement();
            this.gasCan.x = x
            this.gasCan.y = (Math.random() * -1000) - 2100;
        }
    }
    //adds drain to the fuel bar and when empty slows the player down
    updateFuelBar() {
        this.fuelBar.mask.x -= this.fuelDrain;
        if (this.fuelBar.mask.x <= -47) {
            this.scrollSpeed -= 20;
        }
    }
    //Adds fuel to fuel bar and then calls the dispose of fuel function
    addFuel() {
        this.fuelBar.mask.x += this.fuelRegain
    }

    updateTimeScore() {
        this.timeScore++;
        //Update score text to reflect time
        this.textTimeScore.setText("" + this.timeScore);

        //Changes the Speed dependant on the Time played
        if ((this.timeScore % this.speedIncreaseInterval) == 0) {
            this.scrollSpeed += 50;
            this.fuelFallSpeed += 75;
        }
        //Updates the minute and resets the seconds back to  
        if (this.timeScore === 60) {
            this.timeScore = 0
            this.minuteScore++
            this.textMinuteTimeScore.setText("Timer: " + this.minuteScore + " :")
        }
    }
    //Makes gas can invisible when it hits the player
    disposeOfGasCan(gasCan) {
        x = lanePos.randomElement();
        this.gasCan.x = x
        this.gasCan.y = (Math.random() * -1100) - 2100;

    }
}