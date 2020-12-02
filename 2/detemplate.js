Object.defineProperty(String.prototype, "detemplate", {
  value: function detemplate(template) {
    const templated = this;
    const tokens = [];
    const sanitized = template.replace(/\{(.*?)}/g, function (a, b) {
      tokens.push(b);
      return "\n";
    });
    splitters = sanitized.split("\n").filter((s) => s !== "");
    let lastIndex = 0;
    const output = tokens.reduce((current, next, index) => {
      const endMarker = splitters[index];
      const splitterPos = endMarker ? this.indexOf(endMarker) : this.length;
      const token = this.slice(lastIndex, splitterPos);
      if (endMarker) lastIndex = splitterPos + endMarker.length;
      return {
        ...current,
        [tokens[index]]: token,
      };
    }, {});
    return output;
  },
  writable: true,
  configurable: true,
});

const isValid = ({ min, max, letter, password }) => {
  const letters = password.split("");
  const minLetter = letters[min - 1];
  const maxLetter = letters[max - 1];
  return (
    (minLetter !== letter || maxLetter !== letter) &&
    (minLetter === letter || maxLetter === letter)
  );
};

const start = new Date();
const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });
const end = new Date();
const lines = data
  .split("\n")
  .map((line) => line.detemplate("{min}-{max} {letter}: {password}"))
  .map((line) => ({
    ...line,
    min: parseInt(line.min),
    max: parseInt(line.max),
  }))
  .map((row) => {
    return {
      ...row,
      valid: isValid(row),
    };
  });
console.log(lines.filter((l) => l.valid).length);
console.log(end.getTime() - start.getTime());
