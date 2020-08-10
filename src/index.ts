import {App} from '@slack/bolt';
import {newRelicLinks, md} from './nr';

const help = `:teacher: *Accessbot commands*
- *new relic*: prints new relic links
- *help*: prints help text

Make a PR: https://github.com/kingishb/accessbot
`;

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message(/^help$/, async ({message, say}) => {
  await say(help);
});

app.message(/^new relic$/, async ({context, say}) => {
  const links = newRelicLinks();
  const txt = md(links);
  await say(txt);
});

async function main() {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
}

main();
