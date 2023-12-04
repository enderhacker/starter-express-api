const express = require('express');
const bodyParser = require('body-parser');
const CyclicDb = require("@cyclic.sh/dynamodb");

const app = express();
const port = 3000; // Change as needed

app.use(bodyParser.json());

const db = CyclicDb("calm-blue-ponchoCyclicDB");
const tableDataCollection = db.collection("tableData");

// Endpoint to store information
app.post('/api/newInfo', async (req, res) => {
  try {
    const { event, address, time } = req.body;
    const newInfo = { event, address, time };

    // Store the new information in the database
    await tableDataCollection.set(time, newInfo);

    res.json({ success: true, message: 'Information added successfully' });
  } catch (error) {
    console.error('Error storing information:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Endpoint to retrieve information
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
app.post('/api/resetTable', async (req, res) => {
  try {
    // Clear all items in the database collection
    await tableDataCollection.clear();

    res.json({ success: true, message: 'Table reset successfully' });
  } catch (error) {
    console.error('Error resetting table:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});
