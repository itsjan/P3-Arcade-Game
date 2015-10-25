var Y_OFFSET = -25;  // adjust sprite position within tile
var NUM_OF_ENEMY_ROWS = 3; // there are three rows of paved blocks
var MIN_ENEMY_SPEED = 100; // enemy speed is at least 100 units
var VARIABLE_ENEMY_SPEED = 250; //max num of speed units to be added to min speed
var MIN_GEM_LIFE = 50;
var MAX_GEM_LIFE = 100;
var ROW_HEIGHT = 83; // height of one row in pixels, used to calculate sprite y pos
var COL_WIDTH = 101; // width of one column, used to calculate sprite x pos
// screen row/col boundaries
var FIRST_ROW = 1;
var LAST_ROW = 6;
var FIRST_COL = 1;
var LAST_COL = 5;

/* GEM
 * A gem appears on the play field at random times.
 * The player will get points for standing on the gem.
 */

var Gem = function ()
{
    // gem can be off-canvas/invisible at random times (LAST_ROW + 2)
    this.row = Math.ceil(Math.random() * LAST_ROW + 2);
    while (this.row === player.row)
    {
        this.row = Math.ceil(Math.random() * LAST_ROW + 2);
    }
    this.col = Math.ceil(Math.random() * LAST_COL - 1);
    this.x = (this.col - 1) * COL_WIDTH;
    this.y = (this.row - 1) * ROW_HEIGHT + Y_OFFSET;
    var index = Math.ceil(Math.random() * this.gems.length - 1);

    this.sprite = this.gems[index];
    this.score = this.scores[index];
    this.lifetime = Math.ceil(Math.random() * MAX_GEM_LIFE + MIN_GEM_LIFE);
    if (this.row <= LAST_ROW) {
        this.visible = true;
    }
};

Gem.prototype.gems = ["images/Gem Blue.png",
    "images/Gem Green.png",
    "images/Gem Orange.png"];
Gem.prototype.scores = [2, 4, 8];

Gem.prototype.update = function (dt) {
    this.lifetime--;
    if (this.lifetime < 0)
    {
        this.visible = false;
        gem = new Gem();
    }
    if (this.visible && this.row === player.row && this.col === player.col)
    {
        game.score += gem.score;
    }
};

Gem.prototype.render = function () {
    if (this.visible)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

/*
 *   ENEMY
 *   Getting hit by an enemy will reduce one life,
 *   player is reset to the starting position
 */
var Enemy = function (row, speed) {
    this.sprite = "images/enemy-bug.png";
    this.reset();
    this.row = row;
};

Enemy.prototype.reset = function () {
    // enemy enters from the left
    this.x = 0;
    // randomize row 1 - 3
    this.row = Math.ceil(Math.random() * NUM_OF_ENEMY_ROWS) + 1;
    // calculate y, adjust by 25
    this.y = ((this.row - 1) * ROW_HEIGHT) + Y_OFFSET;
    // randomize speed
    this.speed = MIN_ENEMY_SPEED + Math.ceil(Math.random() * VARIABLE_ENEMY_SPEED);
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > 505)
    {
        //enemy moved off screen
        this.reset();
    }
    // advance enemy
    this.x = this.x + (this.speed * dt);

    // Collide test -->
    if (this.row === player.row &&
            player.x < this.x + COL_WIDTH &&
            player.x + COL_WIDTH > this.x )
    {
        game.lives--;
        player.reset();
        game.reset();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 *  PLAYER
 *  Player will try to avoid enemies.
 *  Reaching the water will add one life.
 *  Game is over when zero lives remain.
 */
var Player = function () {
    this.reset();
    this.charSelect = 3;
    this.sprite = "images/char-boy.png";
};

Player.prototype.reset = function () {
    this.row = 6;
    this.col = 3;

};

Player.prototype.update = function (dt) {

    if (this.row === 1) {
        // player reached the water
        game.lives++;
        this.reset();
    }

    this.x = (this.col - 1) * COL_WIDTH;
    this.y = (this.row - 1) * ROW_HEIGHT;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y + Y_OFFSET);
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        // for each key press, adjust row/column
        // and prevent player moving off the screen
        case "up":
            this.row--;
            if (this.row < FIRST_ROW)
                this.row = FIRST_ROW;
            break;
        case "down":
            this.row++;
            if (this.row > LAST_ROW)
                this.row = LAST_ROW;

            break;
        case "left":
            this.col--;
            if (this.col < FIRST_COL)
                this.col = FIRST_COL;
            break;
        case "right":
            this.col++;
            if (this.col > LAST_COL)
                this.col = LAST_COL;
            break;
        case "enter": // starts the game
            if (game.stage === game.S_GAMEOVER || game.stage === game.S_SELECT_CHAR) {
                player.reset();
                game = new Game();
            }
            break;
        case "s": // allows the user to select the player character
            player.col = player.charSelect + 1;
            game.stage = game.S_SELECT_CHAR;
            break;
    }

};

/*
 * GAME
 * Maintains game state
 */

var Game = function () {
    // constants for game stages
    this.S_PLAY = 1;
    this.S_SELECT_CHAR = 2;
    this.S_GAMEOVER = 3;

    this.stage = this.S_PLAY;
    this.score = 0;
    this.lives = 3;
};

Game.prototype.update = function () {

    if (this.score > highscore)
        highscore = this.score;
};

Game.prototype.reset = function () {
    if (this.lives <= 0) {
        player.col = player.charSelect + 1;
        this.stage = this.S_GAMEOVER;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var game = new Game();
var highscore = 0;

game.stage = game.S_SELECT_CHAR;

var allEnemies = [];

allEnemies[0] = new Enemy(2);
allEnemies[1] = new Enemy(3);
allEnemies[2] = new Enemy(4);

var player = new Player();
var gem = new Gem();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter',
        83: 's'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
