const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"))
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 10000;
app.use(express.static(path.join(__dirname, "public")));

/* INITIALIZE SEED SONGS */
seed_songs = new Map();
seed_songs.set("sad pop", "1zwMYTA5nlNjZxYrvBB2pV");           // Someone like you; Adele
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


app.get('/', (req, res) => {
  res.render("craft");
});

app.get("/selectMood", (req, res) => {
  user = req.query.userId
  
  // if user has no entries today, direct to form
  res.render("selectMood");
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
