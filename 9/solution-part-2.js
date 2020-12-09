const start = new Date();
const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const lines = data
  .split("\n")
  .filter(Boolean)
  .map((number) => parseInt(number));

let current = 25;
let min = 0;
let max = 25;
let target = -1;
let match = true;

while (match) {
  target = lines[current];
  const options = lines.slice(min, max);
  for (let index = 0; index < options.length; index++) {
    const a = options[index];
    for (let index = 0; index < options.length; index++) {
      const b = options[index];
      match = a + b === target;
      if (match) {
        break;
      }
    }
    if (match) break;
  }
  if (!match) break;
  current++;
  min++;
  max++;
}
console.log(target);

let sum = 0;
let lower = 0;
let upper = 0;
while (sum != target) {
  lower++;
  upper = lower;
  sum = 0;
  while (sum < target) {
    upper++;
    sum = lines.slice(lower, upper).reduce((total, a) => total + a, 0);
  }
}
const ordered = lines.slice(lower, upper).sort((a, b) => a - b);
console.log(ordered[0] + ordered[ordered.length - 1]);
const end = new Date();
console.log(end.getTime() - start.getTime());
