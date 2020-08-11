const joi = require("joi");

function md(links) {
  let text = ":chart_with_upwards_trend: *New Relic*:\n";
  for (let l of links) {
    text += `- <${l.url}|${l.name}>\n`;
  }
  return text;
}

function newRelicLinks() {
  const schema = joi.array().items(
    joi.object({
      url: joi.string().required().uri(),
      name: joi.string().required().max(50),
    })
  );
  try {
    const s = process.env.NEW_RELIC_LINKS;
    const j = JSON.parse(Buffer.from(s, "base64").toString("ascii"));
    return schema.validate(j);
  } catch (err) {
    return {value: [], error: err.toString()};
  }
}

module.exports = {md, newRelicLinks};
