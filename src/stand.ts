import axios from 'axios';

// fischer-yates shuffle
// src: https://javascript.info/task/shuffle
function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    [array[i], array[j]] = [array[j], array[i]];
  }
}

function team(): string {
  const ids = [
    '<@U4B0785RC>', // Brian
    '<@UNMPMPE4A>', // Bil
    '<@UKEBL469E>', // Clay
    '<@UJUSBSF34>', // Katie
    '<@U010SGSK9NW>', // Lee
    '<@U016W6K0RP0>', // George
  ];

  const miles = '<@UU6TTJXJ7>';

  shuffle(ids);
  ids.push(miles);
  return ids.join(', ');
}

async function slack(msg: string): Promise<string> {
  const url = process.env.SLACK_WEBHOOK;
  if (!url) {
    return Promise.reject('no webhook');
  }
  try {
    const response = await axios.post(url, {
      msg: msg,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  return Promise.resolve('OK');
}

async function main() {
  const ids = team();
  try {
    await slack(ids);
  } catch (err) {
    console.log(err);
  }
}

main();
