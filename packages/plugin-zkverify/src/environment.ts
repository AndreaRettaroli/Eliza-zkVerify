import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const zkVerifyEnvSchema = z.object({
  ZKVERIFY_SIGNER_PK: z.string().min(1, "zkVerify signer key"),
});

export type zkVerifyConfig = z.infer<typeof zkVerifyEnvSchema>;

export async function validateZKVerifyConfig(
  runtime: IAgentRuntime
): Promise<zkVerifyConfig> {
  try {
    const config = {
      ZKVERIFY_SIGNER_PK: runtime.getSetting("ZKVERIFY_SIGNER_PK"),
    };
    return zkVerifyEnvSchema.parse(config);
  } catch (error) {
    console.log("error::::", error);
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("\n");
      throw new Error(`ZK verify validation failed:\n${errorMessages}`);
    }
    throw error;
  }
}
