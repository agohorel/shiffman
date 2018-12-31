p5.disableFriendlyErrors = true;

let flock = [];
let num_boids = 15;
let cnv;

function setup(){
	cnv = createCanvas(windowWidth, windowHeight);
	background(0);
	colorMode(HSB);
}

function draw(){
	if (flock.length < num_boids && frameCount % 2 === 0){
		flock.push(new Boid());
	}

	for (let boid of flock){
		boid.update();
		boid.edges();
		boid.lines(flock);
	}

	// screenshot and reset every ~30 seconds
	if (Math.floor(millis()) % 30000 <= 30){
		let timestamp = Date.now().toString().trim();
		saveCanvas(cnv, timestamp, "png");
		clear();
		background(0);
		flock = [];
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	centerCanvas();
	background(0);
}

// re-center canvas if the window is resized
function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}