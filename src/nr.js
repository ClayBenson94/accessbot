function md(links) {
  let text = ':chart_with_upwards_trend: *New Relic*:\n';
  for (let l of links) {
    text += `- <${l.url}|${l.name}>\n`;
  }
  return text;
}

function newRelicLinks() {
  try {
    const s = process.env.NEW_RELIC_LINKS;
    const j = JSON.parse(Buffer.from(s, 'base64').toString('ascii'));
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

module.exports = {md, newRelicLinks};
