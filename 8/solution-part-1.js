const start = new Date();
const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const instructions = data
  .split("\n")
  .filter(Boolean)
  .map((instruction) => ({
    operation: instruction.split(" ")[0],
    amount: parseInt(instruction.split(" ")[1]),
  }));

let acc = 0;
let idx = 0;
const history = [];

while (!history.includes(idx)) {
  history.push(idx);
  const instruction = instructions[idx];
  switch (instruction.operation) {
    case "jmp":
      idx += instruction.amount;
      break;
    case "acc":
      acc += instruction.amount;
    case "nop":
    default:
      idx++;
      break;
  }
}

console.log(acc);
const end = new Date();
console.log(end.getTime() - start.getTime());
