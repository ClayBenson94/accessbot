const bolt = require("@slack/bolt");
const nr = require("./nr");

async function main() {
  const app = new bolt.App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
  });

  app.message(/^(accessbot|accessbot help)$/, async ({message, say}) => {
    const help = `:teacher: *Accessbot subcommands*
- *new relic*: prints new relic links
- *help*: prints help text

Make a PR: https://github.com/kingishb/accessbot
`;
    await say(help);
  });

  app.message(/^accessbot new relic$/, async ({context, say}) => {
    const links = nr.newRelicLinks();
    const txt = nr.md(links);
    await say(txt);
  });

  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
}

main();
