import chalk from "chalk";

export const NUMBER_OF_ENGINES = 4;
export const ENGINES = {
    CHAT_GPT: "chat-gpt",
    CHAT_GPT_THREE: "chat-gpt-three",
    REPLICATE__LLAMA_2_70B: "replicate-llama-2-70b",
    REPLICATE__LLAMA_VICUNA: "replicate-llama-vicuna"
}

export class Agent {
    constructor(role, engine, otherRoles, color) {
        this.color = color || chalk.white;
        this.roles = otherRoles;
        this.role = role;
        if (!engine) {
            this.role = role;
            const enumKeys = Object.keys(ENGINES);
            const randomKey = enumKeys[Math.floor(Math.random() * enumKeys.length)];
            const randomValue = ENGINES[randomKey];
            this.engine = randomValue;
        }
        else {
            this.engine = engine;
        }
    }

    getRole() {
        return this.role;
    }

    getColor() {
        return this.color;
    }

    getEngine() {
        return this.engine;
    }


    async call(context) {
        // overloaded
    }
}