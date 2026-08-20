const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function diagnoseImage(base64Image, mimeType) {
    const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "VineDoctor",
            },
            body: JSON.stringify({
                model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                // Some models want a full data URL, others want raw base64
                                // Gemma wants the full data URL format like this
                                type: "image_url",
                                image_url: {
                                    url: `data:${mimeType};base64,${base64Image}`,
                                },
                            },
                            {
                                type: "text",
                                text: `You are VineDoctor, an expert in viticulture covering grapevine diseases, pest infestations, and nutrient deficiencies.

Carefully analyze this photo before diagnosing. Consider ALL possible causes:
- Fungal diseases (powdery mildew, downy mildew, black rot etc) — usually show as spots, lesions, or powdery coatings
- Nutrient deficiencies (iron, magnesium, zinc, potassium, calcium etc) — usually show as yellowing between veins, pale new growth, or leaf curl without spots
- Pest damage — usually shows as holes, distorted growth, or visible insects
- Environmental stress (sunburn, frost, drought) — usually affects whole sections of the canopy uniformly

Do NOT default to fungal disease. If the leaves show yellowing between veins with no spots or lesions, consider nutrient deficiency first.

Respond ONLY with valid JSON, no markdown, no backticks:
{
  "condition": "specific disease, deficiency or pest name — e.g. Iron deficiency (chlorosis), Magnesium deficiency, Powdery mildew",
  "category": "Nutrient deficiency | Fungal disease | Pest | Bacterial disease | Environmental stress | Healthy",
  "severity": "high | medium | low",
  "description": "2-3 sentence explanation of what you see and why you chose this diagnosis over alternatives",
  "symptoms": ["symptom 1", "symptom 2"],
  "treatments": [
    {
      "product": "product name",
      "type": "Fungicide / Fertilizer / Foliar spray / Pesticide etc",
      "usage": "how to apply it",
      "where_to_buy": ["retailer 1", "retailer 2"]
    }
  ],
  "action_steps": ["step 1", "step 2", "step 3"],
  "precautions": "safety note"
}`,
                            },
                        ],
                    },
                ],
            }),
        },
    );

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Raw response:", JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0]) {
        throw new Error(data.error?.message || "No response from model");
    }

    const text = data.choices[0].message.content;
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
}
