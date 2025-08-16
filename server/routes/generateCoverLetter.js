import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
const router = express.Router();
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.use(express.json());
router.use(fileUpload());

async function extractTextFromPDF(buffer) {
  const uint8Array = new Uint8Array(buffer);
  const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ") + "\n";
  }

  return text;
}

router.post("/generateCoverLetter", async (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).json({ error: "Resume PDF is required" });
  }

  const jobDescription = req.body.jobDescription;
  const resumeFile = req.files.resume;
  const resumeText = await extractTextFromPDF(resumeFile.data);

  const prompt =
    "Generate a cover letter for the following job description:\n" +
    jobDescription +
    "\n\nBased on my resume:\n" +
    resumeText +
    "Please fill as much detail as possible such as their name, the company name, and the job title. Make it sound professional and enthusiastic. Keep it concise and to the point.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const candidate = response.candidates?.[0];
    const coverLetter =
      candidate?.content?.parts?.map((part) => part.text || "").join("") || "";
    console.log("Generated cover letter:", coverLetter);
    console.log("Token usage:", response.usageMetadata?.totalTokenCount);
    console.log("Prompt:", prompt);
    res.json({ coverLetter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
});
export default router;
