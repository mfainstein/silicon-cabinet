import chalk from "chalk";

export const ENGINES = {
    HUMAN_POWERED: "human-powered",
    CHAT_GPT: "chat-gpt",
    CHAT_GPT_THREE: "chat-gpt-three",
    REPLICATE__LLAMA_2_70B: "replicate-llama-2-70b",
    REPLICATE__LLAMA_2_13B: "replicate-llama-2-13b"
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

    getValidEngineKeys() {
        let validEngines = [];
        for (let engine of Object.keys(ENGINES)) {

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

    isValid() {
        // overloaded
    }
}