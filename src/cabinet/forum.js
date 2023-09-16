//load json with context, roles etc.
// create agents
import { Agent, ENGINES } from './agent.js';
import * as fs from 'fs';
import * as path from 'path';
import { ChatGptAgent } from './agents/chat-gpt-agent.js';
import { ChatGptThreeAgent } from './agents/chat-gpt-three-agent.js';
import { ReplicateLlama270bAgent } from './agents/replicate-llama-2-70b-agent.js';
import { ReplicateLlamaVicunaAgent } from './agents/replicate-llama-vicuna-agent.js';
import { CONCLUSION_STRATEGIES, HALTING_STRATEGIES, Moderator } from './moderator.js';
import chalk from 'chalk';
import { Discussion } from '../helpers/discussion.js';
import { HumanPoweredAgent } from './agents/human-powered-agent.js';

const COLORS = [chalk.red, chalk.blue, chalk.green, chalk.magenta, chalk.yellow, chalk.cyan];

function loadForumConfiguration() {
    const FORUM_CONFIGURATION_PATH = path.join(process.cwd(), '/src/cabinet/forum.json');
    const forumConfigrationJson = fs.readFileSync(FORUM_CONFIGURATION_PATH);
    const forum = JSON.parse(forumConfigrationJson);
    return forum;
}

function createAgent(role, engine, otherRoles, color) {
    switch (engine) {
        case ENGINES.HUMAN_POWERED:
            return new HumanPoweredAgent(role, engine, otherRoles, color);
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
    let humanRoles = forum.humanRoles;
    let agents = [];
    let i = 0;
    for (let role of roles) {
        const enumKeys = Object.keys(ENGINES).filter(item => item != "HUMAN_POWERED"); //TODO: awkward way to do this
        let engine = ENGINES[enumKeys[i % enumKeys.length]];
        let color = COLORS[i % COLORS.length]
        i = i + 1;
        let agent = createAgent(role, engine, forum.roles.filter(item => item != role), color);
        console.log("Agent created: " + agent.role + " " + agent.engine);
        agents.push(agent);
    }
    let j = i + 1;
    for (let humanRole of humanRoles) {
        let color = COLORS[i % COLORS.length];
        let agent = createAgent(humanRole, ENGINES.HUMAN_POWERED, forum.humanRoles.filter(item => item != humanRole), color);
        j++;
        console.log("Agent (Human Powered) created: " + agent.role + " " + agent.engine);
        agents.push(agent);
    }
    return agents;
}

export async function discuss(agents) {
    let forum = loadForumConfiguration();
    let discussion = new Discussion(forum.context);
    let moderator = new Moderator(forum.roles, forum.humanRoles, HALTING_STRATEGIES.MAX_ARGUMENTS, CONCLUSION_STRATEGIES.SHORT)
    let nextSpeaker = agents[Math.floor(Math.random() * forum.roles.length)];
    let shouldModeratorHalt = false;
    while (!shouldModeratorHalt) {
        let agent = nextSpeaker;
        let argument = await agent.call(discussion.toString());
        let color = agent.getColor();
        discussion.addArgument(nextSpeaker.role, argument, color);
        let nextRoleToSpeak = await moderator.electSpeaker(discussion);
        nextSpeaker = agents.find(agent => agent.role?.toLowerCase() == nextRoleToSpeak?.toLowerCase());
        shouldModeratorHalt = await moderator.shouldHalt(discussion);
    }
    console.log("\n================================================================\n")
    moderator.conclude(discussion);
}