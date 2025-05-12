const express = require("express");
const app = express();
const path = require("path");
const axios = require('axios');
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"))
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 10000;
app.use(express.static(path.join(__dirname, "public")));

/* INITIALIZE SEED SONGS */
seed_songs = new Map();
seed_songs.set("sad pop", "7qEHsqek33rTcFNT9PFqLf");           // Someone you loved; Lewis Capaldi
seed_songs.set("neutral pop", "3pHkh7d0lzM2AldUtz2x37");       // The Archer; Taylor Swift
seed_songs.set("happy pop", "4kbj5MwxO1bq9wjT5g9HaA");         // Shut up and dance; Walk the Moon
seed_songs.set("sad classic", "7nHvS6UUhz2gJhj8TIROLX");       // Adagio for Strings; Samuel Barber
seed_songs.set("neutral classic", "6kf7ZCJjEbjZXikivKOsvJ");   // Claire de Lune; Claude Debussy
seed_songs.set("happy classic", "5rk76Ugo6ZWsciJwvCQ4vH") ;    // Spring; Vivaldi
seed_songs.set("sad rock", "5Xak5fmy089t0FYmh3VJiY");          // Black; Pearl Jam
seed_songs.set("neutral rock", "5UWwZ5lm5PKu6eKsHAGxOk");      // Everlong; Foo Fighters
seed_songs.set("happy rock", "7hQJA50XrCWABAu5v6QZ4i") ;       // Don't Stop Me Now; Pearl Jam
seed_songs.set("sad rap", "561jH07mF1jHuk7KlaeF0s");           // Mockingbird; Eminem
seed_songs.set("neutral rap", "7KXjTSCq5nL1LoYtL7XAwS");       // HUMBLE; Kendrick Lamar
seed_songs.set("happy rap", "4cnqxdE2opmhp7MwkvhkAJ") ;        // Good Day; Nappy Roots
seed_songs.set("sad jazz", "1wl5b2lw3YagQtZiYZbQWP");          // 'Round Midnight; Thelonious Monk
seed_songs.set("neutral jazz", "4vLYewWIvqHfKtJDk8c8tq");      // So What; Miles Davis
seed_songs.set("happy jazz", "5L8ta4ECl5zeA6bGqY7G38") ;       // Sing, sing, sing; Benny Goodman
seed_songs.set("sad funk", "2uMqG8w8oi09fB2YA2QLOm");          // Summer Madness; Kool & The Gang
seed_songs.set("neutral funk", "2x1LQq8lsUzAA2wNj8yjC9");      // Pick Up the Pieces; Average White Band
seed_songs.set("happy funk", "5XeSAezNDk9tuw3viiCbZ3") ;       // Get Up Offa That Thing; James Brown


user = ""

app.get('/', (req, res) => {
  res.render("craft");
});

app.get("/selectMood", (req, res) => {
  user = req.query.userId;
  console.log(user);
  
  res.render("selectMood");
});

app.post("/suggestions", (req, res) => {
  
  mood = ""
  if (req.body.valence >= 0.66) {
    mood = "happy"
  } else if (req.body.valence >= 0.33) {
    mood = "neutral"
  } else {
    mood = "sad"
  }
  song_type = mood + " " + req.body.genre;
  seed_song = seed_songs.get(song_type);
  console.log(song_type);

  // Send API request
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.reccobeats.com/v1/track/recommendation?size=100&seeds=${seed_song}&danceability=${req.body.danceability}&instrumentalness=${req.body.instrumentalness}&loudness=${req.body.loudness}&valence=${req.body.valence}`,
    headers: { 
      'Accept': 'application/json'
    }
  };

  (async () => {
    try {
      const response = await axios.request(config);
      const data = response.data;
      //console.log(data);
      songs = data.content;
      songs.sort((a, b) => b.popularity - a.popularity);
      songs = songs.slice(0, 10);
      const songRec = songs[Math.floor(Math.random() * songs.length)];
      console.log(songRec)

    } catch (e) {
      console.log(e)
    }
  })();

});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
