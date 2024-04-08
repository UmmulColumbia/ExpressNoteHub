# ExpressNoteHub

## Description
The Note Taker application is designed to support small business owners and professionals in managing their daily tasks and organizing their thoughts effectively. Built with an Express.js backend, this application allows users to write, save, and retrieve notes, facilitating better task management and productivity. The front end of the application has been provided, and the task involves developing the backend functionality to create a full-fledged note-taking tool. Additionally, the application will be deployed to Render for easy access and use.

## Features
- Landing Page: A welcoming page that leads to the notes page.
- Notes Page: A functional page for viewing existing notes and adding    new ones.
- Note Saving: Users can save their notes with a title and body text.
- Note Retrieval: Users can view their list of saved notes.
- Dynamic Updates: The UI updates to show new or selected notes without  page reloads.
## Getting Started
Prerequisites
Node.js
npm (Node Package Manager)
## Installation
Clone the repository to your local machine.

Navigate to the project directory and install dependencies with npm:
npm install
To start the server, run:
npm start
Open your browser and go to http://localhost:3001 to view the application.
## Backend Setup
db.json
Serves as a simple database to store and retrieve notes.
Located at the root of the project, within the db folder.
API Routes
GET /api/notes: Retrieves all notes from db.json.
POST /api/notes: Adds a new note to db.json and returns the added note.
HTML Routes
GET /notes: Returns the notes.html file.
GET *: Returns the index.html file for any other routes accessed.
Bonus Feature
Delete Functionality
DELETE /api/notes/:id: Removes a note with the specified ID from db.json.
## Deployment
The application will be deployed to Render, providing easy access to users for managing their notes.
#### Enjoy organizing your thoughts and tasks. Happy note-taking!