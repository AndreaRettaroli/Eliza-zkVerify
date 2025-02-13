import { createRequire } from "module";
const require = createRequire(import.meta.url);
const zkverify = require("zkverifyjs");

import { elizaLogger } from "@elizaos/core";
import { PROOF, PUBLIC_SIGNALS, VKEY } from "./constants.js";

export const createZKVerifyService = (account: string) => {
  /** Those inputs can be taken via api call or as well passed via file in the chat provider e.g. Telegram, Discord, Slack */
  function getVKey() {
    try {
      return VKEY;
    } catch (error) {
      elizaLogger.error("Error importing verification key:", error.message);
      throw new Error("Failed to import verification key");
    }
  }
  function getProof() {
    try {
      return PROOF;
    } catch (error) {
      elizaLogger.error("Error importing proof:", error.message);
      throw new Error("Failed to import verification key");
    }
  }
  function getPublicSignals() {
    return PUBLIC_SIGNALS;
  }

  async function registerVerificationKeyOnZKVerify() {
    try {
      elizaLogger.info("account:", account);
      const session = await zkverify.zkVerifySession
        .start()
        .Testnet()
        .withAccount(account);
      elizaLogger.info("prova prova");

      elizaLogger.log("vkJson:", VKEY);
      elizaLogger.log("start createVK");

      const { transactionResult } = await session
        .registerVerificationKey()
        .groth16(zkverify.Library.snarkjs, zkverify.CurveType.bn128)
        .execute(VKEY);
      const { statementHash } = await transactionResult;
      elizaLogger.log(statementHash);
      return statementHash;
    } catch (error) {
      elizaLogger.error("Error message in createVK:", error.message);
      throw error;
    }
  }

  async function executeVerificationWithZkVerify(
    injectedProof: string | undefined = undefined
  ) {
    if (!account) {
      throw new Error("Invalid parameters");
    }
    try {
      elizaLogger.info("account bofore creating vk:", account);

      const vkey = getVKey();

      const proof = injectedProof ? injectedProof : getProof();

      const publicSignals = getPublicSignals();

      elizaLogger.info("proof:", proof);
      // Start a new zkVerifySession on our testnet
      const session = await zkverify.zkVerifySession
        .start()
        .Testnet()
        .withAccount(account);

      // Execute the verification transaction
      const { events, transactionResult } = await session
        .verify()
        .groth16(zkverify.Library.snarkjs, zkverify.CurveType.bn128)
        // .withRegisteredVk()
        .execute({
          proofData: {
            vk: vkey,
            proof: proof,
            publicSignals: publicSignals,
          },
        });
      // Listen for the 'includedInBlock' event
      events.on(zkverify.ZkVerifyEvents.IncludedInBlock, (eventData) => {
        elizaLogger.info("Transaction included in block:", eventData);
      });
      // Listen for the 'finalized' event
      events.on(zkverify.ZkVerifyEvents.Finalized, (eventData) => {
        elizaLogger.info("Transaction finalized:", eventData);
      });
      // Handle errors during the transaction process
      events.on("error", (error) => {
        elizaLogger.error("An error occurred during the transaction:", error);
        throw error;
      });
      // Await the final transaction result
      const transactionInfo = await transactionResult;
      elizaLogger.info("Transaction completed successfully:", transactionInfo);
      return transactionInfo;
    } catch (error) {
      elizaLogger.error("Transaction failed:", error.message);
      throw error;
    }
  }

  return { executeVerificationWithZkVerify, registerVerificationKeyOnZKVerify };
};
