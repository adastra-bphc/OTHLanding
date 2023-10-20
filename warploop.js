const numStars = 500;
let stars = [];
let ptime;
let initTime;

const accMin = 0.005;
const accMax = 0.5;
let acc = accMin;

let staleTime = 3;
let accTime = 3;
let warpTime = 3;

let logoTime = 2;
let logoTimeOverlap = 1;

let logo;
const logoWidth = 877;
const logoHeight = 284;

let warpDone = false;

function setup() {
	createCanvas(displayWidth, displayHeight);
	stroke(255);
	strokeWeight(2);

	for(let i = 0; i < numStars; i++) {
		stars.push(new Star(random(width), random(height)));
	}

	ptime = Date.now()/1000;
	initTime = ptime;

	logo = loadImage("./assets/images/brochure_ad_astra.png");
}

function draw() {
	background(0, 50);

	
	let t = Date.now()/1000;
	let dt = t - ptime;
	let elapsedTime = t - initTime;


	let tot = staleTime + accTime + warpTime;

	if (elapsedTime > staleTime && elapsedTime < staleTime + accTime) {
		acc = map(elapsedTime, staleTime, staleTime + warpTime, accMin, accMax);
	} else if (elapsedTime > staleTime + accTime && elapsedTime < tot) {
		acc = accMax;
	} else {
		acc = accMin;
	}

	if (elapsedTime > tot - logoTimeOverlap && elapsedTime < tot + logoTime) {
		let bottom = tot - logoTimeOverlap;
		let top = tot + logoTime;
		let clw = map(elapsedTime, bottom, top, 0, logoWidth);
		let clh = map(elapsedTime, bottom, top, 0, logoHeight);
		image(logo, width/2 - clw/2, height/2 - clh/2, clw, clh);
	} else if (elapsedTime >  tot + logoTime) {
		image(logo, width/2 - logo.width/2, height/2 - logo.height/2);

		if (!warpDone) {
			typeWords();
			warpDone = true;
		}
	}

	stars = stars.filter(star => {
		star.draw();
		star.update(acc);
		return star.isActive();
	});

	while(stars.length < numStars) {
		stars.push(new Star(random(width), random(height)));
	}

	ptime = t;
}

class Star {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.prevPos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.ang = atan2(y - (height/2), x - (width/2));
	}

	isActive() {
		return onScreen(this.prevPos.x, this.prevPos.y);
	}

	update(acc) {
		this.vel.x += cos(this.ang) * acc;
		this.vel.y += sin(this.ang) * acc;
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}

	draw() {
		const alpha = map(this.vel.mag(), 0, 3, 0, 255);
		stroke(255, alpha);
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
	}
}

function onScreen(x, y) {
return x >= 0 && x <= width && y >= 0 && y <= height;  
}

function windowResized() {
	resizeCanvas(displayWidth, displayHeight);
}