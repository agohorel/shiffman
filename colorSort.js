let values = [];
let rIterator = 0,
	gIterator = 0,
	bIterator = 0,
	brightnessIterator = 0;

function setup() {
	createCanvas(800, 500);

	for (let i = 0; i < width; i++) {
		let r = int(random(255));
		let g = int(random(255));
		let b = int(random(255));
		values.push(color(r, g, b));
	}
}

function draw() {

	if (rIterator < values.length) {
		for (let j = 0; j < values.length - rIterator - 1; j++) {
			let a = values[j].levels;
			let b = values[j + 1].levels;

			if (getRed(a) > getRed(b)){
				swap(values, j, j + 1);
			}
		}
		rIterator++;
		if (rIterator === values.length){
			print("finished sorting by red");
		} 
	} 

	else if (gIterator < values.length) {
		for (let j = 0; j < values.length - gIterator - 1; j++) {
			let a = values[j].levels;
			let b = values[j + 1].levels;

			if (getGreen(a) > getGreen(b)){
				swap(values, j, j + 1);
			}
		}
		gIterator++;
		if (gIterator === values.length){
			print("finished sorting by green");
		} 
	}

	else if (bIterator < values.length) {
		for (let j = 0; j < values.length - bIterator - 1; j++) {
			let a = values[j].levels;
			let b = values[j + 1].levels;

			if (getBlue(a) > getBlue(b)){
				swap(values, j, j + 1);
			}
		}
		bIterator++;
 		if (bIterator === values.length){
			print("finished sorting by blue");
		} 
	}

	else if (brightnessIterator < values.length) {
		for (let j = 0; j < values.length - brightnessIterator - 1; j++) {
			let a = values[j].levels;
			let b = values[j + 1].levels;

			if (getBrightness(a) > getBrightness(b)){
				swap(values, j, j + 1);
			}
		}
		brightnessIterator++;
 		if (brightnessIterator === values.length){
			print("finished sorting by brightness");
		} 
	}

	else {
		print("finished");
		rIterator = 0;
		gIterator = 0;
		bIterator = 0;
		brightnessIterator = 0;
		// noLoop();
	}

	for (let i = 0; i < values.length; i++) {
		stroke(values[i]); // private i
		line(i, 0, i, height);
	}
}

function swap(array, a, b) {
	let temp = array[a]
	array[a] = array[b];
	array[b] = temp;
}

function getBrightness(color){
	let sum = 0;
	color.forEach((channel) => {
		sum += channel;
	});	
	return sum;
}

function getRed(color){
	return color[0];
}

function getGreen(color){
	return color[1];
}

function getBlue(color){
	return color[2];
}

function getAvgDiff(a, b){
	let diffR = a[0] - b[0];
	let diffG = a[1] - b[1];
	let diffB = a[2] - b[2];
	return diffR + diffG + diffG / 3;
}