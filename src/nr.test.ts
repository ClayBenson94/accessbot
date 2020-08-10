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
        case: '[{"name": "a", "url": "b"}]',
        expected: [
          {
            name: 'a',
            url: 'b',
          },
        ],
      },
      {
        case: '[{"name": "a"}]',
        expected: [],
      },
      {
        case: '{"a": "b"}',
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
