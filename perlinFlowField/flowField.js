let increment = .1;
let scale = 10;
let cols, rows;
let zOffset = 0;
let particles = new Array(500);
let flowField = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
	background(0);
	noiseSeed(12);

	cols = floor(width / scale);
	rows = floor(height / scale);

	flowField = new Array(cols * rows);

	for (let i = 0; i < particles.length; i++) {
		particles[i] = new Particle();
	}
}

function draw() {
	let xOffset = 0;
	for (let x = 0; x < cols; x++) {
		let yOffset = 0;
		for (let y = 0; y < rows; y++) {
			let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 4;
			let index = x + y * cols;
			let v = p5.Vector.fromAngle(angle);

			v.setMag(random(10));
			flowField[index] = v;
			yOffset += increment;
		}
		xOffset += increment;
		zOffset += increment * 0.0001;
	}
	

	for (let i = 0; i < particles.length; i++) {
		particles[i].follow(flowField);
		particles[i].update();
		particles[i].edges();
		// particles[i].updatePrevPos();
		particles[i].display();
	}

}

function Particle() {
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.maxSpeed = random(1, 6);
	// this.prevPos = this.pos.copy();
	this.thickness = 1;

	this.follow = function(vectors) {
		// get the grid section for each vector
		let x = floor(this.pos.x / scale);
		let y = floor(this.pos.y / scale);
		// get the index of a given grid/cell
		let index = x + y * cols;
		let force = vectors[index];
		this.applyForce(force);
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.thickness = this.vel.x + this.vel.y * .0001;
	}

	// all this prevPos stuff seems to be no different than without. cut it? 
	// this.updatePrevPos = function() {
	// 	this.prevPos.x = this.pos.x;
	// 	this.prevPos.y = this.pos.y;
	// }

	this.edges = function() {
		if (this.pos.x > width) {
			this.pos.x = 0;
			// this.updatePrevPos();
		}

		if (this.pos.y > height) {
			this.pos.y = 0;
			// this.updatePrevPos();
		}

		if (this.pos.x < 0) {
			this.pos.x = width;
			// this.updatePrevPos();
		}

		if (this.pos.y < 0) {
			this.pos.y = height;
			// this.updatePrevPos();
		}
	}

	this.display = function() {
		let xScaled = map(this.pos.x, 0, width, 0, 127);
		let yScaled = map(this.pos.y, 0, height, 0, 127);
		let variation = random(-10, 10);

		stroke(xScaled + variation, 0 + variation, yScaled + variation, xScaled + yScaled * .001);
		strokeWeight(this.thickness);
		// line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		// line(width - this.prevPos.x, height - this.prevPos.y, width - this.pos.x, height - this.pos.y);
		// this.updatePrevPos();

		// point(this.pos.x, this.pos.y);
		// point(width - this.pos.x, height - this.pos.y);

		line(this.pos.x, this.pos.y, this.pos.x, this.pos.y);
		line(width - this.pos.x, height - this.pos.y, width - this.pos.x, height - this.pos.y);
	}
}

function showNoiseField(){
	stroke(0);
	push();
	translate(x * scale, y * scale);
	rotate(v.heading());
	line(0, 0, scale, 0);
	pop();
}