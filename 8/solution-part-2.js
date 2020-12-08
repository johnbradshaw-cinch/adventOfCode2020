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

let terminated = false;

let acc = 0;

instructions.forEach((instToChange, i) => {
  if (instToChange.operation === "acc" || terminated) {
    return;
  }
  acc = 0;
  let idx = 0;
  const alteredInstructions = [...instructions];
  alteredInstructions[i] = {
    ...instToChange,
    operation: instToChange.operation === "nop" ? "jmp" : "nop",
  };
  const history = [];
  while (!history.includes(idx) && !terminated) {
    history.push(idx);
    const instruction = alteredInstructions[idx];
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
    terminated = idx === alteredInstructions.length;
  }
});
console.log(acc);
const end = new Date();
console.log(end.getTime() - start.getTime());
