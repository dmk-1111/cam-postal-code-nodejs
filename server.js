const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*'
}));

app.get('/', (req,res)=>{
    res.end("Welcome to the Cambodia Postal Code Project!");
});

const fs = require('fs');
const path = require('path');

app.get('/api/en/cam-postal-code', async (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({ message: 'name is required' });
    }

    try {
        const filePath = path.join(__dirname, 'data/cambodia-postal-code.json');

        // Read file async
        const rawData = fs.readFileSync(filePath, 'utf8');
        const postalCode = JSON.parse(rawData);

        const result = postalCode.filter(
            code => code.name.toLowerCase() === name.toLowerCase()
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'No postal code found' });
        }

        // Send response ONCE
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/kh/cam-postal-code', async (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({ message: 'name is required' });
    }

    try {
        const filePath = path.join(__dirname, 'data/cambodia-postal-code-kh.json');

        // Read file async
        const rawData = fs.readFileSync(filePath, 'utf8');
        const postalCode = JSON.parse(rawData);

        const result = postalCode.filter(
            code => code.name.toLowerCase() === name.toLowerCase()
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'No postal code found' });
        }

        // Send response ONCE
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));