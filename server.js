const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware to handle urlencoded data and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files from the public directory
app.use(express.static('public'));

// Middleware to log API requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
});

// Route to serve the notes.html file
//app.get('public/notes', (req, res) => {
 // res.sendFile(path.join(__dirname, '/public/notes.html'));
  //console.log("Served notes.html");
//});


//testing
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
    console.log("Served notes.html");
});









// API route to get all saved notes
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading db.json:", err.message);
      return res.status(500).json({ error: "Failed to read notes data." });
    }
    console.log("Successfully read from db.json");
    res.json(JSON.parse(data));
  });
});

// API route to add a new note
app.post('/api/notes', (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };
  console.log("Attempting to save new note:", newNote);

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading db.json for write:", err.message);
      return res.status(500).json({ error: "Failed to add new note." });
    }
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error("Failed to write to db.json:", err.message);
        return res.status(500).json({ error: "Failed to save the note." });
      }
      console.log("Note saved successfully:", newNote.id);
      res.json(newNote);
    });
  });
});

// Bonus: API route to delete a note
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  console.log(`Attempting to delete note with ID: ${noteId}`);

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading db.json for delete:", err.message);
      return res.status(500).json({ error: "Failed to delete note." });
    }
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.id !== noteId);

    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error("Failed to write to db.json after delete:", err.message);
        return res.status(500).json({ error: "Failed to update notes after deletion." });
      }
      console.log(`Note with ID ${noteId} deleted successfully.`);
      res.json({ message: "Note deleted successfully" });
    });
  });
});

// Route to serve the index.html file for any other endpoint
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
  console.log("Served index.html");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
