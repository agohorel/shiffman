let values = [];
let hIterator = 0,
	sIterator = 0,
	bIterator = 0,
	brightnessIterator = 0;

function setup() {
	createCanvas(300, 500);
	colorMode(HSB);

	for (let i = 0; i < width; i++) {
		let h = int(random(255));
		let s = int(random(255));
		let b = int(random(255));
		values.push(color(h, s, b));
	}
}

function draw() {

	if (hIterator < values.length) {
		for (let j = 0; j < values.length - hIterator - 1; j++) {
			let a = values[j];
			let b = values[j + 1];

			if (getHue(a) > getHue(b)){
				swap(values, j, j + 1);
			}
		}
		hIterator++;
		if (hIterator === values.length){
			print("finished sorting by hue");
		} 
	} 

	else if (sIterator < values.length) {
		for (let j = 0; j < values.length - sIterator - 1; j++) {
			let a = values[j];
			let b = values[j + 1];

			if (getSaturation(a) > getSaturation(b)){
				swap(values, j, j + 1);
			}
		}
		sIterator++;
		if (sIterator === values.length){
			print("finished sorting by saturation");
		} 
	}

	else if (bIterator < values.length) {
		for (let j = 0; j < values.length - bIterator - 1; j++) {
			let a = values[j];
			let b = values[j + 1];

			if (getBrightness(a) > getBrightness(b)){
				swap(values, j, j + 1);
			}
		}
		bIterator++;
 		if (bIterator === values.length){
			print("finished sorting by brightness");
		} 
	}

	else {
		print("finished");
		hIterator = 0;
		sIterator = 0;
		bIterator = 0;
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

function getHue(color){
	return color._getHue();
}

function getSaturation(color){
	return color._getSaturation();
}

function getBrightness(color){
	return color._getBrightness();
}

function getAvgDiff(a, b){
	let diffR = a[0] - b[0];
	let diffG = a[1] - b[1];
	let diffB = a[2] - b[2];
	return diffR + diffG + diffG / 3;
}