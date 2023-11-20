const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve static files


let items = []; // In-memory storage
let currentId = 1;

// CREATE
app.post('/items', (req, res) => {
    const newItem = { id: currentId++, ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
});

// READ ALL
app.get('/items', (req, res) => {
    res.status(200).json(items);
});

// READ ONE
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.status(200).json(item);
});

// UPDATE
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    item.name = req.body.name;
    res.status(200).json(item);
});

// DELETE
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    items.splice(itemIndex, 1);
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Export for testing