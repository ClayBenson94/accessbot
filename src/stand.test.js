const {team} = require("./stand");

describe("shuffle names", () => {
  it("shuffles the names in random order", () => {
    const ids = [
      "<@U4B0785RC>", // Brian
      "<@UNMPMPE4A>", // Bil
      "<@UKEBL469E>", // Clay
      "<@UJUSBSF34>", // Katie
      "<@U010SGSK9NW>", // Lee
      "<@U016W6K0RP0>", // George
    ];
    ids.push("<@UU6TTJXJ7>");
    expect(team()).not.toBe(ids.join(" ,"));
  });
});
