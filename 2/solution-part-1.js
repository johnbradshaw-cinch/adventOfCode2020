const isValid = ({ min, max, letter, password }) => {
  const letterCount = password.split("").filter((l) => l === letter).length;
  return letterCount >= min && letterCount <= max;
};

const start = new Date();
const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });
const end = new Date();
const lines = data
  .split("\n")
  .map((line) => {
    const parts = line.split(" ");
    const minMax = parts[0].split("-");
    return {
      min: parseInt(minMax[0]),
      max: parseInt(minMax[1]),
      letter: parts[1].split(":")[0],
      password: parts[2],
    };
  })
  .map((row) => {
    return {
      ...row,
      valid: isValid(row),
    };
  });
console.log(lines.filter((l) => l.valid).length);
console.log(end.getTime() - start.getTime());
