// Create web server
// 1. Load express module
// 2. Create an express application
// 3. Create a server
// 4. Start the server
const express = require('express');
const app = express();

// Load the comments module
const comments = require('./comments');

// Load the body-parser module
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments.getComments());
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.getComment(req.params.id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).end();
    }
});

// Add a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    const newComment = comments.addComment(comment);
    res.status(201).json(newComment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    const comment = req.body;
    const updatedComment = comments.updateComment(req.params.id, comment);
    if (updatedComment) {
        res.json(updatedComment);
    } else {
        res.status(404).end();
    }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    if (comments.deleteComment(req.params.id)) {
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});