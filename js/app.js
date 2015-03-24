"use strict";
// Enemies our player must avoid
var Enemy = function() {
	// Initial x coordinate
	this.x = -101;
	// Initial y coordinate determined by one of 3 possible rows
	// Row assigment based on random generation
	this.y = -27 + Math.floor((Math.random() * 3) + 1) * 83;
	// Pace determined at object initiation in the range 80 to 240
	this.pace = Math.random() * 160 + 80;
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// Movement multiplied by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x = this.x + this.pace * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Player = function() {
	this.x = 202;
	this.y = 390;
	this.sprite = 'images/char-boy.png';
	// Initial game Status set to Welcome, i.e. display message
	this.gameStatus = "Welcome";
};

// collision detection relating to this update method is handled in engine.js update method
Player.prototype.update = function(dt) {
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Timeout function to change game status
Player.prototype.changeStatus = function() {
	var temp = this;
	setTimeout(function() {
		temp.gameStatus = 'playing';
	}, 1500);
};

// Handles player's input
Player.prototype.handleInput = function(clicked_button) {
	switch(clicked_button) {
	case 'up':
		if (this.y - 83 >= 0) {
			this.y = this.y - 83;
		} else {
			this.gameStatus = "Well done!";
			this.changeStatus();
			this.x = 202;
			this.y = 390;
		}
		break;
	case 'down':
		if (this.y + 83 <= 390) {
			this.y = this.y + 83;
		}
		break;
	case 'left':
		if (this.x - 101 >= 0) {
			this.x = this.x - 101;
		}
		break;
	case 'right':
		if (this.x + 101 <= 404) {
			this.x = this.x + 101;
		}
		break;
	}
};

// Objects instantiation
// all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy_instance = new Enemy();
allEnemies.push(enemy_instance);

// Function triggered every 1s to maintain enemies
setInterval(function() {
	// Random addition of new enemies + restriction to 5 enemies max
	if (Math.random() > 0.5 && allEnemies.length < 5) {
		var enemy_instance = new Enemy();
		allEnemies.push(enemy_instance);
	}
	// Removal of enemies that went out of display area
	for (var i = allEnemies.length - 1; i >= 0; i--) {
		if (allEnemies[i].x >= 505) {
			allEnemies.splice(i, 1);
		}
	}
}, 800);

// The player object in a variable called player
var player = new Player();
// Welcome status to be changed by changeStatus method
player.changeStatus();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37 : 'left',
		38 : 'up',
		39 : 'right',
		40 : 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});