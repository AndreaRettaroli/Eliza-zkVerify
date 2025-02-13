import {
  elizaLogger,
  Action,
  ActionExample,
  HandlerCallback,
  IAgentRuntime,
  // IDocumentService,
  Memory,
  State,
  ServiceType,
} from "@elizaos/core";
import { validateZKVerifyConfig } from "../environment.js";
import { createZKVerifyService } from "../services.js";
import { verifyInChatZKProofExamples } from "../examples.js";

export const executeInChatVerificationZKVerifyAction: Action = {
  name: "IN_CHAT_EXECUTE_ZK_VERIFY",
  similes: ["ZK PROOF", "VERIFY", "VERIFICATION KEY", "PROOF"],
  description: "Verify a zk proof using zk verify",

  validate: async (runtime, message) => {
    await validateZKVerifyConfig(runtime);
    const hasAttachment = message.content.attachments?.length > 0;
    const supportedTypes = ["json", "txt"];
    return (
      hasAttachment &&
      supportedTypes.includes(message.content.attachments[0].contentType)
    );
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
  ) => {
    elizaLogger.info("Start executeVerificationZKVerifyAction");
    elizaLogger.info("validating config and create key");
    const config = await validateZKVerifyConfig(runtime);
    const zkVerifyService = createZKVerifyService(config.ZKVERIFY_SIGNER_PK);

    try {
      const attachment = message.content.attachments[0];

      // TODO: review it
      const proof = attachment.text;
      // await runtime
      //   .getService<IDocumentService>(ServiceType.DOCUMENT)
      //   .processDocument(attachment);

      const exec = await zkVerifyService.executeVerificationWithZkVerify(proof);
      console.log("🚀 ~ exec:", exec);
      elizaLogger.info("Successfully verified the proof", exec);
      if (callback) {
        callback(
          {
            text: `The proof result is ${exec}. \n\n Successfully access the zk verify private content service`,
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
  examples: verifyInChatZKProofExamples as ActionExample[][],
} as Action;
