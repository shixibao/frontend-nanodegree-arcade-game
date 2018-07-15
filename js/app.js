// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here, 应用到我们每个实例的变量
    // we've provided one for you to get started 我们已经为你提供了一个开始

    // The image/sprite for our enemies, this uses 
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game 更新敌人的位置，需要游戏方法
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter 你应该用DT参数乘以任何时刻。
    // which will ensure the game runs at the same speed for
    // all computers. 这将确保游戏在所有计算机上以相同的速度运行。
    this.x += dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if(this.x >= 505) {
        this.x = 0;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.checkCollision(player);
};

// 检测碰撞
Enemy.prototype.checkCollision = function (player) {
    if(Math.abs(this.x - player.x) < 50 && this.y == player.y) {
        player.x = 202;
        player.y = 83 * 3 + 55;
    } else {
        console.log('没撞')
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}
// 更新玩家的位置
Player.prototype.update = function() {
    if(this.y < 55) {
        alert('游戏胜利！');
    }
    if(this.y < 55 || this.y > 83 * 5 + 55 || this.x < 0 || this.x >= 505) {
        this.x = 202;
        this.y = 83 * 3 + 55;
    }
}
// 渲染玩家角色
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(e, keyCodeType) {
    switch (keyCodeType) {
        case 'left':
            this.x -= 101;
            break;
        case 'up':
            // 阻止按向上键滚动网页
            e.preventDefault ? e.preventDefault() : reuturn = false;
            this.y -= 83;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'down':
            // 阻止按向下键滚动网页
            e.preventDefault ? e.preventDefault() : reuturn = false;
            this.y += 83;
            break;
        default:
            break;
    }
}
// Now instantiate your objects. 现在实例化你的对象。
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(22, 83 * 0 + 55, 30), new Enemy(21, 83 * 0 + 55, 150), // row 1
    new Enemy(57, 83 * 1 + 55, 50), new Enemy(20, 83 * 1 + 55, 100), // row 2
    new Enemy(22, 83 * 2 + 55, 15), new Enemy(59, 83 * 2 + 55, 120)]  // row 3];

var player = new Player(202, 83 * 3 + 55);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(e, allowedKeys[e.keyCode]);
});