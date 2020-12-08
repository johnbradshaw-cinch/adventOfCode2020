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
          count: content.slice(0, content.indexOf(" ")),
        })),
    };
  })
  .reduce(
    (all, next) => ({ ...all, [next.name]: { content: next.contents } }),
    {}
  );

const containsGoldBag = (name, rules) =>
  rules[name].content.some(
    (content) =>
      content.name === "shiny gold" || containsGoldBag(content.name, rules)
  );

const res = Object.keys(lines).reduce(
  (count, next) => (containsGoldBag(next, lines) ? count + 1 : count),
  0
);

console.log(res);
const end = new Date();
console.log(end.getTime() - start.getTime());
