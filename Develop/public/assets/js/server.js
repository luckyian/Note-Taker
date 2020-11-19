var express = require("express");
var db = require("../../../db/db.json");



var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Create our server
var server = http.createServer(handleRequest);

server.listen(PORT, function () {
    console.log("Server is listening on PORT: " + PORT);
})
// Create a function for handling the requests and responses coming into our server
function handleRequest(req, res) {
    var path = req.url;

    // Depending on the URL, display a different HTML file.
    switch (path) {

        case "/notes":

            fs.readFile(__dirname + "/notes.html", function (err, data) {
                if (err) throw err;
                // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
                // an html file.
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });


        case "*":

            fs.readFile(__dirname + "/index.html", function (err, data) {
                if (err) throw err;
                // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
                // an html file.
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });








        // Here we use the fs package to read our index.html file

    };
}
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

//   app.get(db, function(req, res) {
//     var chosen = req.params.character;

//     console.log(chosen);

//     for (var i = 0; i < notes.length; i++) {
//       if (chosen === notes[i].routeName) {
//         return res.json(notes[i]);
//       }
//     }

//     return res.json(false);
//   });

app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;


    console.log(newNote);

    characters.push(newNote);

    res.json(newNote);
});
    // Starts our server

