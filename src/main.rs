use rand::seq::SliceRandom;
use rand::thread_rng;
use reqwest;
use std::collections::HashMap;
use std::env;

fn shuffle_team() -> Vec<&'static str> {
    let mut rng = thread_rng();
    let mut team_ids = vec!["<@U4B0785RC>", "<@UNMPMPE4A>", "<@UKEBL469E>", "<@UJUSBSF34>", "<@U010SGSK9NW>", "<@UU6TTJXJ7>"]; //brian, bil, clay, katie, lee, miles
    team_ids.shuffle(&mut rng);
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
