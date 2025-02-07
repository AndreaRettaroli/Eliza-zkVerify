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
import { verifyZKProofExamples } from "../examples.js";

// async function getJsonFromFile(
//     runtime: IAgentRuntime,
//     fileName: string
// ): Promise<any> {
//     // Implementation can vary based on how you store or fetch files.
//     // For instance, if you store files in message.attachments:
//     // const file = runtime.memory.attachments?.find(a => a.filename === fileName);
//     // or if your runtime or Memory instance has a method getFile(fileName)

//     const file = runtime.getFile?.(fileName);
//     if (!file) {
//         throw new Error(
//             `File "${fileName}" was not found in the chat environment.`
//         );
//     }

//     // Convert the file content to a string, then parse as JSON.
//     const content = await file.getContentAsString();
//     return JSON.parse(content);
// }

export const executeVerificationZKVerifyAction: Action = {
  name: "EXECUTE_ZK_VERIFY",
  similes: ["ZK PROOF", "VERIFY", "VERIFICATION KEY", "PROOF"],
  description: "Verify a zk proof using zk verify",
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
    const config = await validateZKVerifyConfig(runtime);
    elizaLogger.info("config:", config.ZKVERIFY_SIGNER_PK);
    const zkVerifyService = createZKVerifyService(config.ZKVERIFY_SIGNER_PK);
    elizaLogger.info("zkVerifyService:", zkVerifyService);
    elizaLogger.info("here");
    elizaLogger.info("super!!!");
    // elizaLogger.info("🚀 ~ message:", message);
    // elizaLogger.info("🚀 ~ state:", state);
    // elizaLogger.info("🚀 ~ _options:", _options);
    // elizaLogger.info("🚀 ~ runtime:", runtime);
    try {
      const exec = await zkVerifyService.executeVerificationWithZkVerify();
      console.log("🚀 ~ exec:", exec);
      elizaLogger.info("Successfully verified the proof", exec);
      if (callback) {
        callback({
          text: `Successfully access this nudes`,
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
  examples: verifyZKProofExamples as ActionExample[][],
} as Action;
