// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// DO THE THING HERE
app.get("/api/timestamp/:date", function (req, res) {
  
  
  //FIX SO IT WORKS WITH DATES LIKE 1-1-2000
  
  let urlDate = req.params.date;
  let dateInt = 0;
  let dateToUse = new Date()
  
  let regex = /\D/ 
  
  // if it contains something that's not a number (i.e., the thing is not a Unix timestamp)
  if (regex.test(urlDate) ){
    dateToUse = new Date(urlDate)
  }
  
  // if date is unix timestamp 
   else {
    dateInt = parseInt(urlDate);
    dateToUse = new Date(dateInt)
  
   }
  
  
  
    res.json(
      {unix: dateToUse.getTime(),
       utc: dateToUse.toUTCString()})       
  });


// if no date entered 
app.get("/api/timestamp", function (req,res){

      let newDate = new Date()
      res.json(
        {unix: newDate.getTime(),
        utc: newDate.toUTCString()})
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

