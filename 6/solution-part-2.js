const start = new Date();
const fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" });
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let allAnswered = 0;
const lines = data
  .split("\n\n")
  .filter(Boolean)
  .map((line) => line.split(/\n/g).map((part) => part.split("")))
  .map((party) => ({
    participants: party.length,
    answers: party
      .reduce((all, next) => [...all, ...next], [])
      .sort((a, b) => (a > b ? 1 : -1)),
  }))
  .map((party) => {
    alphabet.forEach((letter) => {
      if (
        party.answers.filter((a) => a === letter).length === party.participants
      )
        allAnswered++;
    });
  });
console.log(allAnswered);
const end = new Date();
console.log(end.getTime() - start.getTime());
