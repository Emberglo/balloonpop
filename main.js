/*permanent references to start and inflate buttons*/
const startButton = document.getElementById('start-button');
const inflateButton = document.getElementById('inflate-button');

/*variable to hold number of clicks*/
let clickCount = 0;

/*initial size of balloon*/
let height = 120;
let width = 100;

/*how much size changes and max size to pop at*/
let inflationRate = 20;
let maxSize = 300;

/*initial number of balloons popped*/
let currentPopCount = 0;

/*variable to store high score*/
let highestPopCount = 0;

/*set the time limit of the game*/
let gameLength = 5000;

/*variable to track the clock id for countdown*/
let clockId = 0;

/*variable to hold time remaining*/
let timeRemaining = 0;

/*what happens when you click the start game button*/
function startGame() {
	/*disabling start button and enabling inflate button*/
	startButton.setAttribute('disabled', 'true');
	inflateButton.removeAttribute('disabled');

	/*invoke function to start countdown*/
	startClock();

	/*calls the stopGame function after specified time*/
	setTimeout(stopGame, gameLength);
}

/*function to start the countdown clock*/
function startClock() {
	timeRemaining = gameLength;
	drawClock();
	clockId = setInterval(drawClock, 1000);
}

/*stock the interval when clock reaches a certain id*/
function stopClock() {
	clearInterval(clockId);
}

/*logic for time remaining*/
function drawClock() {
	let countdownElem = document.getElementById('countdown');
	countdownElem.innerText = (timeRemaining / 1000).toString();
	timeRemaining -= 1000;
}

/*what happens when you click the inflate button*/
function inflate() {
	/*increment number of clicks on inflate button*/
	clickCount++;

	/*Adding the inflation rate amount on each click of button*/
	height += inflationRate;
	width += inflationRate;

	/*resetting balloon once you hit max size*/
	if (height >= maxSize) {
		console.log('POP');
		currentPopCount++;
		height = 0;
		width = 0;
	}
	draw();
}

/*function to contain any logic that touches the DOM/updates the screen*/
function draw() {
	/*get the balloon element so you can access it*/
	let balloonElement = document.getElementById('balloon');

	/*changing the css for balloon size based on number of clicks*/
	balloonElement.style.height = height + 'px';
	balloonElement.style.width = width + 'px';

	/*display number of clicks*/
	let clickCountElem = document.getElementById('click-count');
	clickCountElem.innerText = clickCount.toString();

	/*track the number of popped balloons*/
	let popCountElem = document.getElementById('pop-count');
	popCountElem.innerText = currentPopCount.toString();
}

/*logic of what happens after time runs out*/
function stopGame() {
	/*Disabling inflate button and enabling start button after specified amount of time*/
	inflateButton.setAttribute('disabled', 'true');
	startButton.removeAttribute('disabled');

	/*reset all values after time runs out*/
	clickCount = 0;
	height = 120;
	width = 100;

	if (currentPopCount > highestPopCount) {
		highestPopCount = currentPopCount;
	}

	currentPopCount = 0;

	stopClock();

	draw();
}
