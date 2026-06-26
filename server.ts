import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// 1. API: Extract information from a document (OCR / Text Parse Simulator)
app.post("/api/extract", async (req, res) => {
  const { text, documentName, documentType } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No document text provided." });
  }

  // Graceful fallback if Gemini API is not available
  if (!ai) {
    console.log("No GEMINI_API_KEY set. Using local semantic parser fallback.");
    const fallbackData = getFallbackExtraction(text, documentName, documentType);
    return res.json({ ...fallbackData, isFallback: true });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Extract personal information and key details from the following document. Document Type: ${documentType || "Unknown"}, Document Name: ${documentName || "Unknown"}.
      
      Document Content:
      """
      ${text}
      """`,
      config: {
        systemInstruction: "You are an expert AI parser for Xinnava, a secure document vault. Extract key user details precisely. Return a JSON object matching the requested schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fullName: { type: Type.STRING, description: "Full legal name of the individual" },
            email: { type: Type.STRING, description: "Email address if found, otherwise empty" },
            phone: { type: Type.STRING, description: "Phone number if found, otherwise empty" },
            dateOfBirth: { type: Type.STRING, description: "Date of birth in YYYY-MM-DD or standard readable format" },
            country: { type: Type.STRING, description: "Country of issue or residence" },
            documentType: { type: Type.STRING, description: "The type of document (e.g. Passport, Resume, National ID, Birth Certificate)" },
            documentNumber: { type: Type.STRING, description: "Unique number or identifier of the document (ID, passport #, etc)" },
            expiryDate: { type: Type.STRING, description: "Expiry date if applicable, in YYYY-MM-DD format" },
            extractedSkillsOrDetails: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 3-5 key details, highlights, or skills extracted"
            },
            confidence: { type: Type.NUMBER, description: "A confidence score from 0.0 to 1.0 based on clarity of text" }
          },
          required: ["fullName", "documentType"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json({ ...parsedData, isFallback: false });
  } catch (error: any) {
    console.error("Gemini Extraction Error:", error);
    const fallbackData = getFallbackExtraction(text, documentName, documentType);
    return res.json({ ...fallbackData, isFallback: true, error: error.message });
  }
});

// 2. API: Match Government Schemes, Scholarships & Jobs based on profile info
app.post("/api/match-opportunities", async (req, res) => {
  const { profile } = req.body;

  if (!profile) {
    return res.status(400).json({ error: "No profile data provided." });
  }

  if (!ai) {
    const localMatches = getLocalMatches(profile);
    return res.json({ matches: localMatches, isFallback: true });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Based on this user profile, find and suggest 3 highly matched opportunities (such as government schemes, scholarships, or relevant jobs/internships).
      
      Profile details:
      - Name: ${profile.fullName}
      - Skills/Highlights: ${profile.extractedSkillsOrDetails?.join(", ") || "None"}
      - Country: ${profile.country || "United States"}
      - Document Types Vaulted: ${profile.documentTypesVaulted?.join(", ") || "None"}

      Create highly realistic matching programs.`,
      config: {
        systemInstruction: "You are Xinnava Opportunity Matcher. Generate 3 matching opportunities (combination of schemes, scholarships, or jobs). Return a JSON list of objects matching the schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "A unique short id" },
              title: { type: Type.STRING, description: "Title of opportunity (e.g. Merit-Based Tech Scholarship)" },
              provider: { type: Type.STRING, description: "The provider agency or company (e.g. Ministry of Education)" },
              type: { type: Type.STRING, description: "Type: 'Government Scheme', 'Scholarship', or 'Job'" },
              matchPercentage: { type: Type.NUMBER, description: "Match percentage integer from 75 to 99" },
              reward: { type: Type.STRING, description: "Benefit (e.g. $10,000 / Full Tuition / $85k base)" },
              deadline: { type: Type.STRING, description: "Deadline date (e.g. 2026-09-15)" },
              description: { type: Type.STRING, description: "1-sentence summary of why they qualify" }
            },
            required: ["id", "title", "provider", "type", "matchPercentage", "description"]
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "[]");
    return res.json({ matches: parsedData, isFallback: false });
  } catch (error: any) {
    console.error("Gemini Matching Error:", error);
    const localMatches = getLocalMatches(profile);
    return res.json({ matches: localMatches, isFallback: true });
  }
});

// Helper for local fallback parsing
function getFallbackExtraction(text: string, name: string = "", type: string = "") {
  const lowerText = text.toLowerCase();
  
  // Try to find a name
  let extractedName = "Jane Doe";
  if (name.includes("John") || lowerText.includes("john")) extractedName = "John Doe";
  else if (name.includes("Sarah") || lowerText.includes("sarah")) extractedName = "Sarah Jenkins";
  else if (name.includes("Alex") || lowerText.includes("alex")) extractedName = "Alex Mercer";
  else {
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length > 0 && lines[0].length < 30) {
      extractedName = lines[0];
    }
  }

  // Try to find an email
  let email = "user@xinnava.com";
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    email = emailMatch[0];
  }

  // Document types
  let docType = type || "Document";
  if (lowerText.includes("passport")) docType = "Passport";
  else if (lowerText.includes("resume") || lowerText.includes("curriculum") || lowerText.includes("experience")) docType = "Resume";
  else if (lowerText.includes("national id") || lowerText.includes("identity") || lowerText.includes("driver")) docType = "National ID";
  else if (lowerText.includes("scholarship") || lowerText.includes("degree") || lowerText.includes("certificate")) docType = "Academic Certificate";

  // Dummy details based on text keywords
  const details: string[] = [];
  if (lowerText.includes("react") || lowerText.includes("typescript") || lowerText.includes("developer")) {
    details.push("Frontend Engineer expertise with React/TS");
  }
  if (lowerText.includes("expires") || lowerText.includes("valid until")) {
    details.push("Expiration date extracted successfully");
  }
  if (lowerText.includes("passport") || lowerText.includes("issuing country")) {
    details.push("Biometric security standard document");
  }
  if (details.length === 0) {
    details.push("Extracted core structured biographical data");
    details.push("Verified credentials layout matched standard");
  }

  return {
    fullName: extractedName,
    email: email,
    phone: "+1 (555) 321-7890",
    dateOfBirth: lowerText.includes("1995") ? "1995-08-12" : "1992-04-25",
    country: lowerText.includes("united kingdom") || lowerText.includes("uk") ? "United Kingdom" : "United States",
    documentType: docType,
    documentNumber: lowerText.includes("passport") ? "UK-PASS-98725" : "US-DL-8239410",
    expiryDate: "2029-12-15",
    extractedSkillsOrDetails: details,
    confidence: 0.92
  };
}

function getLocalMatches(profile: any) {
  const isDeveloper = (profile.extractedSkillsOrDetails || []).some((s: string) => s.toLowerCase().includes("engineer") || s.toLowerCase().includes("react") || s.toLowerCase().includes("develop") || s.toLowerCase().includes("frontend"));
  
  if (isDeveloper) {
    return [
      {
        id: "job-1",
        title: "Senior Full Stack Engineer (AI Solutions)",
        provider: "Aetheria Labs Inc",
        type: "Job",
        matchPercentage: 96,
        reward: "$140,000/yr + Equity",
        deadline: "2026-08-10",
        description: "Perfect match for your expertise in TypeScript, React, and AI-driven workflow design."
      },
      {
        id: "sch-1",
        title: "Next-Gen Founders Tech Grant",
        provider: "Vercel & Stripe Alliance",
        type: "Scholarship",
        matchPercentage: 88,
        reward: "$15,000 Equity-Free Fund",
        deadline: "2026-09-30",
        description: "Matches your developer background and interest in pioneering secure, user-centric document vaults."
      },
      {
        id: "gov-1",
        title: "National Small Business Tech Subsidy",
        provider: "Department of Commerce",
        type: "Government Scheme",
        matchPercentage: 82,
        reward: "Up to $10k Cloud Credits & Grants",
        deadline: "2026-11-15",
        description: "Qualifies under the Digital Infrastructure Expansion Act based on registered software developer credentials."
      }
    ];
  }

  // Default generic high-quality matches
  return [
    {
      id: "sch-intl",
      title: "Global Excellence Scholarship Fund",
      provider: "International Education Trust",
      type: "Scholarship",
      matchPercentage: 94,
      reward: "Full Tuition Coverage & Living Stipend",
      deadline: "2026-10-05",
      description: "Highly aligned with your verified passport credentials and excellent academic records stored in your vault."
    },
    {
      id: "gov-scheme-1",
      title: "Universal Digital Identity Grant",
      provider: "Digital Access Commission",
      type: "Government Scheme",
      matchPercentage: 91,
      reward: "Free Secure Verification Hardware & $200 Token",
      deadline: "2026-07-20",
      description: "Direct match based on your newly uploaded national identity document."
    },
    {
      id: "job-coord",
      title: "Operations & Logistics Manager",
      provider: "Apex Global Supply",
      type: "Job",
      matchPercentage: 85,
      reward: "$82,000/yr Full Benefits",
      deadline: "2026-08-15",
      description: "Matches your organization credentials and administrative history verified in your vault."
    }
  ];
}

// Vite integration middleware & static server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // In dev mode, we dynamically import Vite to integrate the dev server middleware.
    // This allows fast reloads, and binds to port 3000 as required.
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Xinnava Server] Full-stack engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
