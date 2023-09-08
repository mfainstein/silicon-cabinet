import { call as chatGptCall } from "../../api/chat-gpt.js";
import { Agent } from "../agent.js"
export class ChatGptAgent extends Agent {
    createRoleAndContextPrompt(context) {
        return "Act as a " + this.role + "and asnwer without any introductions - 2-3 sentences. "
            + "These are the other roles participating in the discussion, you may ask them a question, agree/disagree with any of them on any matter: " + this.roles.join(",") + "."
            + "This is the discussion context: " + context;
    }

    async call(prompt) {
        let roleAndContextPrompt = this.createRoleAndContextPrompt(prompt);
        return chatGptCall(roleAndContextPrompt);
    }

}