const nr = require("./nr");

describe("formats md text", () => {
  it("formats md", () => {
    const input = [
      {
        name: "a",
        url: "b",
      },
    ];
    const want = `:chart_with_upwards_trend: *New Relic*:\n- <b|a>\n`;
    expect(nr.md(input)).toBe(want);
  });
});

describe("parse env vars", () => {
  const cases = [
    {
      // '[{"name": "a", "url": "http://b.com"}]'
      case: "W3sibmFtZSI6ICJhIiwgInVybCI6ICJodHRwOi8vYi5jb20ifV0=",
      error: false,
      msg: "correct",
    },
    {
      // '[{"name": "a"}]'
      case: "W3sibmFtZSI6ICJhIn1d",
      error: true,
      msg: "incomplete",
    },
    {
      // '{"a": "b"}'
      case: "eyJhIjogImIifQ==",
      error: true,
      msg: "malformed",
    },
  ];
  for (let c of cases) {
    it(c.msg, () => {
      process.env.NEW_RELIC_LINKS = c.case;
      const result = nr.newRelicLinks();
      if (c.error) {
        expect(result.error).toBeDefined();
      } else {
        expect(result.error).toBeUndefined();
      }
    });
  }
});
