Object.defineProperty(String.prototype, "detemplate", {
  value: function detemplate(template) {
    const templated = this;
    const tokens = [];
    template.replace(/\{(.*?)}/g, function (a, b) {
      tokens.push(b);
    });

    console.log(tokens);
    console.log(template);
    return templated;
  },
  writable: true,
  configurable: true,
});

console.log(
  "5-16 b: bbbbhbbbbpbxbbbcb".detemplate("{min}-{max} {letter}: {password}")
);
