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
            "replicate/llama-2-70b-chat:2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf",
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