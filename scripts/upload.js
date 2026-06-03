const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const pinataApiKey = '76248525c30c575354e7';
const pinataApiSecret = '3936ba041154f36e0a8749c7b570f336622c8f109c064a4143d6148c7925b1dc';

const filePath = '../build.zip'; // Adjust path as needed

async function uploadToPinata() {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const authHeader = `Bearer ${pinataApiKey}:${pinataApiSecret}`;

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form.getHeaders(), {
      headers: {
        'Authorization': authHeader,
      },
      data: form,
    });

    console.log('CID:', response.data.IpfsHash);
  } catch (error) {
    console.error('Error uploading to Pinata:', error.response ? error.response.data : error.message);
  }
}

uploadToPinata();