import ora from 'ora';
import OpenAI from 'openai';
import { load } from "./credentials.js";

const apiClient = new OpenAI({
    apiKey: load("openAi", "apiKey"),
    organizationId: load("openAi", "orgId")
});

// Function to make the API call
export async function call(prompt) {
    try {
        const spinner = ora({ spinner: 'pipe' }).start();
        const completion = await apiClient.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: "user", content: prompt }],
        });
        spinner.stop();
        spinner.clear();
        return completion.choices[0].message.content;
    } catch (error) {
        spinner.stop();
        spinner.clear();
        return "Error: " + error.message;
    }
}