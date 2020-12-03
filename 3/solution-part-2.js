const start = new Date();
const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const lines = data.split("\n");
const width = lines[0].length;
const height = lines.length;

const getTrees = (acceleration, gravity) => {
  let y = 0;
  let x = 0;
  let trees = 0;
  let spaces = 0;
  while (y < height) {
    const line = lines[y];
    const position = x % width;
    const element = line[position];
    if (element === "#") {
      trees++;
    } else {
      spaces++;
    }
    y += gravity;
    x += acceleration;
  }
  return trees;
};

const answer = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
]
  .map(({ x, y }) => getTrees(x, y))
  .reduce((prev, next) => prev * next, 1);

console.log(answer);
const end = new Date();
console.log(end.getTime() - start.getTime());
