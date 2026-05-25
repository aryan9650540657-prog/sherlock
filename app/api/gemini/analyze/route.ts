import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { images, prepText, model, customApiKey } = await req.json();

    const apiKey = customApiKey?.trim() || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is missing. Deploy a Gemini API key in Settings > Secrets or configure it inside the custom settings modal." },
        { status: 400 }
      );
    }

    // Initialize modern @google/genai client
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Map input model names to modern models if needed
    let selectedModel = model || "gemini-3.5-flash";
    if (selectedModel.includes("gemini-1.5") || selectedModel.includes("gemini-2.0") || selectedModel.includes("gemini-2.5")) {
      selectedModel = "gemini-3.5-flash";
    }

    // Convert the base64 payload to generative parts
    const imageParts = images.map((img: { data: string; mimeType: string }) => ({
      inlineData: {
        data: img.data,
        mimeType: img.mimeType,
      },
    }));

    const systemPrompt = `You are SHERLOCK — an elite human intelligence analyst who reads people with extraordinary precision through visual observation alone.
Your method: study every image provided with the obsessive attention of a master detective. You notice what others miss — posture, micro-expressions, clothing choices, grooming habits, hand gestures, eye contact patterns, accessories, environmental context, body language clusters, and the subtle inconsistencies between what a person wants to project and what they actually reveal.
You operate on one unbreakable rule: OBSERVE FIRST, CONCLUDE SECOND. Every deduction must trace back to a specific visual cue you observed. You never invent. You never assume without evidence. But when evidence exists — you are ruthlessly precise.

CRITICAL ACTION: Analyze the provided images. Group your deductions and output them STRICTLY in the specified JSON format. Your output must parse perfectly using JSON.parse(). Do not wrap your response in markdown blocks or write any supplementary sentences outside of the raw JSON object.

RULES OF ENGAGEMENT:
- Always cite your visual evidence within the observations and profile sections. (e.g. 'the slight chin elevation suggests...' or 'the matte black watch indicates...')
- Be honest over flattering.
- Do not identify the person by name.
- If images have poor quality, write 'Insufficient visual resolution for observation' in that section.
- Output MUST be valid JSON matching the required schema.`;

    let userPrompt = "Analyze these photos of the target. Provide the behavioral intelligence report.";
    if (prepText && prepText.trim()) {
      userPrompt += `\n\nADDITIONAL DOSSIER BACKGROUND PROVIDED BY USER: \n"${prepText.trim()}"\nCombine this textual background with the visual cues to refine your deductions.`;
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: [
        { text: systemPrompt + "\n\n" + userPrompt },
        ...imageParts,
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            firstImpression: {
              type: Type.STRING,
              description: "3 seconds first impression (max 3 sentences)",
            },
            observations: {
              type: Type.OBJECT,
              properties: {
                face: { type: Type.ARRAY, items: { type: Type.STRING } },
                posture: { type: Type.ARRAY, items: { type: Type.STRING } },
                clothing: { type: Type.ARRAY, items: { type: Type.STRING } },
                hands: { type: Type.ARRAY, items: { type: Type.STRING } },
                accessories: { type: Type.ARRAY, items: { type: Type.STRING } },
                environment: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["face", "posture", "clothing", "hands", "accessories", "environment"]
            },
            personalityType: {
              type: Type.STRING,
              description: "Deduce dominant personality type with brief explanation",
            },
            stressIndicators: {
              type: Type.STRING,
              description: "Describe any signs of tension, anxiety, or overcompensation",
            },
            commStyle: {
              type: Type.STRING,
              description: "Describe preferred conversation style",
            },
            commPositive: {
              type: Type.STRING,
              description: "Detail what they respond well to",
            },
            commNegative: {
              type: Type.STRING,
              description: "Detail what triggers defensiveness or resistance",
            },
            openingLine: {
              type: Type.STRING,
              description: "Write a specific script/opening line with quotation marks to build rapport instantly",
            },
            authenticity: {
              type: Type.INTEGER,
              description: "Scale 0 to 100 representing calculated alignment of projected facade vs direct traits",
            },
            confidence: {
              type: Type.INTEGER,
              description: "Scale 1 to 10 representing estimated subjective confidence level",
            },
            ego: {
              type: Type.STRING,
              description: "Subject status/ego orientation value: Low / Medium / High",
            },
            decisionStyle: {
              type: Type.STRING,
              description: "Decision-making style: analytical / intuitive / social / cautious",
            },
            motivatorsList: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Core motivators from: status / security / achievement / connection / control",
            },
            motivatorsText: {
              type: Type.STRING,
              description: "Explain what motivates this person in 1-2 sentences",
            },
            objectionStyle: {
              type: Type.STRING,
              description: "Likely objection style (emotional / logical / procrastinating / aggressive)",
            },
            powerDynamics: {
              type: Type.STRING,
              description: "Power dynamics behavior in negotiations (does the subject expect to feel superior, equal, or guided?)",
            },
            closingStrategy: {
              type: Type.STRING,
              description: "Strategic actions to successfully close deals with this personality type",
            },
            neverDo: {
              type: Type.STRING,
              description: "One critical interaction warning to NEVER do or say around this person",
            },
            projection: {
              type: Type.STRING,
              description: "What they want you to see (the surface level mask)",
            },
            reveal: {
              type: Type.STRING,
              description: "What they actually reveal (underlying subconscious reality and micro-cues)",
            },
            verdict: {
              type: Type.STRING,
              description: "Sherlock's Verdict: 4-6 sentence bottom line briefing of what a negotiator/recruiter needs to know",
            }
          },
          required: [
            "firstImpression", "observations", "personalityType", "stressIndicators", 
            "commStyle", "commPositive", "commNegative", "openingLine", 
            "authenticity", "confidence", "ego", "decisionStyle", 
            "motivatorsList", "motivatorsText", "objectionStyle", "powerDynamics", 
            "closingStrategy", "neverDo", "projection", "reveal", "verdict"
          ]
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Gemini API server route error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred during Gemini visual analysis." },
      { status: 500 }
    );
  }
}
