import { call as replicateLlamaCallVicuna } from "../../api/replicate-llama-vicuna.js";
import { Agent } from "../agent.js"
export class ReplicateLlamaVicunaAgent extends Agent {
    createSystemPrompt() {
        return "Act as a " + this.role + " and answer as if you are " + this.role + " without any introductions except your answer. "
            + "These are the other roles participating in the discussion, you can reference, answer, ask a question, agree or disagree with them: " + this.roles.join(",") + "."
    }
    createPrompt(context) {
        return "This is the discussion context: " + context;
    }

    async call(prompt) {
        let systemPrompt = this.createSystemPrompt();
        let context = this.createPrompt(prompt);
        return replicateLlamaCallVicuna(context, systemPrompt);
    }

}