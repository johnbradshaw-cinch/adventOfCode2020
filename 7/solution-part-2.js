const start = new Date();
const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const lines = data
  .split("\n")
  .filter(Boolean)
  .map((sentence) => {
    const regex = sentence.match(
      /^(?<name>.*) bags? contains? (no other bags|(?<contents>.*)).$/
    );
    return {
      name: regex.groups.name,
      contents: (regex.groups.contents || "")
        .split(/ bags?,? ?/)
        .filter(Boolean)
        .map((content) => ({
          name: content.slice(content.indexOf(" ") + 1),
          count: parseInt(content.slice(0, content.indexOf(" "))),
        })),
    };
  })
  .reduce(
    (all, next) => ({ ...all, [next.name]: { content: next.contents } }),
    {}
  );

const countBags = (name, rules) =>
  rules[name].content.reduce(
    (count, next) =>
      count + next.count + countBags(next.name, rules) * next.count,
    0
  );

console.log(countBags("shiny gold", lines));
const end = new Date();
console.log(end.getTime() - start.getTime());
