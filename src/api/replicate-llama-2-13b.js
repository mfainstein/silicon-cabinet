import Replicate from "replicate";
import ora from 'ora';
import { load } from "./credentials.js";

const replicate = new Replicate({
    auth: load("replicate", "key"),
});

export async function call(prompt, systemPrompt) {
    const spinner = ora({ spinner: 'pipe' }).start();
    try {
        const output = await replicate.run(
            "meta/llama-2-13b-chat:f4e2de70d66816a838a89eeeb621910adffb0dd0baba3976c96980970978018d",
            {
                input: {
                    prompt: prompt,
                    system_prompt: systemPrompt,
                    max_new_tokens: 10000
                }
            }
        );
        spinner.stop();
        spinner.clear();
        return output.join("");
    } catch (error) {
        spinner.stop();
        spinner.clear();
        return "Error: " + error.message;
    }
}