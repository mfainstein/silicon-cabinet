# Sillicon Cabinet

> "Every decision maker needs a cabinet" -- Unkown

> "Give me six hours to chop down a tree and I will spend the first four sharpening the axe."
-- Abraham Lincoln



![Lincoln's Cabinet](https://tile.loc.gov/storage-services/service/rbc/lprbscsm/scsm0440/001q.gif#h=400&w=800)

## Description
Sillicon Cabinet is a Node.js package offering a cabinet of AI agents for any consultations. Leveraging different AI engines like ChatGPT, Replicate Llama, etc., this package simulates conversations between multiple stakeholders in any context. Whether you're discussing KPIs in a B2B setting or exploring strategic options, Sillicon Cabinet provides AI-powered insights and decision-making aids.

## Installation
Install the package using npm - cd to the cloned path:

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
