import { call as chatGptCall } from "../api/chat-gpt.js";
export const HALTING_STRATEGIES = {
    MAJORITY_CONSENSUS: "Consensus",
    MAX_ARGUMENTS: "MaxArguments",
}
export const CONCLUSION_STRATEGIES = {
    SHORT: "Short",
    LONG: "Long",
    NONE: "None"

}

export const MAX_ARGUMENTS = 10;
//TODO: allow 
export class Moderator {
    constructor(roles, humanRoles, haltingStrategy, conclusionStrategy) {
        this.roles = roles;
        this.humanRoles = humanRoles || [];
        this.haltingStrategy = haltingStrategy || HALTING_STRATEGIES.MAJORITY_CONCENCUS;
        this.conclusionStrategy = conclusionStrategy || CONCLUSION_STRATEGIES.NONE;
    }

    async electSpeaker(discussion) {
        let roles = this.roles.concat(this.humanRoles);
        let whoShouldSpeakNow = await this.call(discussion.toString());
        console.log("Moderator: " + whoShouldSpeakNow + " should speak next.");
        let electedRole = roles.find(role => role?.toLowerCase() == whoShouldSpeakNow?.toLowerCase());
        if (!electedRole) {
            return roles[Math.floor(Math.random() * roles.length)];
        }
        return electedRole;
    }

    getRoles() {
        return this.roles.concat(this.humanRoles);
    }

    async shouldHalt(discussion) {
        let roles = this.roles.concat(this.humanRoles);
        if (this.haltingStrategy == HALTING_STRATEGIES.MAJORITY_CONCENCUS) {
            let prompt = "answer with YES or NO only - given the following discussion: " + discussion.toString() + "\n================\n" + "Of the following roles: " + roles
                + " have they arrived in a majority concencus?"
            let answer = await chatGptCall(prompt);
            if (answer === "YES") {
                return true;
            }
        }
        if (this.haltingStrategy == HALTING_STRATEGIES.MAX_ARGUMENTS) {
            if (discussion.getArguments().length > MAX_ARGUMENTS) {
                return true;
            }
        }

        if (discussion.getArguments().length > 50) {
            return true;
        }
        return false;


    }

    async conclude(discussion) {
        if (this.conclusionStrategy == CONCLUSION_STRATEGIES.NONE) {
            return;
        }
        if (this.conclusionStrategy == CONCLUSION_STRATEGIES.LONG) {
            let prompt = "Summarize the following discussion in length: " + discussion.toString();
            let answer = await chatGptCall(prompt);
            console.log("Moderator: here's the summary of this discussion - \n" + answer);
            return answer;
        }
        if (this.conclusionStrategy == CONCLUSION_STRATEGIES.SHORT) {
            let prompt = "Summarize the following discussion in 3 short points: " + discussion.toString();
            let answer = await chatGptCall(prompt);
            console.log("Moderator: here's the summary of this discussion - \n" + answer);
            return answer;
        }

    }

    async call(context) {
        let prompt = "here is a context: " + context + "\n================\n" + "Of the following roles: " + this.roles.concat(this.humanRoles)
            + " choose one that should speak next given the context. Prefer those who were last referenced or that did not speak yet."
        return await chatGptCall(prompt);
    }
}