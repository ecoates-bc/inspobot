const express = require("express");
const path = require("path");
const utils = require("./utils");
const app = express();
const port = 8000;
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/character", async (req, res) => {
    const name_prompt = utils.getCharacterPrompt();
    const ai_name_response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: name_prompt.prompt,
        temperature: 0.9,
        max_tokens: 25,
    });
    const name_raw = ai_name_response.data.choices.map((c) => c["text"]);
    const name_result = name_raw[0].trim().replace(/\.$/, "");
    
    const quote_prompt = utils.getQuotePrompt(name_prompt.character, name_result);
    const ai_quote_response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: quote_prompt.prompt,
        temperature: 0.9,
        max_tokens: 250,
    });
    const quote_raw = ai_quote_response.data.choices.map((c) => c["text"]);
    const quote_result = quote_raw[0].trim();

    const image_prompt = utils.getImagePrompt(name_prompt.character, name_result, name_prompt.era);
    const ai_image_response = await openai.createImage({
        prompt: image_prompt.prompt,
        n: 1,
        size: "256x256",
    });

    const img_url = ai_image_response.data.data[0].url;

    res.send({
        "prompt": quote_prompt.prompt,
        "character": name_prompt.character,
        "name": name_result,
        "quote": quote_result,
        "portrait_url": img_url,
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});