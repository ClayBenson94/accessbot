type Link = {
  name: string;
  url: string;
};

export function md(links: Link[]): string {
  let text = 'New Relic URLs:\n';
  for (let l of links) {
    text += `<${l.url}|${l.name}>\n`;
  }
  return text;
}

export function newRelicLinks(): Link[] {
  try {
    const s = process.env.NEW_RELIC_LINKS;
    if (!s) {
      return [];
    }
    const j = JSON.parse(s);
    // validate input
    if (!Array.isArray(j)) {
      return [];
    }
    for (let entry of j) {
      if (!entry.name || !entry.url) {
        return [];
      }
    }
    return j;
  } catch (err) {
    return [];
  }
}
