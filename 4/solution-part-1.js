const isValid = ({ byr, iyr, eyr, hgt, hcl, ecl, pid, cid }) => {
  return byr && iyr && eyr && hgt && hcl && ecl && pid;
};

const start = new Date();
const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });
const lines = data
  .split("\n\n")
  .filter(Boolean)
  .map((line) => {
    const parts = line
      .replace(/\n/g, " ")
      .split(" ")
      .map((p) => p.split(":"))
      .reduce((p, n) => ({ ...p, [n[0]]: n[1] }), {});
    return parts;
  })
  .filter(isValid);
console.log(lines.length);
const end = new Date();
console.log(end.getTime() - start.getTime());
