const flock = [];
let num_boids = 100;
let alignSlider, cohesionSlider, separationSlider;

function setup(){
	createCanvas(windowWidth, windowHeight-40);

	alignSlider = createSlider(0, 5, 1, .1);
	cohesionSlider = createSlider(0, 5, 1, .1);
	separationSlider = createSlider(0, 5, 1, .1);

	for (let i = 0; i < num_boids; i++){
		flock.push(new Boid());
	}	
}

function draw(){
	background(50);

	for (let boid of flock){
		boid.edges();
		boid.flock(flock);
		boid.update();
		boid.show();
	}
}