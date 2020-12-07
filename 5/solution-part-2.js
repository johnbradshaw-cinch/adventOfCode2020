const binarySpaceTing = (row, zeroIndicator, limit) => {
  return row
    .split("")
    .map((letter) => (letter === zeroIndicator ? 0 : 1))
    .map((letter) => parseInt(letter))
    .reduce((result, next) => {
      limit = limit / 2;
      return result + next * limit;
    }, 0);
};

const lineToId = (line) => {
  const rowString = line.slice(0, 7);
  const seatString = line.slice(7);
  const row = binarySpaceTing(rowString, "F", 128);
  const seat = binarySpaceTing(seatString, "L", 8);
  return { id: row * 8 + seat, row, seat };
};

const start = new Date();
const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });
const lines = data.split("\n").filter(Boolean).map(lineToId);
console.log(lines);
const end = new Date();
console.log(end.getTime() - start.getTime());

console.log(
  Array(128)
    .fill()
    .map((x, i) =>
      Array(8)
        .fill()
        .map((x, i) => i)
    )
    .reduce(
      (current, next, row) =>
        current +
        `\n|` +
        next.reduce(
          (t, n) =>
            t +
            (lines.some((line) => line.id === row * 8 + n)
              ? "true"
              : row * 8 + n) +
            "|",
          ""
        ),
      "/\\"
    )
);
