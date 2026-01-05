const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.end("Welcome to the Cambodia Postal Code Project!");
});

app.get('/api/cam-postal-code', async (req, res) => {

    const queryParam = req.query.name;
    const fs = require('fs');
    const path = require('path');

    // Path to your JSON file
    const filePath = path.join(__dirname, 'data/cambodia-postal-code.json');

    // Read JSON file
    const rawData = fs.readFileSync(filePath, 'utf8');

    // Parse JSON to JavaScript array
    const postalCode = JSON.parse(rawData);

    // Example: filter employees in HR department
    const result = postalCode.filter(code => code.name === queryParam);
    result.forEach(element => {
        res.end(element.postal_code_range);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));