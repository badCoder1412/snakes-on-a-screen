let snake;
const rez = 20;
let food;
let w;
let h;
let dirs;

function setup() {
	let c = createCanvas(windowWidth, windowHeight);
	c.position(0,0);
	w = floor(windowWidth / rez);
	h = floor(windowHeight / rez);
	frameRate(5);
	class Snake {

	constructor() {
		this.body = [];
		this.head = createVector(floor(w / 2), floor(h / 2));
		this.dir = createVector(0, 0);
	}

	setDir(dir) {
		this.dir = dir;
	}

	update(food) {
		this.body.push(this.head.copy());
		this.head.add(this.dir);
		if (this.head.x === food.x && this.head.y === food.y) {
			return true; // yum!
		}
		this.body.shift();
		return false;
	}

	endGame() {
		let x = this.head.x;
		let y = this.head.y;
		if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
			return true;
		}
		for (let part of this.body) {
			if (part.x == x && part.y == y) {
				return true;
			}
		}
		return false;
	}


	show() {
		fill('rgb(0, 255, 0)');
		noStroke();
		for (let part of this.body) {
			rect(part.x, part.y, 1, 1);
		}
		fill(0, 30, 0);
		rect(this.head.x, this.head.y, 1, 1);
	}

}
	snake = new Snake();
	
	dirs = {
		[LEFT_ARROW]: createVector(-1, 0),
		[RIGHT_ARROW]: createVector(1, 0),
		[DOWN_ARROW]: createVector(0, 1),
		[UP_ARROW]: createVector(0, -1)
	};
	
	foodLocation();
	clear();
}

function foodLocation() {
	let x = floor(random(w));
	let y = floor(random(h));
	food = createVector(x, y);
}

function keyPressed() {
	var dir = dirs[keyCode];
	if (dir) {
		snake.setDir(dir);
	}
}

function draw() {
	scale(rez);
	// background(0);
	if (snake.update(food)) {
		foodLocation();
	}
	clear();
	snake.show();
	if (snake.endGame()) {
		print("END GAME");
		background(255, 0, 0);
		noLoop();
	}

	noStroke();
	fill(255, 0, 0);
	rect(food.x, food.y, 1, 1);
	chrome.runtime.onMessage.addListener(
		function (request, sender, sendResponse) {
			if (request.message === "newgame") {
				console.log('newgame');
				// sendResponse({ farewell: "userwantsanewgame" });
				// function to start the game again
				clear();
				loop();
			}
			if (request.message === "highscore") {
				console.log('highscore')
				// sendResponse({ farewell: "highscore" });
				// function to display highscore
			}
			if (request.message === "exit") {
				// console.log('exit')
				// sendResponse({ farewell: "exit" });
				// function to exit
				exit();
			}
		}
	);
}

const exit = ()=>{
	remove();
}

const startnewgame = () => {
	
}