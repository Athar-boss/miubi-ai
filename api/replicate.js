export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${process.env.REPLICATE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316",
      input: { prompt: prompt }
    }),
  });

  const data = await response.json();
  res.status(200).json({ prediction_id: data.id });
}
