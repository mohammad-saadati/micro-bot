require("dotenv").config();

const request = async (endpoint, body) => {
  const url = process.env.BASE_TRANSLATE_API + endpoint;

  const headers = {
    "Content-Type": "application/json",
    "one-api-token": process.env.ONE_API_TOKEN,
  };
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}):`, errorText);
    }

    return await response.json();
  } catch (error) {
    console.error("Request error:", error.message);
  }
};

module.exports = request;
