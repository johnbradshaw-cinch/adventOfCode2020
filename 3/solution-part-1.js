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

console.log(getTrees(3, 1));
const end = new Date();
console.log(end.getTime() - start.getTime());
