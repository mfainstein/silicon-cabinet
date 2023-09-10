import { call as chatGptCall } from "../../api/chat-gpt.js";
import { Agent } from "../agent.js"
import inquirer from 'inquirer';

export class HumanPoweredAgent extends Agent {
    async call() {
        let answers = await inquirer.prompt([{name: this.role, message:""+this.role+":"}]);
        return answers[this.role];
    
    }

}