import { Plugin } from "@elizaos/core";
import { executeVerificationZKVerifyAction } from "./actions/verifyProof.js";

export const zkVerifyPlugin: Plugin = {
  name: "zkverify",
  description: "zkVerify plugin for Eliza",
  actions: [executeVerificationZKVerifyAction],
  // evaluators analyze the situations and actions taken by the agent. they run after each agent action
  // allowing the agent to reflect on what happened and potentially trigger additional actions or modifications
  evaluators: [],
  // providers supply information and state to the agent's context, help agent access necessary data
  providers: [],
};
export default zkVerifyPlugin;
