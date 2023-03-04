class Player {
    constructor (){
        this.width = 57;
        this.height = 80;
        this.positionX = 0;
        this.positionY = 0;
        this.gravity = 0.9;
        this.playerElm = document.getElementById('player');
        
        this.playerElm.style.width = this.width + 'px';
        this.playerElm.style.height = this.height + 'px';
        
        this.isJumping = false;
        this.isGoingRight = false;
        this.timeGoingRight;
        this.isGoingLeft = false;
        this.timeGoingLeft;
    }
    moveRight(){
        if (this.isGoingLeft){
            clearInterval(this.timeGoingLeft)
            this.isGoingLeft = false;
        };
        if (this.isGoingRight === false) {this.isGoingRight = true
        this.timeGoingRight = setInterval (() => {    
            this.positionX-= 5;
            this.playerElm.style.left = this.positionX + 'px';
        }, 0)}
    }
    moveLeft(){
        if (this.isGoingRight){
            clearInterval(this.timeGoingRight)
            this.isGoingRight = false;
        };
        if (this.isGoingLeft === false) {this.isGoingLeft = true
        this.timeGoingLeft = setInterval (() => {  
            this.positionX+= 5;
            this.playerElm.style.left = this.positionX + 'px';
        }, 0)}
    }
    stop() {
        clearInterval(this.timeGoingRight)
        clearInterval(this.timeGoingLeft)
        this.isGoingLeft = false;
        this.isGoingRight = false;
    }
    jump (){
        if (this.isJumping === false){
            let timerJump = setInterval(() => {
                if(this.positionY > 100) {
                    clearInterval(timerJump)
                    let timerJumpDown = setInterval(() => {
                        if (this.positionY <= 0) {
                            clearInterval(timerJumpDown)
                            this.isJumping = false
                        } else {
                            this.positionY -= 1;
                            this.playerElm.style.bottom = this.positionY + 'px';
                        }
                    }, 0) 
                } else {
                    this.isJumping = true
                    this.positionY = (this.positionY + 25) * this.gravity;
                    this.playerElm.style.bottom = this.positionY + 'px';
                }
            }, 20)
        }
    }
}

class Obstacles {
    constructor (){
        this.groundElm = document.querySelectorAll('.ground')
        this.wallElm = document.querySelectorAll('.side')
        this.obstacleElm = document.querySelectorAll('.tile')
    }
}

class Exit {
    constructor (){
        this.ExitElm = document.querySelectorAll('.door')
    }
}

class Game {
    constructor() {
        this.player = null
        //this.
    }  
    attachEventListeners() {
        document.addEventListener("keydown", (e) => {
            if (e.key === 'd') {
                this.player.moveLeft();
            } else if (e.key === 'q') {
                this.player.moveRight();
            } else if (e.key === 'z') {
                this.player.jump();
            } else if (e.key === 's') {
                this.player.stop();
            }
        });
    }
    start() {
        this.player = new Player();

        this.attachEventListeners();

    }
    detectCollision(element){
        if (
            this.player.positionX < element.positionX + element.width &&
            this.player.positionX + this.player.width > element.positionX &&
            this.player.positionY < element.positionY + element.height &&
            this.player.height + this.player.positionY > element.positionY
          ){}
    }
}




const game = new Game();
game.start();