const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
//app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next();
});
// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to server application."
  });
});
require("./app/routes/routes.js")(app);
//require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Your server available at http://localhost:${PORT}`);
});