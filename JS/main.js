class Player {
    constructor (){
        this.width = 57;
        this.height = 80;
        this.positionX = 47.5;
        this.positionY = 47.5;
        this.gravity = 0.9;
        this.playerElm = document.getElementById('player');
        
        this.playerElm.style.width = this.width + 'px';
        this.playerElm.style.height = this.height + 'px';
        this.playerElm.style.left = this.positionX + 'px';
        this.playerElm.style.bottom = this.positionY + 'px';

        this.isGrounded = true;
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
        let originalPos = this.positionY
        if (this.isJumping === false){
            let timerJump = setInterval(() => {
                if(this.positionY > originalPos + 100) {
                    this.isGrounded = false;
                    clearInterval(timerJump);
                    this.fall();
                } else {
                    this.isJumping = true;
                    this.positionY = (this.positionY + 25) * this.gravity;
                    this.playerElm.style.bottom = this.positionY + 'px';
                }
            }, 20)
        }
    }
    fall (){
        let timerFall = setInterval(()=> {
            if (this.positionY <= 47.5){
                this.isGrounded = true;
                this.isJumping = false
                clearInterval(timerFall);
            } else {
                this.positionY = this.positionY - 20;
                this.playerElm.style.bottom = this.positionY + 'px';
            }
        }, 20)
    }
}

class Obstacles {
    constructor (){
    }
}


let exitElements = document.querySelectorAll('.door');
let exitArr = [...exitElements];
//let exitPositionX = 902.5 - exitElements[0].offsetTop
let exitPositionX = 902.5 - exitElements[0].offsetHeight - exitElements[0].offsetTop
let exitPositionY = exitElements[0].offsetLeft
let exitWidth = exitElements[0].offsetWidth
let exitHeigth = exitElements[0].offsetHeight

class Exit {
    constructor (){
        this.exitElements = document.querySelectorAll('.door');
        this.exitArr = [...exitElements]
        this.positionX = exitElements[0].offsetTop;
        this.positionY = exitArr;
    }
}
console.log(Exit.exitElements)
console.log(exitElements)
console.log(exitArr)
console.log(Exit.exitArr)
console.log(exitWidth)
console.log(exitHeigth)
console.log('x ' + exitPositionX)

class Game {
    constructor() {
        this.player = null
        this.groundElm = document.querySelectorAll('.ground')
        this.wallElm = document.querySelectorAll('.side')
        this.obstacleElm = document.querySelectorAll('.tile')
        this.exitElm = Exit
        
        this.timeExit;
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
        this.timeExit = setInterval(() => {
            this.detectExit()
            console.log('check')
        },20000)
    }
    detectExit(){
        console.log(this.player.positionX)
        console.log(this.player.positionY)
        console.log('x ' + exitPositionX)
        console.log('y ' +exitPositionY)
        console.log(this.player.positionX < exitPositionX + exitWidth)
        console.log(this.player.positionX + this.player.width > exitPositionX)
        console.log(this.player.positionY < exitPositionY + exitHeigth)
        console.log(this.player.height + this.player.positionY > exitPositionY)
        if (
            this.player.positionX <= exitPositionX + exitWidth &&
            this.player.positionX + this.player.width >= exitPositionX &&
            this.player.positionY <= exitPositionY + exitHeigth &&
            this.player.height + this.player.positionY >= exitPositionY
          ){
            console.log('exit to next level')
          } 
    } 
}




const game = new Game();
game.start(); 
