const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const jwtToken = 'eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZGYyZDU5Ni1mYjY4LTQyNGItYjJjYS02ZjVmZTRmOTk2NTAiLCJlbWFpbCI6InNhbnRvc2hwb3VkZWwwNi5jb20ubnBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijc2MjQ4NTI1YzMwYzU3NTM1NGU3Iiwic2NvcGVkS2V5U2VjcmV0IjoiMzkzNmJhMDQxMTU0ZjM2ZTBhODc0OWM3YjU3MGYzMzY2MjJjOGYxMDljMDY0YTQxNDNkNjE0OGM3OTI1YjFkYyIsImV4cCI6MTgxMjAyNjUzMX0'; // Replace with your actual JWT token

const filePath = '../build.zip'; // Adjust to your file path

async function uploadToPinata() {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    // Debug: Log the header we’re sending
    console.log('Sending file to Pinata pinning API...');
    console.log('Auth Header:', `Bearer ${jwtToken}`);

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS', // This is the correct pinning endpoint
      form.getHeaders(),
      {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
        data: form,
      }
    );

    console.log('Success! CID:', response.data.IpfsHash);
  } catch (error) {
    console.error('Error uploading to Pinata:', error.response ? error.response.data : error.message);
  }
}

uploadToPinata