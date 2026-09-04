import { NextRequest, NextResponse } from "next/server";

// This route talks to the Anthropic API server-side only — the key never
// reaches the browser. It needs ANTHROPIC_API_KEY set as an environment
// variable on the deployment (Vercel → Project → Settings → Environment
// Variables); without it, photo logging returns a clear error instead of a
// crash.
export const runtime = "nodejs";

const MODEL = "claude-haiku-4-5-20251001";

const SYSTEM_PROMPT = `You are a nutrition estimator inside an Indian food & fitness tracking app called Poshan. You are shown a photo of a meal — often Indian home cooking, sometimes packaged or restaurant food. Identify what's on the plate and estimate total nutrition for everything visible.

Respond with ONLY a JSON object, no other text, no markdown code fences, in exactly this shape:
{
  "name": "short plate description, e.g. 'Dal, rice and roti'",
  "estimatedGrams": <number, total estimated weight in grams of everything on the plate>,
  "calories": <number, total kcal for the whole plate>,
  "protein": <number, grams>,
  "carbs": <number, grams>,
  "fat": <number, grams>,
  "items": ["short food name", "short food name"],
  "confidence": "low" | "medium" | "high",
  "note": "one short sentence flagging anything uncertain — portion size, hidden oil/ghee, etc. Empty string if nothing to flag."
}

Be a careful, realistic estimator. Indian home cooking usually has more oil or ghee than it looks like from a photo — account for that rather than lowballing it. Portion sizes vary a lot between households, so use visible plate/bowl size as a reference. If you genuinely cannot identify any food in the image, set calories, protein, carbs and fat to 0, items to an empty array, and explain why in "note".`;

interface AnalyzeMealBody {
  imageBase64?: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Photo logging isn't fully set up yet — ask whoever manages the deployment to add an ANTHROPIC_API_KEY." },
      { status: 500 }
    );
  }

  let body: AnalyzeMealBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const dataUrl = body.imageBase64;
  if (!dataUrl || typeof dataUrl !== "string") {
    return NextResponse.json({ error: "No image provided." }, { status: 400 });
  }

  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|gif|webp));base64,(.+)$/);
  if (!match) {
    return NextResponse.json({ error: "That image format isn't supported — try a JPEG or PNG." }, { status: 400 });
  }
  const [, mediaType, base64Data] = match;

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: base64Data },
              },
              { type: "text", text: "Estimate the nutrition for this meal photo. Respond with only the JSON object described in the system prompt." },
            ],
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error("Anthropic API error", anthropicRes.status, errText);
      return NextResponse.json({ error: "Couldn't analyze the photo right now. Try again in a moment." }, { status: 502 });
    }

    const data = await anthropicRes.json();
    const raw: string = data?.content?.[0]?.text ?? "";
    const cleaned = raw
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Couldn't parse model output:", raw);
      return NextResponse.json({ error: "Couldn't read that estimate — try a clearer, well-lit photo." }, { status: 502 });
    }

    const num = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : Number(v) || 0);
    const confidence = parsed.confidence;

    return NextResponse.json({
      name: typeof parsed.name === "string" && parsed.name.trim() ? parsed.name.trim().slice(0, 80) : "Meal from photo",
      estimatedGrams: Math.max(0, Math.round(num(parsed.estimatedGrams))),
      calories: Math.max(0, Math.round(num(parsed.calories))),
      protein: Math.max(0, Math.round(num(parsed.protein) * 10) / 10),
      carbs: Math.max(0, Math.round(num(parsed.carbs) * 10) / 10),
      fat: Math.max(0, Math.round(num(parsed.fat) * 10) / 10),
      items: Array.isArray(parsed.items) ? parsed.items.filter((i) => typeof i === "string").slice(0, 12) : [],
      confidence: confidence === "low" || confidence === "high" ? confidence : "medium",
      note: typeof parsed.note === "string" ? parsed.note.slice(0, 200) : "",
    });
  } catch (err) {
    console.error("Photo analysis failed:", err);
    return NextResponse.json({ error: "Couldn't analyze the photo right now. Try again in a moment." }, { status: 500 });
  }
}
