const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db = require("./app/models");
const corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// ce require est important, faut le laisser dans cette position sinon la functionnaliter de toute l'appli en mode off
require("./app/routes/turorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});