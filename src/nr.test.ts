import {newRelicLinks, md} from './nr';

describe('formats md text', () => {
  it('formats md', () => {
    const input = [
      {
        name: 'a',
        url: 'b',
      },
    ];
    const want = `New Relic URLs:\n<b|a>\n`;
    expect(md(input)).toBe(want);
  });
});

describe('parse env vars', () => {
  it('parses json links correctly', () => {
    const cases = [
      {
        // '[{"name": "a", "url": "b"}]'
        case: 'W3sibmFtZSI6ICJhIiwgInVybCI6ICJiIn1d',
        expected: [
          {
            name: 'a',
            url: 'b',
          },
        ],
      },
      {
        // '[{"name": "a"}]'
        case: '[{"name": "a"}]',
        expected: [],
      },
      {
        // '{"a": "b"}'
        case: 'eyJhIjogImIifQ==',
        expected: [],
      },
    ];
    for (let c of cases) {
      process.env.NEW_RELIC_LINKS = c.case;
      const links = newRelicLinks();
      expect(links).toStrictEqual(c.expected);
    }
  });
});
