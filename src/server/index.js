const dotenv = require('dotenv')
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch');

console.log(process.env.API_KEY + " hello");

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

app.post('/analyze', async function (req, res) {
    const urlToAnalyze = req.body.url;
    const apiKey = process.env.API_KEY;
    console.log("API Key: ", apiKey); 
    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=${encodeURIComponent(urlToAnalyze)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('API request failed.');
        }
        const data = await response.json();
        console.log("API Response: ", data); // Log the API response to the console
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to analyze the URL.' });
    }
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
