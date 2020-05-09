var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3131;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Storing all the tables
var reservations = [];
var waitlist = [];

var visiterCount = 0;


// Routing
app.get("/",
    function(req, res) {
        res.sendFile(path.join(__dirname, "home.html"));
        //visiterCount++;
    });
app.get("/reserve",
    function(req, res) {
        res.sendFile(path.join(__dirname, "reserve.html"));

    });
app.get("/tables",
    function(req, res) {
        res.sendFile(path.join(__dirname, "tables.html"));

    });


// Get reservation data via the api
app.get("/api/tables", function(req, res) {
    res.json(reservations);
});
app.get("/api/waitlist", function(req, res) {
    res.json(waitlist);

});


// Returns both the tables array and the waitlist array


app.post("/api/clear", function(req, res) {
    reservations.length = 0;
    waitlist.length = 0;
    res.json({ ok: true });

});
// app.get("/api/visitors", function(req, res) {
//     res.json(visiterCount);
// });

// Get new table data entry from POST
app.post("/api/tables", function(req, res) {
    //  var tableData = req.body;
    //console.log(tableData);
    // if (tableData && tableData.name) {
    //     tableData.routeName = tableData.name.replace(/\s+/g, "").toLowerCase();

    // }
    // console.log(tableData);
    if (reservations.length < 5) {
        reservations.push(req.body);
        console.log(reservations);
        res.json(true);
    } else {
        waitlist.push(req.body);
        res.json(false);
    }

    // reservations.json(tableData);
});

// Start the Server

app.listen(PORT, function() {
    console.log("App listening on port " + PORT)
});