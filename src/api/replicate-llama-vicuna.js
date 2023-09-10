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
            "replicate/vicuna-13b:6282abe6a492de4145d7bb601023762212f9ddbbe78278bd6771c8b3b2f2a13b",
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