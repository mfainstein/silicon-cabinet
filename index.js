import {createAgents, discuss} from "./src/cabinet/forum.js";

let agents = await createAgents();
await discuss(agents);