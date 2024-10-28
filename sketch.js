let mStrings = [];
let seePositions = [];
let mWords = [];

function preload() {
  mStrings = loadStrings("Ways_of_Seeing.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let mString = mStrings[0];
  let mWords = mString.toLowerCase().split(" ");

  textSize(5);

  // Assume square - grid
  let cols = Math.ceil(sqrt(mWords.length)); 
  let rows = Math.ceil(mWords.length / cols); 

  let xGap = width / cols;
  let yGap = height / rows;

  for (let idx = 0; idx < mWords.length; idx++) {
    let col = idx % cols;
    let row = Math.floor(idx / cols);

    let xpos = col * xGap;
    let ypos = row * yGap;

    // Store the position of see***
    if (mWords[idx] === "seeing" || mWords[idx] === "see" || mWords[idx] === "sees") {
      seePositions.push({ word: mWords[idx], x: xpos, y: ypos + yGap / 2 });
    } 
  }
}

function draw() {
  background(0);

  let mString = mStrings[0];
  let mWords = mString.toLowerCase().split(" ");
  textSize(5);
  fill(150);

  let cols = Math.ceil(sqrt(mWords.length)); 
  let rows = Math.ceil(mWords.length / cols); 
  let xGap = width / cols;
  let yGap = height / rows;

  for (let idx = 0; idx < mWords.length; idx++) {
    let col = idx % cols;
    let row = Math.floor(idx / cols);

    let xpos = col * xGap;
    let ypos = row * yGap;

    // Words except see***
    if (mWords[idx] !== "seeing" && mWords[idx] !== "see" && mWords[idx] !== "sees") {
      text(mWords[idx], xpos, ypos + yGap / 2);
    }
  }

  for (let i = 0; i < seePositions.length; i++) {
    blink(seePositions[i].word, seePositions[i].x, seePositions[i].y);
  }
}

function blink(word, x, y) {
  let sizes;
  let offsets;

  if (word === "seeing") {
    sizes = [5, 10, 15, 15, 10, 5];
    offsets = [0, 15, 30, 45, 60, 75];
  } else if (word === "see") {
    sizes = [5, 15, 5];
    offsets = [0, 15, 30];
  } else if (word === "sees") {
    sizes = [5, 15, 15, 5];
    offsets = [0, 15, 30, 45];
  }

  // Animate
  for (let i = 0; i < sizes.length; i++) {
    let size = sizes[i] + sin(frameCount * 0.1) * 5; // Grow & shrink
    fill(225);
    textSize(size * 2);
    text(word[i], x + offsets[i], y);
  }
}
