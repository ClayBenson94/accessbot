use rand::seq::SliceRandom;
use rand::thread_rng;
use reqwest;
use std::collections::HashMap;
use std::env;

fn shuffle_team() -> Vec<&'static str> {
    let mut rng = thread_rng();
    let mut team = vec!["brian", "bil", "clay", "katie", "lee", "miles"];
    team.shuffle(&mut rng);
    team
}

fn main() {
    let msg = format!("stand! {}", shuffle_team().join(", "));
    let client = reqwest::blocking::Client::new();
    let mut map = HashMap::new();
    let url = env::var("ACCESS_BOT_URL").unwrap();
    map.insert("text", msg);
    client.post(&url).json(&map).send().unwrap();
}
