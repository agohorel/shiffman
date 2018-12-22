class Boid {
	constructor(){
		this.position = createVector(random(width), random(height));
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(random(2, 4));
		this.acceleration = createVector();
		this.maxForce = 1;
		this.maxSpeed = 4;
	}

	edges(){
		if (this.position.x > width){
			this.position.x = 0;
		} else if (this.position.x < 0){
			this.position.x = width;
		}

		if (this.position.y > height){
			this.position.y = 0;
		} else if (this.position.y < 0){
			this.position.y = height;
		}
	}

	align(boids){
		let perceptionRadius = 100;
		let steering = createVector();
		let total = 0;
		for (let other of boids){
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			// check if surrounding boids are within "perceivable" range and that "other" is not "me"/"this"
			if (d < perceptionRadius && other != this){
				steering.add(other.velocity);
				total++;
			}
		}
		if (total > 0){
			steering.div(total);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}
		return steering;
	}

	cohesion(boids){
		let perceptionRadius = 100;
		let steering = createVector();
		let total = 0;
		for (let other of boids){
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			// check if surrounding boids are within "perceivable" range and that "other" is not "me"/"this"
			if (d < perceptionRadius && other != this){
				steering.add(other.position);
				total++;
			}
		}
		if (total > 0){
			steering.div(total);
			steering.sub(this.position);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}
		return steering;
	}

	separation(boids){
		let perceptionRadius = 100;
		let steering = createVector();
		let total = 0;
		for (let other of boids){
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			// check if surrounding boids are within "perceivable" range and that "other" is not "me"/"this"
			if (d < perceptionRadius && other != this){
				let diff = p5.Vector.sub(this.position, other.position);
				// @TODO put in condition for if d = 0 (div by zero)
				diff.div(Math.pow(d, 2)); // set magnitude to be inversely proportional to distance
				steering.add(other.position);
				total++;
			}
		}
		if (total > 0){
			steering.div(total);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}
		return steering;
	}

	flock(boids){
		let alignment = this.align(boids);
		let cohesion = this.cohesion(boids);
		let separation = this.separation(boids);

		alignment.mult(alignSlider.value());
		cohesion.mult(cohesionSlider.value());
		separation.mult(separationSlider.value());

		this.acceleration.add(alignment);
		this.acceleration.add(cohesion);
		this.acceleration.add(separation);
	}

	update(){
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.acceleration.set(0, 0); // reset acceleration after each update
	}

	show(){
		strokeWeight(8);
		stroke(255);
		point(this.position.x, this.position.y);
	}
}