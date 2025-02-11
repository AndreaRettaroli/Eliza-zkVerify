import { createRequire } from "module";
const require = createRequire(import.meta.url);
const zkverify = require("zkverifyjs");
import * as fs from "fs";
import * as path from "path";

export const createZKVerifyService = (account: string) => {
  async function importVK() {
    try {
      // Read the verification key from the JSON file
      const vkPath = path.join(process.cwd(), "circuit/main.groth16.vkey.json");
      const vkJson = JSON.parse(fs.readFileSync(vkPath, "utf-8"));
      return vkJson;
    } catch (error) {
      console.error("Error importing verification key:", error);
      throw new Error("Failed to import verification key");
    }
  }
  async function createVK() {
    try {
      const vkJson = await importVK();

      const session = await zkverify.zkVerifySession
        .start()
        .Testnet()
        .withAccount(account);
      const { transactionResult } = await session
        .registerVerificationKey()
        .groth16()
        .execute(vkJson);
      const { statementHash } = await transactionResult;
      console.log(statementHash);
      return statementHash;
    } catch (error) {
      console.error("Error in createVK:", error);
      throw error;
    }
  }

  async function executeVerificationWithZkVerify(
    proof: unknown = null,
    vk: unknown = null,
    publicSignals: unknown = null
  ) {
    if (!account) {
      throw new Error("Invalid parameters");
    }
    try {
      // Start a new zkVerifySession on our testnet
      const session = await zkverify.zkVerifySession
        .start()
        .Testnet()
        .withAccount(account);
      //   console.log("🚀 ~ createZKVerifyService ~ session:", session);
      //     // Execute the verification transaction
      //     const { events, transactionResult } = await session
      //         .verify()
      //         .groth16()
      //         .execute({
      //             proofData: {
      //                 vk: vk,
      //                 proof: proof,
      //                 publicSignals: publicSignals,
      //             },
      //         });
      //     // Listen for the 'includedInBlock' event
      //     events.on(ZkVerifyEvents.IncludedInBlock, (eventData) => {
      //         console.log("Transaction included in block:", eventData);
      //     });
      //     // Listen for the 'finalized' event
      //     events.on(ZkVerifyEvents.Finalized, (eventData) => {
      //         console.log("Transaction finalized:", eventData);
      //     });
      //     // Handle errors during the transaction process
      //     events.on("error", (error) => {
      //         console.error(
      //             "An error occurred during the transaction:",
      //             error
      //         );
      //         throw error;
      //     });
      //     // Await the final transaction result
      //     const transactionInfo: pkg.VerifyTransactionInfo =
      //         await transactionResult;
      //     console.log("Transaction completed successfully:", transactionInfo);
      //     return transactionInfo;
      return session;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  }

  return { executeVerificationWithZkVerify };
};
