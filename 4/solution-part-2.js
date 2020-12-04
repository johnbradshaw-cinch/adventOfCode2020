const isValid = ({ byr, iyr, eyr, hgt, hcl, ecl, pid, cid }) => {
  return byr && iyr && eyr && hgt && hcl && ecl && pid;
};
const validateYear = (year, min, max) => 0 + year >= min && 0 + year <= max;
const validateHeight = (height) => {
  if (/in/.test(height)) {
    const val = parseInt(height.replace(/(cm|in)/, ""));
    return val >= 59 && val <= 76;
  } else if (/cm/.test(height)) {
    const val = parseInt(height.replace(/(cm|in)/, ""));
    return val >= 150 && val <= 193;
  }
  return false;
};
const validateFields = ({ byr, iyr, eyr, hgt, hcl, ecl, pid, cid }) => {
  const isValid =
    validateYear(byr, 1920, 2002) &&
    validateYear(iyr, 2010, 2020) &&
    validateYear(eyr, 2020, 2030) &&
    validateHeight(hgt) &&
    /^#[0-9a-f]{6,6}/.test(hcl) &&
    /(amb|blu|brn|gry|grn|hzl|oth)/.test(ecl) &&
    /[0-9]{9,9}/.test(pid);
  return isValid;
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
  .filter(isValid)
  .filter(validateFields).length;
console.log(lines);
const end = new Date();
console.log(end.getTime() - start.getTime());
