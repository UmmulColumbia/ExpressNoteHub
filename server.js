const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3007;

// Middleware to parse URL-encoded data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to log API requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
});

// POST route to add a new note
app.post('/api/notes', (req, res) => {
  // Extract title and text from the request body
  const { title, text } = req.body;
  
  // Check if both title and text are provided
  if (!title || !text) {
    return res.status(400).json({ error: "Title and text are required." });
  }

  // Create a new note with a unique ID
  const newNote = { title, text, id: uuidv4() };

  // Read the existing notes from 'db.json'
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading db.json for write:", err.message);
      return res.status(500).json({ error: "Failed to add new note." });
    }

    // Parse the existing notes
    const notes = JSON.parse(data);
    // Add the new note to the array
    notes.push(newNote);

    // Write the updated notes array back to 'db.json'
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error("Failed to write to db.json:", err.message);
        return res.status(500).json({ error: "Failed to save the note." });
      }
      console.log("Note saved successfully:", newNote.id);
      // Respond with the newly created note object
      res.json(newNote);
    });
  });
});

// Route to serve the index.html for any other endpoint
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
