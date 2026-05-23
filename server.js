const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000; // Running this on Port 5000 so it doesn't conflict with Task 1

// Serve all static layout elements (HTML, CSS, JS) from this folder
app.use(express.static(__dirname));

// Default Route to serve our social media dashboard feed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Social Media Platform running smoothly at http://localhost:${PORT}`);
});