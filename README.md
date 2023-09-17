# Silicon Cabinet

> "Every decision maker needs a cabinet." -- Unkown

> "Give me six hours to chop down a tree and I will spend the first four sharpening the axe."
-- Abraham Lincoln

![Lincoln's Cabinet](https://tile.loc.gov/storage-services/service/rbc/lprbscsm/scsm0440/001q.gif#h=400&w=800)

## Description

Silicon Cabinet is a versatile Node.js package that equips you with an advisory panel of AI agents for consultations. Built on top of various AI engines like ChatGPT, Replicate Llama, and more, this package enables simulated multi-stakeholder dialogues for an array of situations. From evaluating key performance indicators in a corporate environment to analyzing different strategic avenues, Silicon Cabinet delivers AI-guided perspectives and support for your decision-making processes.

### Example Scenarios

1. **Corporate Strategy Meeting**: Use Silicon Cabinet to simulate a boardroom discussion involving CEOs, CFOs, and CTOs to evaluate the financial and technological merits of a proposed merger.

2. **Public Health Policy**: Simulate a dialogue between epidemiologists, public health officials, and healthcare providers to assess the impact of implementing a new vaccination program.

3. **Choosing a College Major**: Use Silicon Cabinet to create a simulated conversation among career counselors, current students, and parents to help high school students decide on a college major.

4. **Wedding Planning**: Engage in a simulated dialogue between wedding planners, family members, and vendors to determine the logistics and theme of a wedding.

5. **Personal Finance and Investment**: Simulate a conversation among financial advisors, family members, and tax consultants to devise a long-term savings and investment strategy.

6. **Supply Chain Optimization**: Create a discussion among supply chain managers, logistics experts, and procurement officers to identify bottlenecks and optimize a global supply chain.

7. **Health and Wellness**: Create a simulated discussion between nutritionists, personal trainers, and family doctors to develop a personalized fitness and diet plan.


## Advantages of Using Silicon Cabinet over Single-Prompt, Single-Engine Approaches

| Feature/Aspect                     | Silicon Cabinet                                                | Single Prompt to Single Engine (e.g., ChatGPT)       |
| ---------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| **Diversity of Perspectives**      | Multiple AI agents with specialized roles can simulate various stakeholder viewpoints. | Limited to the perspective of a single engine, which can be generalized. |
| **Complexity of Discussion**       | Capable of handling multi-threaded discussions with back-and-forth among various roles. | Generally linear and one-sided discussions based on the initial prompt.  |
| **Role-Specific Expertise**        | Can configure AI agents to specialize in certain roles, thus simulating domain-specific knowledge. | Typically generalized knowledge, with no role-specific specialization.    |
| **Context Awareness**              | Maintains a running context, enabling a more nuanced and context-aware discussion. | Limited context that might not adapt as the discussion evolves.           |
| **Dynamic Interactions**           | Agents can influence each other's responses, offering a dynamic dialogue. | Static output based solely on the initial prompt, without dynamic interaction. |
| **Behavioral Parameters**          | Allows fine-tuning of behavior parameters to influence agent responses. | No built-in mechanism for behavioral adjustments.                           |
| **Human-In-The-Loop**              | Easily integrates human input for certain roles, making the discussion more realistic. | Generally, does not allow for real-time human input within the simulated discussion. |
| **Scalability**                    | Can easily scale to include more roles or different types of agents. | Limited to the capabilities of the single engine used.                       |


## Installation
Clone the repository and cd to the directory - 
```bash
npm install
```
## Configuration

### Credentials Configuration

To get started, you will need to provide credentials for the AI engines you intend to use. Create a JSON file (`credentials.json`) with the following structure:

```json
{
    "openAi": {
        "apiKey": "your-openai-api-key",
        "orgId": "your-org-id"
    },
    "replicate": {
        "key": "your-replicate-key"
    }
}
```

### Forum Configuration

For each discussion, you will need to provide a configuration file (`forum.json`). Here's an example:

```json
{
    "context": "Discuss: Do the benefits of social media outweigh its drawbacks?"
    "roles": [
        "General User",
        "Policy Maker",
        "Educator",
        "Healthcare Professional"
    ],
    "human-roles": [
        "Legal Expert"
    ],
    "behaviour-parameters": {
        "Policy Maker": {
            "conflict-resolution": 2,
            "data-drive": 3
        }
    }
}
```

## Usage

To run Sillicon Cabinet, execute the following command:

```bash
node index.js
```

### How it Works

- The first agent to speak is elected randomly.
- A moderator, powered by ChatGPT, is provided the context and the discussion so far.
- The moderator chooses the next speaker based on the discussion, references, and questions.
- If the role is a human role, you will be prompted to provide an argument for that role.
- Behaviour parameters can be fine-tuned to influence an agent's answers and behavior (TODO)

## License
MIT License

For more information, please refer to the [LICENSE](./LICENSE) file.
