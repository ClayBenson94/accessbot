const axios = require("axios");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * team returns a comma separated list of team members
 * in random order.
 */
function team() {
  const ids = [
    "<@U4B0785RC>", // Brian
    "<@UNMPMPE4A>", // Bil
    "<@UKEBL469E>", // Clay
    "<@UJUSBSF34>", // Katie
    "<@U010SGSK9NW>", // Lee
    "<@U016W6K0RP0>", // George
  ];

  const miles = "<@UU6TTJXJ7>";

  shuffle(ids);
  ids.push(miles);
  return ids.join(", ");
}

async function slack(msg) {
  try {
    const url = process.env.SLACK_WEBHOOK;
    await axios.post(url, {
      msg: msg,
    });
  } catch (error) {
    console.error(error);
  }
  return Promise.resolve("OK");
}

/**
 * postStand posts a randomized team list to slack.
 */
async function postStand() {
  try {
    const ids = team();
    await slack(ids);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {postStand, team};
