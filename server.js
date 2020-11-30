// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



app.get("/", function(req, res) {
  connection.query("SELECT * FROM notes;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { notes: data });
  });
});

// Create a new note
app.post("/api/notes", function(req, res) {
  connection.query("INSERT INTO notes (note) VALUES (?)", [req.body.notes], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new notes
    res.json({ id: result.id });
    console.log({ id: result.id });
  });
});

// Update a notes
app.put("/api/notes/:id", function(req, res) {
  connection.query("UPDATE notes SET notes = ? WHERE id = ?", [req.body.notes, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Delete a note
app.delete("/api/notes/:id", function(req, res) {
  connection.query("DELETE FROM notes WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
