const http = require("http");
const path = require("path");
const express = require("express");
let app = express();
var strftime = require('strftime');
let port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

router.get("/api/", function (req, res) {
  let unixDate = new Date().getTime();
  let time = new Date(unixDate).toGMTString();

  res.json({
    unix: unixDate,
    utc: time
  });
});


router.get("/api/:date?", (req,res) => {
  let { date } = req.params;
  let unixDate = "";
  let time = "";

  if (!isNaN(date)) {
    unixDate = Number(date);
  } else {
    unixDate = Date.parse(date);
  }
  time = new Date(unixDate).toGMTString();

  // console.log("unix: " + unixDate + " time " + time);
  
  if (!unixDate && unixDate !== 0) {
    res.json({
    error : "Invalid Date"
  });
  } else {
    res.json({
    unix: unixDate,
    utc: time
  });
  }

});


app.use(router);
app.listen(port, function () {
  console.log("server running on port " + port);
});
