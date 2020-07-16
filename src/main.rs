use rand::seq::SliceRandom;
use rand::thread_rng;
use reqwest;
use std::collections::HashMap;
use std::env;

fn shuffle_team() -> Vec<&'static str> {
    let mut rng = thread_rng();
    let mut team_ids = vec![
        "<@U4B0785RC>",  // Brian
        "<@UNMPMPE4A>",  // Bil
        "<@UKEBL469E>",  // Clay
        "<@UJUSBSF34>",  // Katie
        "<@U010SGSK9NW>", // Lee
        "<@U016W6K0RP0>", // George
    ];
    team_ids.shuffle(&mut rng);
    team_ids.push("<@UU6TTJXJ7>"); // Miles goes last
    team_ids
}

fn main() {
    let msg = format!("stand! {}", shuffle_team().join(", "));
    let client = reqwest::blocking::Client::new();
    let mut map = HashMap::new();
    let url = env::var("ACCESS_BOT_URL").unwrap();
    map.insert("text", msg);
    client.post(&url).json(&map).send().unwrap();
}
