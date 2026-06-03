const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// Your JWT token from Pinata
const jwtToken = 'JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZGYyZDU5Ni1mYjY4LTQyNGItYjJjYS02ZjVmZTRmOTk2NTAiLCJlbWFpbCI6InNhbnRvc2hwb3VkZWwwNi5jb20ubnBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtlWSIsInNjb3BlZEtlWSIsIjc2MjQ4NTI1YzMwYzU3NTM1NGU3Iiwic2NvcGVkS2V5U2VjcmV0IjoiMzkzNmJhMDQxMTU0ZjM2ZTBhODc0OWM3YjU3MGYzMzY2MjJjOGYxMDljMDY0YTQxNDNkNjE0OGM3OTI1YjFkYyIsImV4cCI6MTgxMjAyNjUzMX0.ogKqsrfY7w_8DxEC9T0qnd8nfRQgbZrklBWLJNwD-Io'; // Replace with your actual JWT token

// Path to the file you want to upload
const filePath = '../build.zip'; // Adjust to your file location

async function uploadToPinata() {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    // Debug: Log the header we're sending
    console.log('Sending file to Pinata gateway...');
    console.log('Auth Header:', `Bearer ${jwtToken}`);

    const response = await axios.post('https://brown-tragic-cardinal-373.mypinata.cloud/pinning/pinFileToIPFS', form.getHeaders(), {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
      data: form,
    });

    console.log('Success! CID:', response.data.IpfsHash);
  } catch (error) {
    console.error('Error uploading to Pinata:', error.response ? error.response.data : error.message);
  }
}

uploadToPinata();