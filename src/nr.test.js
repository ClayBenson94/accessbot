const {newRelicLinks, md} = require("./nr");

describe("formats md text", () => {
  it("formats md", () => {
    const input = [
      {
        name: "a",
        url: "b",
      },
    ];
    const want = `:chart_with_upwards_trend: *New Relic*:\n- <b|a>\n`;
    expect(md(input)).toBe(want);
  });
});

describe("parse env vars", () => {
  const cases = [
    {
      // '[{"name": "a", "url": "b"}]'
      case: "W3sibmFtZSI6ICJhIiwgInVybCI6ICJiIn1d",
      expected: [
        {
          name: "a",
          url: "b",
        },
      ],
      msg: "correct",
    },
    {
      // '[{"name": "a"}]'
      case: '[{"name": "a"}]',
      expected: [],
      msg: "incomplete",
    },
    {
      // '{"a": "b"}'
      case: "eyJhIjogImIifQ==",
      expected: [],
      msg: "malformed",
    },
  ];
  for (let c of cases) {
    it(c.msg, () => {
      process.env.NEW_RELIC_LINKS = c.case;
      const links = newRelicLinks();
      expect(links).toStrictEqual(c.expected);
    });
  }
});
