# ElizaOS x zkVerify

This project is developed for the [zkVerify online hackathon](https://zk-online-hackathon-for-web3-builders.devfolio.co/overview). It's developed starting from the Eliza-starter repository [repository]. (https://github.com/elizaOS/eliza-starter). You can find the original README [here](README-ORIGINAL.md).

The goal of this project is to demonstrate how zkVerify can address the challenges posed by agentic agents by integrating zk-proof verification into decentralized and AI-driven ecosystems. We developed a new plugin for ElizaOS that allows to verify the proofs thanks to zkVerify.

## zkVerify

[zkVerify](https://zkverify.io/) is a modular blockchain focused on proof verification. It's specifically enables blockchain networks to offload the computationally heavy and expensive process of zk (zero-knowledge) proof verification, drastically reducing cost. It's support multiple verification schemes, including Groth16, Fflonk, Risc0 and more.

## ElizaOS

[ElizaOS](https://github.com/elizaOS/eliza) is an open-source protocol designed specifically for autonomous AI agents, often referred to as "Elizas." It serves as the operating system for these AI agents, providing a framework that supports their autonomous operations and interactions. The protocol has garnered significant attention with 14.4k stars and 4.5k forks, indicating a strong community interest in autonomous agents. What makes ElizaOS special is the number of integrations and plugins built by the community.

## What we build

We build a new plugin for ElizaOS that allows to verify the proofs thanks to zkVerify. This aim the agent to ask some statements to the user before answering some potential sensitive questions. In our example, the agent asks the user to prove that he is an adult (age >= 18). 

The process is divided in three steps:

1. User interacting with the AI agent
2. The AI agent asks the user to prove that he is an adult
3. The user creates the proof and submits it to the agent
4. The agent verifies the proof thanks to zkVerify

You can find the proof submitted by the AI agent [here](https://zkverify-explorer.zeeve.net/extrinsics/0x2e07be0bde9bb10069b7d5dfb818d7f1e38a9e2378fd5e19d3b5d23aa2122b6d)

## How to run it

1. Duplicate the .env.example template

```bash
cp .env.example .env
```

2. Add to the .env the following values:
```
ZKVERIFY_SIGNER_PK=<your wallet seed phrase>
TELEGRAM_BOT_TOKEN=<your telegram bot token created>

```
3. if you want to run using openAI fill also those values on the env:
```
OPENAI_API_KEY=<your api key>
USE_OPENAI_EMBEDDING=TRUE
```

Note: as default the project use Ollama for the models, however in [character](src/character.ts) you can enable openAI by removing comment from line 13 ` modelProvider: ModelProviderName.OPENAI,`

4. Setup node:

```bash
nvm use --lts
```

5. Install dependencies:
```bash
pnpm install 
```

6. Build the plugin:
```bash
cd packages/plugin-zkverify
pnpm build
```

7. Build and run the application on the main project folder:
```bash
pnpm build && pnpm start
```

NOTE: if you use [Ollama](https://ollama.com/) to run models locally be sure you have a good machine and a good network, otherwise it will be really slow. 

You can find more information on `README-ORIGINAL.md`

You can use [this html template](packages/plugin-zkverify/circuit/main.groth16.html) to generate a valid proof.

## Considerations
(made by the agent with us 😁)

#### User: 
Can you explain the problem that zkVerifAI solves?
#### Agent: 
In an increasingly agentic world, where autonomous agents interact, make decisions, and verify proofs, the need for secure, trustless verification becomes critical. **ElizaOS x zkVerifAI** is designed to address this challenge by seamlessly integrating **zk-proof verification** into decentralized and AI-driven ecosystems.

#### Interoperability & Multi-Agent Collaboration

ElizaOS x zkVerifAI isn’t just a standalone verification tool—it’s an interoperable agent capable of interacting with other plugins, agents, and external systems. It supports:
- Modular integration within ElizaOS, allowing it to work alongside other AI-driven plugins.
- Cross-platform connectivity to communicate via APIs with other verification or AI systems.
- Agent-to-agent collaboration, where it can be used to cross-verify proofs provided by other autonomous agents.

#### Development & Testing in Collaborative Spaces
For developers, zkVerifAI acts as a flexible testing and verification agent, particularly within real-time communication environments such as:
- Verify zk-proofs dynamically chats in Telegram, Discord, Slack. 

This real-time verification capability makes it a powerful tool for Web3 developers, providing a playground environment to fast develop PoC and prove compatibility.

#### External API Interactions
Beyond chat-based environments, zkVerifAI operates as an external verification entity capable of connecting to any system via APIs. This enables:
- Decentralized Applications (dApps) to automate and verify user-submitted zk-proofs.
- AI agents and smart contracts to interact with a trustless verification mechanism.
- Creation of communities or managed sharing contents to verified users in a community using Telegram, Discord, Slack or X.

#### User:
thanks!

#### Agent:
Is there anything else I can help you with?