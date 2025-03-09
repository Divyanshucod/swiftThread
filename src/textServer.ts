const axios = require("axios");

const API_URL = "http://51.21.196.51:5050/get_embedding";  // Replace with your actual API route

const requestData = {
  text: "This is a sample text for embedding."  // Change this to your actual text
};

async function sendTextForEmbedding() {
  try {
    const response = await axios.post(API_URL, requestData, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("Response from Flask API:", response.data);
  } catch (error) {
    console.error("Error while calling API:", error);
  }
}

// Call the function
sendTextForEmbedding();