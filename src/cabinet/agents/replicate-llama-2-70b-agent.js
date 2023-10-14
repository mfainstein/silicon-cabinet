import { call, isValid } from "../../api/replicate-llama-2-70b.js";
import { Agent } from "../agent.js"
export class ReplicateLlama270bAgent extends Agent {
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
        return call(context, systemPrompt);
    }

    isValid() {
        return isValid();
    }

}