const express = require('express');

const app = express();
const port = 3000; // Change as needed

app.get('/api/getTableData', async (req, res) => {
  try {
    // Retrieve all items from the database
    const allItems = await tableDataCollection.getAll();

    // Convert the items to an array
    const tableData = Object.values(allItems);

    res.json(tableData);
  } catch (error) {
    console.error('Error retrieving table data:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Endpoint to reset the table
app.post('/version', async (req, res) => {
    res.status(200).json({ success: true, message: 'Ayoooooo bro said what?!' });
});

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});
