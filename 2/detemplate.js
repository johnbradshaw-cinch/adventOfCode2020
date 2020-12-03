Object.defineProperty(String.prototype, "detemplate", {
  value: function detemplate(template) {
    const templated = this;
    const tokens = [];
    const sanitized = template.replace(/\{(.*?)}/g, function (a, b) {
      tokens.push(b);
      return "---break---";
    });
    splitters = sanitized.split("---break---").filter((s) => s !== "");
    console.log(splitters);
    let remainingString = this;
    const output = tokens.reduce((current, _next, index) => {
      const endMarker = splitters[index];
      const splitterPos = endMarker
        ? remainingString.indexOf(endMarker)
        : remainingString.length;
      const token = remainingString.slice(0, splitterPos);
      remainingString = remainingString.slice(
        splitterPos + (endMarker ? endMarker.length : 0)
      );
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

const input = "ben: likes fish";
const template = "{name}: {adjective} {noun}";
console.log(input);
console.log(template);
console.log(input.detemplate(template));
