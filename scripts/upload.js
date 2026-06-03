const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataApiSecret = process.env.PINATA_API_SECRET;

const filePath = '../build.zip';  // Adjust the path if needed

async function uploadToPinata() {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form.getHeaders(), {
      headers: {
        'Authorization': `Bearer ${pinataApiKey}:${pinataApiSecret}`,
      },
      data: form,
    });

    console.log('CID:', response.data.IpfsHash);
  } catch (error) {
    console.error('Error uploading to Pinata:', error.response ? error.response.data : error.message);
  }
}

uploadToPinata();