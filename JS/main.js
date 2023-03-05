class Player {
  constructor(position) {
    let game = document.querySelector(".game");
    let player = document.createElement("player");
    player.classList.add("player");
    game.appendChild(player);

    this.width = 57;
    this.height = 80;
    this.positionX = position.positionX;
    this.positionY = position.positionY;

    this.playerElm = document.querySelector(".player");

    this.playerElm.style.width = this.width + "px";
    this.playerElm.style.height = this.height + "px";
    this.playerElm.style.left = this.positionX + "px";
    this.playerElm.style.bottom = this.positionY + "px";

    this.gravity = 0.95;

    this.isGrounded = true;
    this.isJumping = false;
    this.isGoingRight = false;
    this.timeGoingRight;
    this.isGoingLeft = false;
    this.timeGoingLeft;
  }
  moveRight() {
    if (this.isGoingLeft) {
      clearInterval(this.timeGoingLeft);
      this.isGoingLeft = false;
    }
    if (this.isGoingRight === false) {
      this.isGoingRight = true;
      this.timeGoingRight = setInterval(() => {
        this.positionX -= 2;
        this.playerElm.style.left = this.positionX + "px";
      }, 0);
    }
  }
  moveLeft() {
    if (this.isGoingRight) {
      clearInterval(this.timeGoingRight);
      this.isGoingRight = false;
    }
    if (this.isGoingLeft === false) {
      this.isGoingLeft = true;
      this.timeGoingLeft = setInterval(() => {
        this.positionX += 2;
        this.playerElm.style.left = this.positionX + "px";
      }, 0);
    }
  }
  stop() {
    clearInterval(this.timeGoingRight);
    clearInterval(this.timeGoingLeft);
    this.isGoingLeft = false;
    this.isGoingRight = false;
  }
  jump() {
    if (this.isJumping === false) {
      let originalPos = this.positionY;
      let timerJump = setInterval(() => {
        if (this.positionY > originalPos + 100) {
          this.isGrounded = false;
          clearInterval(timerJump);
          this.fall();
        } else {
          this.isJumping = true;
          this.positionY = (this.positionY + 10) * this.gravity;
          this.playerElm.style.bottom = this.positionY + "px";
        }
      }, 0);
    }
  }
  fall() {
    let timerFall = setInterval(() => {
      if (this.positionY <= 47) {
        this.isGrounded = true;
        this.isJumping = false;
        clearInterval(timerFall);
      } else {
        this.positionY = this.positionY - 1;
        this.playerElm.style.bottom = this.positionY + "px";
      }
    }, 0);
  }
}

class Map {
  constructor(style, map) {
    let body = document.querySelector("body");
    let game = document.createElement("game");
    game.classList.add("game");
    game.classList.add(style);
    body.appendChild(game);

    map.forEach((element) => {
      console.log(element);
      let game = document.querySelector(".game");
      let platforms = document.createElement("platorms");
      platforms.classList.add("platforms");
      platforms.classList.add(style);
      platforms.classList.add(`plat${map.indexOf(element)}`);
      game.appendChild(platforms);

      let platformsElm = document.querySelector(`.plat${map.indexOf(element)}`);

      platformsElm.style.gridColumnStart = element.columnStart;
      platformsElm.style.gridColumnEnd = element.columnEnd;
      platformsElm.style.gridRow = element.row;
    });
  }
}

class Walls {
  constructor(style) {
    let game = document.querySelector(".game");
    let wallsL = document.createElement("wallsL");
    wallsL.classList.add("walls");
    wallsL.classList.add("L");
    wallsL.classList.add(style);
    game.appendChild(wallsL);

    let wallsLElm = document.querySelector(".L");

    wallsLElm.style.gridColumn = 1;
    wallsLElm.style.gridRowStart = 1;
    wallsLElm.style.gridRowEnd = 20;

    let wallsR = document.createElement("wallsR");
    wallsR.classList.add("walls");
    wallsR.classList.add("R");
    wallsR.classList.add(style);
    game.appendChild(wallsR);

    let wallsRElm = document.querySelector(".R");

    wallsRElm.style.gridColumn = 40;
    wallsRElm.style.gridRowStart = 1;
    wallsRElm.style.gridRowEnd = 20;
  }
}

class Exit {
  constructor(position) {
    let game = document.querySelector(".game");
    let exit = document.createElement("exit");
    exit.classList.add("exit");
    game.appendChild(exit);

    let exitElm = document.querySelector("exit");

    exitElm.style.gridColumn = position.column;
    exitElm.style.gridRowStart = position.rowTop;
    exitElm.style.gridRowEnd = position.rowBot;
    console.log(exitElm);
    console.log(exitElm.offsetTop);

    this.width = 47;
    this.height = 94;
    this.positionX = 893 - exitElm.offsetTop - this.height;
    console.log(this.positionX);
    this.positionY = exitElm.offsetLeft;
    console.log(this.positionY);
  }
}

class Game {
  constructor(level) {
    this.level = level[0];
    this.levelStyle = level[1];
    this.playerElm = level[2];
    this.mapElm = level[3];
    this.exitElm = level[4];
    console.log(level);
    this.player;
    this.exit;
    this.walls;
    this.map;
  }
  attachEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "d") {
        this.player.moveLeft();
      } else if (e.key === "q") {
        this.player.moveRight();
      } else if (e.key === "z") {
        this.player.jump();
      } else if (e.key === "s") {
        this.player.stop();
      }
    });
  }
  start() {
    this.map = new Map(this.levelStyle, this.mapElm);
    this.walls = new Walls(this.levelStyle);
    this.player = new Player(this.playerElm);
    this.exit = new Exit(this.exitElm);

    this.attachEventListeners();
    this.timeExit = setInterval(() => {
      this.detectExit();
    }, 10);
  }
  detectExit() {
    if (
      this.player.positionX < this.exit.positionX + this.exit.width &&
      this.player.positionX + this.player.width > this.exit.positionX &&
      this.player.positionY < this.exit.positionY + this.exit.height &&
      this.player.height + this.player.positionY > this.exit.positionY
    ) {
      console.log("exit to next level");
    }
  }
}

let level1 = [
  "Level 1",
  "grass",
  {
    positionX: 47,
    positionY: 47,
  },
  [
    {
      columnStart: 2,
      columnEnd: 40,
      row: 19,
    },
    {
      columnStart: 2,
      columnEnd: 40,
      row: 1,
    },
    {
      columnStart: 16,
      columnEnd: 40,
      row: 18,
    },
    {
      columnStart: 2,
      columnEnd: 13,
      row: 15,
    },
    {
      columnStart: 16,
      columnEnd: 40,
      row: 12,
    },
    {
      columnStart: 2,
      columnEnd: 13,
      row: 9,
    },
    {
      columnStart: 16,
      columnEnd: 40,
      row: 6,
    },
  ],
  {
    column: 28,
    rowTop: 17,
    rowBot: 19,
  },
];

const game = new Game(level1);
game.start();
