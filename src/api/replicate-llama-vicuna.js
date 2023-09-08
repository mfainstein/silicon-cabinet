import Replicate from "replicate";
import ora from 'ora';
import { load } from "./credentials.js";

const replicate = new Replicate({
    auth: load("replicate", "key"),
});

export async function call(prompt, systemPrompt) {
    try {
        const spinner = ora({ spinner: 'pipe' }).start();
        const output = await replicate.run(
            "meta/llama-2-13b-chat:de18b8b68ef78f4f52c87eb7e3a0244d18b45b3c67affef2d5055ddc9c2fb678",
            {
                input: {
                    prompt: prompt,
                    system_prompt: systemPrompt
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