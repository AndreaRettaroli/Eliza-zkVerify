async function loadZKVerify() {
  const { zkVerifySession } = await import("zkverifyjs");
  return { zkVerifySession };
}

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const zkverify = require("zkverifyjs");

export const createZKVerifyService = (account: string) => {
  async function executeVerificationWithZkVerify(
    proof: unknown = null,
    vk: unknown = null,
    publicSignals: unknown = null
  ) {
    // const zk = await loadZKVerify();
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
