// p5.disableFriendlyErrors = true;

let colors = [], colors2, colors3;
let colorVectors = [];
let distances = [];
let iterator = {val: 0};
let iterator2 = {val: 0};
let iterator3 = {val: 0};
let scale = 2;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);

	for (let i = 0; i < width/scale; i++) {
		let h = int(random(360));
		let s = int(100);
		let b = int(100);
		colors.push(color(h, s, b));
		colorVectors.push(createVector(h, s, b));
	}
	// colors2 = colors.slice();
	// colors3 = colors.slice();
	// getDistances(colorVectors);
}

function draw() {
	if (iterator.val < colors.length) {
		// bubbleSort(colors2, iterator2, "saturation", getSaturation, 0, height/3);
		// bubbleSort(colors, iterator, "hue", getHue,height/3, height - height/3);
		// bubbleSort(colors3, iterator3, "brightness", getBrightness, height - height/3, height);
		getDistances(colorVectors);
		bubbleSort(colors, colorVectors, distances, iterator, "vector", 0, height);
	}

	else {
		print("finished");
		noLoop();
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

function drawLines(array, yStart, yEnd){
	strokeCap(SQUARE);
	strokeWeight(scale);

	for (let i = 0; i < array.length; i++) {
		stroke(array[i]);
		line(i * scale, yStart, i * scale, yEnd);
	}
}

// function bubbleSort(array, iterator, sortingMethod, fn, yStart, yEnd){
// 	for (let j = 0; j < array.length - iterator.val - 1; j++) {
// 			let a = array[j];
// 			let b = array[j + 1];

// 			if (fn(a) > fn(b)){
// 				swap(array, j, j + 1);
// 			}
// 		}
// 	iterator.val++;
// 	if (iterator.val === array.length){
// 		print(`finished sorting by ${sortingMethod}`);
// 	}
// 	drawLines(array, yStart, yEnd);
// }

function bubbleSort(colors, colorVectors, distances, iterator, sortingMethod, yStart, yEnd){
	
	for (let j = 0; j < colors.length - iterator.val - 1; j++) {
			let a = distances[j];
			let b = distances[j+1];

			if (a > b){
				swap(colors, j, j+1);
				swap(colorVectors, j, j+1);
				// swap(distances, j, j+1);
			}
		}
	iterator.val++;
	if (iterator.val === colors.length){
		print(`finished sorting by ${sortingMethod}`);
	}
	drawLines(colors, yStart, yEnd);
}

function getDistances(colorVectors){
	distances = [];
	for (let i = 0; i < colorVectors.length-1; i++) {
		let a = colorVectors[i];
		let b = colorVectors[i+1];
		let dist = a.dist(b);
		distances.push(dist);
	}
	print(distances);
}