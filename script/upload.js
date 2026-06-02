const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const apiKey = process.env.PINATA_API_KEY;
const apiSecret = process.env.PINATA_API_SECRET;
const filePath = 'path/to/your/build.zip'; // Replace with your file path

const form = new FormData();
form.append('file', fs.createReadStream(filePath));

axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
    headers: {
        ...form.getHeaders(),
        'pinata_api_key': apiKey,
        'pinata_api_secret': apiSecret      
    }
})
.then(response => {
    console.log('File uploaded! CID:', response.data.IpfsHash);
})
.catch(error => {
    console.error('Error uploading file:', error.response ? error.response.data : error.message);
});