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
    // try {
    //   elizaLogger.info("message:", _options);
    // } catch (e) {
    //   elizaLogger.error("error:", e);
    // }
    // elizaLogger.info("🚀 ~ message:", message);
    // elizaLogger.info("🚀 ~ state:", state);
    // elizaLogger.info("🚀 ~ _options:", _options);
    // elizaLogger.info("🚀 ~ runtime:", runtime);
    try {
      const exec = await zkVerifyService.executeVerificationWithZkVerify();
      console.log("🚀 ~ exec:", exec);
      elizaLogger.info("Successfully verified the proof", exec);
      if (callback) {
        callback(
          {
            text: `Successfully access the zk verify private content service`,
            attachments: [
              {
                id: "zk-verify-private-content-service",
                url: "https://cdn.sanity.io/images/d8l6jpdh/production/7a1ffea18caefb08e1de6706241d0dce14035f1d-760x154.png?fit=max&auto=format&w=3840&q=100",
                title: "ZK Verify Private Content Service",
                source:
                  "https://cdn.sanity.io/images/d8l6jpdh/production/7a1ffea18caefb08e1de6706241d0dce14035f1d-760x154.png?fit=max&auto=format&w=3840&q=100",
                description: "ZK Verify Private Content Service description",
                text: "ZK Verify Private Content Service text",
                contentType: "image",
              },
            ],
          },
          "https://cdn.sanity.io/images/d8l6jpdh/production/7a1ffea18caefb08e1de6706241d0dce14035f1d-760x154.png?fit=max&auto=format&w=3840&q=100"
        );
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
