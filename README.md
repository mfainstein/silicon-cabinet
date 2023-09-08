# Sillicon Cabinet

> "Every decision maker needs a cabinet" -- Anonymous

![Lincoln's Cabinet](https://tile.loc.gov/storage-services/service/rbc/lprbscsm/scsm0440/001q.gif#h=600&w=800))

## Description
Sillicon Cabinet is a versatile Node.js package offering a cabinet of AI agents for any consultations. Leveraging different AI engines like ChatGPT, Replicate Llama, etc., this package simulates conversations between multiple stakeholders in any context. Whether you're discussing KPIs in a B2B setting or exploring strategic options, Sillicon Cabinet provides AI-powered insights and decision-making aids.

## Installation
Install the package using npm:

```bash
npm install sillicon-cabinet
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
node index.js path/to/credentials.json path/to/forum.json
```

### How it Works

- The first agent to speak is elected randomly.
- A moderator, powered by ChatGPT, is provided the context and the discussion so far.
- The moderator chooses the next speaker based on the discussion, references, and questions.
- If the role is a human role, you will be prompted to provide an argument for that role.
- Behaviour parameters can be fine-tuned to influence an agent's answers and behavior.

## Contributing
We welcome contributions! Please check out the [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License
MIT License

For more information, please refer to the [LICENSE](./LICENSE) file.
