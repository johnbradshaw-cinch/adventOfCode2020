const start = new Date();
const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const lines = data
  .split("\n\n")
  .filter(Boolean)
  .map((line) => line.replace(/\n/g, "").split("").filter(onlyUnique).length)
  .reduce((current, next) => current + next, 0);
console.log(lines);
const end = new Date();
console.log(end.getTime() - start.getTime());
