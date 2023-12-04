const express = require('express');

const app = express();
const port = 3000; // Change as needed

// Endpoint to reset the table
app.get('/version', async (req, res) => {
    res.status(200).json({ success: true, message: 'Ayoooooo bro said what?!' });
});

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});
