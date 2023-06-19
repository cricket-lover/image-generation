const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size, count } = req.body;
  const sizes = { small: "256x256", medium: "512x512", large: "1024x1024" };
  try {
    const { data } = await openai.createImage({
      prompt,
      n: Number(count),
      size: sizes[size],
    });

    res.json(data.data);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { generateImage };
