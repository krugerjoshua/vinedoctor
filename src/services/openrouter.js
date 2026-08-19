const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function diagnoseImage(base64Image, mimeType) {
  console.log("=== VineDoctor diagnosis started ===");
  console.log("Image MIME type:", mimeType);
  console.log("Base64 length:", base64Image.length);
  console.log("API key exists:", !!import.meta.env.VITE_OPENROUTER_API_KEY);
  console.log("Current origin:", window.location.origin);

  console.log("About to send request to OpenRouter");
  console.log(
    "Model:",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free"
  );
  console.log("Referer:", window.location.origin);
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "VineDoctor",
    },
    body: JSON.stringify({
      model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
            {
              type: "text",
              text: `You are VineDoctor, a vineyard plant disease expert.
Analyze this photo and respond ONLY with valid JSON, no markdown, no backticks:
{
  "condition": "disease name or Healthy Plant",
  "severity": "high | medium | low",
  "description": "2-3 sentence explanation of what you see",
  "symptoms": ["symptom 1", "symptom 2"],
  "treatments": [
    {
      "product": "product name",
      "type": "Fungicide / Pesticide / Fertilizer etc",
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
  });

  console.log("OpenRouter fetch completed");
  console.log("Response status:", response.status);
  console.log("Response OK:", response.ok);
  console.log("Response URL:", response.url);
  
  const data = await response.json();
  
  console.log("Raw response:", JSON.stringify(data, null, 2));

  console.log("JSON parsing completed");
  console.log("Raw response:", data);

  if (!data.choices || !data.choices[0]) {
    throw new Error(data.error?.message || "No response from model");
  }

  const text = data.choices[0].message.content;
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
