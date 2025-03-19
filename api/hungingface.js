export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  const imageBuffer = await response.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString("base64");
  res.status(200).json({ image: base64Image });
}
