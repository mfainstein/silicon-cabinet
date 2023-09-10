import { call as chatGptCall } from "../api/chat-gpt.js";
export const HALTING_STRATEGIES = {
    CONCENCUS: "Concensus",
    MAX_ARGUMENTS: "MAX_ARGUMENTS",
}

export const MAX_ARGUMENTS = 20;
//TODO: allow 
export class Moderator {
    constructor(roles, humanRoles, haltingStrategy) {
        this.roles = roles;
        this.humanRoles = humanRoles || [];
        this.haltingStrategy = haltingStrategy || HALTING_STRATEGIES.CONCENCUS;
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
        if (this.haltingStrategy == HALTING_STRATEGIES.CONCENCUS) {
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

    conclude() {

    }

    async call(context) {
        let prompt = "here is a context: " + context + "\n================\n" + "Of the following roles: " + this.roles.concat(this.humanRoles)
            + " choose one that should speak next given the context. Prefer those who were last referenced or that did not speak yet."
        return await chatGptCall(prompt);
    }
}