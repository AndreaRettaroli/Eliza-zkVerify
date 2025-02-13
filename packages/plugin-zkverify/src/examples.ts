import { ActionExample } from "@elizaos/core";

export const verifyZKProofExamples: ActionExample[][] = [
  [
    {
      user: "{{user1}}",
      content: {
        text: "can you verify this proof?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Sure! Let me verify the proof for you.",
        action: "EXECUTE_ZK_VERIFY",
      },
    },
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "can you verify a zk proof using zk verify?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "sure! let me verify the proof for you.",
        action: "EXECUTE_ZK_VERIFY",
      },
    },
  ],
];
export const verifyInChatZKProofExamples: ActionExample[][] = [
  [
    {
      user: "{{user1}}",
      content: {
        text: "can you veirfy the proof in the attachment?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Sure! Let me verify the proof for you.",
        action: "IN_CHAT_EXECUTE_ZK_VERIFY",
      },
    },
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "can you verify the attacched zk proof using zk verify?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "sure! let me verify the proof for you.",
        action: "IN_CHAT_EXECUTE_ZK_VERIFY",
      },
    },
  ],
];
export const registerVericationKeyExamples: ActionExample[][] = [
  [
    {
      user: "{{user1}}",
      content: {
        text: "Can you register this verification key?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Let me register the verification key for you.",
        action: "REGISTER_VERIFICATION_KEY",
      },
    },
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "Can you register a verification key?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Let me register the verification key for you.",
        action: "REGISTER_VERIFICATION_KEY",
      },
    },
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "Can you register this verification key?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Let me register the verification key for you.",
        action: "REGISTER_VERIFICATION_KEY",
      },
    },
    {
      user: "{{user1}}",
      content: {
        text: "thanks",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "would you like to verify a proof?",
      },
    },
    {
      user: "{{user1}}",
      content: {
        text: "yes, i want to verify a proof",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Sure! Let me verify the proof for you.",
        action: "EXECUTE_ZK_VERIFY",
      },
    },
  ],
];
