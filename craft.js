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


app.get('/', (req, res) => {
  res.render("craft");
});

app.get("/selectMood", (req, res) => {
  res.render("selectMood");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
