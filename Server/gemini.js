// ... (previous setup code) ...
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace with your API key
const apiKey = "AIzaSyDTaMh_Lje1Y0MwygHYKx8AShNR18lORfo"; // Using a placeholder for safety

const genAI = new GoogleGenerativeAI(apiKey);
async function main() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        responseMimeType: "application/json", // <-- Set the MIME type
      },
    });

    const prompt = `Tell me 10 best possible business to start in location latitude 33.45 and long 73.44   Respond strictly in JSON format dont say anything else other than json
Example:
{
  top 10 :{
    "business1": {
     businessname : "Business Idea 1",
    description: "Description of Business Idea 1, the demand the saturation",
    successRate: "Success rate of Business Idea 1 ( just predict it higher success rate means more chances of success)",

    } 
    ... 9 more}
}`; // Instruct the model

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text(); // This should be JSON text

    console.log("Raw text response:", text); // See the raw text first

    // Parse the JSON text
    try {
      const jsonResponse = JSON.parse(text);
      console.log("Parsed JSON:", jsonResponse);
      console.log("Greeting:", jsonResponse.message); // Access data
    } catch (jsonError) {
      console.error("Failed to parse JSON:", jsonError);
      console.error("Non-JSON response received:", text);
    }
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

main();
