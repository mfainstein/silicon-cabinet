import { call as chatGptCall } from "../api/chat-gpt.js";
export const HALTING_STRATEGIES = {
    CONCENCUS: "Concensus",
    MAX_ARGUMENTS: "chat-gpt-three",
}
export class Moderator {
    constructor(roles) {
        this.roles = roles;
        //this.haltingStrategy = haltingStrategy;

    }

    getRoles() {
        return this.roles;
    }

    async shouldHalt(context) {
        if (this.haltingStrategy == HALTING_STRATEGIES.CONCENCUS){
            let prompt = "answer with YES or NO only - given the following discussion: "+context+"\n================\n"+"Of the following roles: " + this.roles 
            + " choose one that should speak next given the context. Prefer those who were last referenced or that did not speak yet."
            let answer =  await chatGptCall(prompt);
        }
        if (this.haltingStrategy == HALTING_STRATEGIES.MAX_ARGUMENTS){
            let prompt = "answer with YES or NO only - given the following discussion: "+context+"\n================\n"+"Of the following roles: " + this.roles 
            + " choose one that should speak next given the context. Prefer those who were last referenced or that did not speak yet."
            let answer =  await chatGptCall(prompt);
        }

        
    }

    conclude() {

    }

    async call(context) {
        let prompt = "here is a context: "+context+"\n================\n"+"Of the following roles: " + this.roles 
        + " choose one that should speak next given the context. Prefer those who were last referenced or that did not speak yet."
        return await chatGptCall(prompt);
    }
}