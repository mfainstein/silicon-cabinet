//load json with context, roles etc.
// create agents
import { Agent, ENGINES } from './agent.js';
import * as fs from 'fs';
import * as path from 'path';
import { ChatGptAgent } from './agents/chat-gpt-agent.js';
import { ChatGptThreeAgent } from './agents/chat-gpt-three-agent.js';
import { ReplicateLlama270bAgent } from './agents/replicate-llama-2-70b-agent.js';
import { ReplicateLlamaVicunaAgent } from './agents/replicate-llama-vicuna-agent.js';
import { Moderator } from './moderator.js';
import chalk from 'chalk';

const COLORS = [chalk.red, chalk.blue, chalk.green, chalk.magenta, chalk.yellow, chalk.cyan];

function loadForumConfiguration() {
    const FORUM_CONFIGURATION_PATH = path.join(process.cwd(), '/src/cabinet/forum.json');
    const forumConfigrationJson = fs.readFileSync(FORUM_CONFIGURATION_PATH);
    const forum = JSON.parse(forumConfigrationJson);
    return forum;
}

function createAgent(role, engine, otherRoles, color) {
    switch (engine) {
        case ENGINES.CHAT_GPT:
            return new ChatGptAgent(role, engine, otherRoles, color);
        case ENGINES.CHAT_GPT_THREE:
            return new ChatGptThreeAgent(role, engine, otherRoles, color);
        case ENGINES.REPLICATE__LLAMA_2_70B:
            return new ReplicateLlama270bAgent(role, engine, otherRoles, color);
        case ENGINES.REPLICATE__LLAMA_VICUNA:
            return new ReplicateLlamaVicunaAgent(role, engine, otherRoles, color);
        default:
            return new ChatGptAgent(role, engine, otherRoles, color);
    }
}

export async function createAgents() {
    let forum = loadForumConfiguration();
    let roles = forum.roles;
    let agents = [];
    let i = 0;
    for (let role of roles) {
        const enumKeys = Object.keys(ENGINES);
        let engine = ENGINES[enumKeys[i % enumKeys.length]];
        let color = COLORS[i % COLORS.length]
        i = i + 1;
        let agent = createAgent(role, engine, forum.roles.filter(item => item != role), color);
        console.log("Agent created: " + agent.role + " " + agent.engine);
        agents.push(agent);
    }
    return agents;
}

export async function electSpeaker(roles, moderator, context) {
    let whoShouldSpeakNow = await moderator.call(context);
    console.log("Moderator: " + whoShouldSpeakNow + " should speak next.");
    let electedRole = roles.find(role => role?.toLowerCase() == whoShouldSpeakNow?.toLowerCase());
    if (!electedRole) {
        return roles[Math.floor(Math.random() * roles.length)];
    }
    return electedRole;
}

export async function discuss(agents) {
    let forum = loadForumConfiguration();
    let context = forum.context;
    let moderator = new Moderator(forum.roles);
    console.log("Discussing: " + context + "\n");
    let discussionLength = 10;
    let discussionArguments = 0;
    let nextSpeaker = agents[Math.floor(Math.random() * forum.roles.length)];
    for (let i = 0; i < discussionLength; i++) {
        let agent = nextSpeaker;
        let argument = await agent.call(context);
        context = context + "\n" + agent.getRole() + " : " + argument + "\n";
        let color = agent.getColor();
        console.log(color(agent.getRole() + ": " + argument));
        //TODO: electSpeaker should be a method of the moderator
        let nextRoleToSpeak = await electSpeaker(forum.roles.push(forum.humanRoles), moderator, context);
        nextSpeaker = agents.find(agent => agent.role?.toLowerCase() == nextRoleToSpeak?.toLowerCase());
    
    }
    console.log("\n================================================================\n")
}