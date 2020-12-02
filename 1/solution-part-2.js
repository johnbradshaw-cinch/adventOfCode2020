const start = new Date();
const getResults = (data) => {
  const nums = data.map((a) => parseInt(a));
  let number = 0;
  nums.forEach((a) => {
    nums.forEach((b) => {
      nums.forEach((c) => {
        if (a + b + c === 2020) {
          number = a * b * c;
          return;
        }
      });
    });
  });
  return number;
};

const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });
const end = new Date();
console.log(getResults(data.split("\n")));
console.log(end.getTime() - start.getTime());
