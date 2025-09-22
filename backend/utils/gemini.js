import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiResponse = async (message) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);

    // Send response text
    return result.response.text();
  } catch (err) {
    console.error(err);
    return "Error generating response from Gemini.";
  }
};

export default getGeminiResponse;
