import {
  elizaLogger,
  Action,
  ActionExample,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  State,
} from "@elizaos/core";
import { validateZKVerifyConfig } from "../environment.js";
import { createZKVerifyService } from "../services.js";
import { registerVericationKeyExamples } from "../examples.js";

export const registerVerificationKeyAction: Action = {
  name: "REGISTER_VERIFICATION_KEY",
  similes: ["REGISTER VERIFICATION KEY", "REGISTER", "VERIFICATION KEY"],
  description: "register a verification key on zk verify",
  validate: async (runtime: IAgentRuntime) => {
    await validateZKVerifyConfig(runtime);
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
  ) => {
    elizaLogger.info("Start registerVerificationKeyOnZKVerify");
    elizaLogger.info("validating config and create key");
    const config = await validateZKVerifyConfig(runtime);
    const zkVerifyService = createZKVerifyService(config.ZKVERIFY_SIGNER_PK);

    try {
      const exec = await zkVerifyService.registerVerificationKeyOnZKVerify();
      console.log("🚀 ~ exec:", exec);
      elizaLogger.info("Successfully registered the proof", exec);
      if (callback) {
        callback({
          text: `The verification key is registered you can find the transaction hash in ${exec}.`,
        });
        return true;
      }
    } catch (error: any) {
      elizaLogger.error("Error in zkVerify plugin handler:", error);
      callback({
        text: `Error verifying proof: ${error.message}`,
        content: { error: error.message },
      });
      return false;
    }
  },
  examples: registerVericationKeyExamples as ActionExample[][],
} as Action;
