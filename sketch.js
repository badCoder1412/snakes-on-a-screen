console.log('sketch.js is runnning')
const s = (p) => {
	let snake;
	const rez = 20;
	let food;
	let w;
	let h;
	let dirs;

	function foodLocation() {
		let x = p.floor(p.random(w));
		let y = p.floor(p.random(h));
		food = p.createVector(x, y);
	}

	p.setup = function() {
		let c = p.createCanvas(p.windowWidth, p.windowHeight);
		c.position(0, 0);
		w = p.floor(p.windowWidth / rez);
		h = p.floor(p.windowHeight / rez);
		p.frameRate(5);

		class Snake {

			constructor() {
				this.body = [];
				this.head = p.createVector(p.floor(w / 2), p.floor(h / 2));
				this.dir = p.createVector(0, 0);
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
				p.fill('rgb(0, 255, 0)');
				p.noStroke();
				for (let part of this.body) {
					p.rect(part.x, part.y, 1, 1);
				}
				p.fill(0, 30, 0);
				p.rect(this.head.x, this.head.y, 1, 1);
			}

		}
		snake = new Snake();

		dirs = {
			[p.LEFT_ARROW]: p.createVector(-1, 0),
			[p.RIGHT_ARROW]: p.createVector(1, 0),
			[p.DOWN_ARROW]: p.createVector(0, 1),
			[p.UP_ARROW]: p.createVector(0, -1)
		};

		foodLocation();
		p.clear();
	}

	p.keyPressed = function() {
		var dir = dirs[p.keyCode];
		if (dir) {
			snake.setDir(dir);
		}
	}
	p.draw = function() {

			p.scale(rez);
			// background(0);
			if (snake.update(food)) {
				foodLocation();
			}
			p.clear();
			snake.show();
			if (snake.endGame()) {
				p.print("END GAME");
				p.background(255, 0, 0);
				p.noLoop();
			}

			p.noStroke();
			p.fill(255, 0, 0);
			p.rect(food.x, food.y, 1, 1);
			chrome.runtime.onMessage.addListener(
				function (request, sender, sendResponse) {
					// if (request.message === "newgame") {

					// 	// sendResponse({ farewell: "userwantsanewgame" });
					// 	// function to start the game again
					// 	// p.clear();
					// 	// loop();
					// }
					if (request.message === "highscore") {
						console.log('highscore')
						// sendResponse({ farewell: "highscore" });
						// function to display highscore
					}
					if (request.message === "exit") {
						// console.log('exit')
						// sendResponse({ farewell: "exit" });
						// function to exit
						// remove();
						p.noLoop();
						setTimeout(() => {
							p.clear();
							p.remove();
						}, 300);
					}
				}
			);
		};
};


const exit = ()=>{
	remove();
}

const startnewgame = () => {
	
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
	if(request.message === 'newgame'){	
	console.log('newgame');
	new p5(s);
	}
});