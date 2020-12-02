const start = new Date();
const getResults = (data) => {
  const nums = data.map((a) => parseInt(a));
  let number = 0;
  nums.forEach((a) => {
    nums.forEach((b) => {
      if (a + b === 2020) {
        number = a * b;
        return;
      }
    });
  });
  return number;
};

const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });
const end = new Date();
console.log(getResults(data.split("\n")));
console.log(end.getTime() - start.getTime());
