// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const zkverify = require("zkverifyjs");

import * as zkverify from "zkverifyjs";
import * as fs from "fs";
import * as path from "path";
import { elizaLogger } from "@elizaos/core";
import { PROOF } from "./constants.js";

const VKEY = {
  protocol: "groth16",
  curve: "bn128",
  nPublic: 2,
  vk_alpha_1: [
    "20491192805390485299153009773594534940189261866228447918068658471970481763042",
    "9383485363053290200918347156157836566562967994039712273449902621266178545958",
    "1",
  ],
  vk_beta_2: [
    [
      "6375614351688725206403948262868962793625744043794305715222011528459656738731",
      "4252822878758300859123897981450591353533073413197771768651442665752259397132",
    ],
    [
      "10505242626370262277552901082094356697409835680220590971873171140371331206856",
      "21847035105528745403288232691147584728191162732299865338377159692350059136679",
    ],
    ["1", "0"],
  ],
  vk_gamma_2: [
    [
      "10857046999023057135944570762232829481370756359578518086990519993285655852781",
      "11559732032986387107991004021392285783925812861821192530917403151452391805634",
    ],
    [
      "8495653923123431417604973247489272438418190587263600148770280649306958101930",
      "4082367875863433681332203403145435568316851327593401208105741076214120093531",
    ],
    ["1", "0"],
  ],
  vk_delta_2: [
    [
      "16883516878801972492203679056021104601704770355965885542778949038857440044331",
      "15150240629169665917519416114016885982851475449033588014870972582753035086752",
    ],
    [
      "11535499134401042740866410077553289241480861140290193868902970914158018849134",
      "12976333428497159699593599627574936363236320429548316202451612671107133716567",
    ],
    ["1", "0"],
  ],
  vk_alphabeta_12: [
    [
      [
        "2029413683389138792403550203267699914886160938906632433982220835551125967885",
        "21072700047562757817161031222997517981543347628379360635925549008442030252106",
      ],
      [
        "5940354580057074848093997050200682056184807770593307860589430076672439820312",
        "12156638873931618554171829126792193045421052652279363021382169897324752428276",
      ],
      [
        "7898200236362823042373859371574133993780991612861777490112507062703164551277",
        "7074218545237549455313236346927434013100842096812539264420499035217050630853",
      ],
    ],
    [
      [
        "7077479683546002997211712695946002074877511277312570035766170199895071832130",
        "10093483419865920389913245021038182291233451549023025229112148274109565435465",
      ],
      [
        "4595479056700221319381530156280926371456704509942304414423590385166031118820",
        "19831328484489333784475432780421641293929726139240675179672856274388269393268",
      ],
      [
        "11934129596455521040620786944827826205713621633706285934057045369193958244500",
        "8037395052364110730298837004334506829870972346962140206007064471173334027475",
      ],
    ],
  ],
  IC: [
    [
      "18635637960557560857094512684047887771596119327447282264110915689478359176884",
      "2787739109285944951079006253283606975566487445507222876760682453501866793407",
      "1",
    ],
    [
      "5924520914420601398188001890215477493578059223690495899194579533928493711633",
      "10458548929339196911259801917183441320857030738864516659971366674948828826220",
      "1",
    ],
    [
      "700433635233066042387364180517373526251183001161528242738155819104314938031",
      "5917976447441905930232643207659393469418720332008787407970690068286695117993",
      "1",
    ],
  ],
};

const vkPlonk = {
  protocol: "plonk",
  curve: "bn128",
  nPublic: 2,
  power: 12,
  k1: "2",
  k2: "3",
  Qm: [
    "314013855978374923369702565841177805763269031992793136702282833779248451105",
    "18146887391086552213556968803126226979888588287534643245102272004934140475917",
    "1",
  ],
  Ql: [
    "18334002104132360873442221167578874375259939137540551163053278823612258841660",
    "3234084460928505313874762404392186392339346236119708897007715366091703340208",
    "1",
  ],
  Qr: [
    "15680272105563780634256050323566952121775807632185943980103018918158521509628",
    "2664410839247600450944673398582224968665545663026895707921468823666093316664",
    "1",
  ],
  Qo: [
    "20089254231848661011872488337773573468746651429139621782120176195575913677309",
    "4911200112980293323514821987037672852011231495832682851983474703627529420341",
    "1",
  ],
  Qc: [
    "2089662747355079946207942596639084874069204391741787581358217344753906885736",
    "6688023843035149300016563939475854060947142750487316897687475846972470675664",
    "1",
  ],
  S1: [
    "15088430369219508124669714986888290199420835824830143721041650765533782264762",
    "21384129094887962383123029746776192637810447058403566797067449106661318232973",
    "1",
  ],
  S2: [
    "9155996780246819867970142688713467082662539793546770225967015184315084472716",
    "19491574940496246429875193289703073842921236782781462341890492472508247426701",
    "1",
  ],
  S3: [
    "8064211208621143923331636179433588592674314951630704214334823642530640247044",
    "16373091525677200657332386592913441171476072080107284733821576767507591292803",
    "1",
  ],
  X_2: [
    [
      "21831381940315734285607113342023901060522397560371972897001948545212302161822",
      "17231025384763736816414546592865244497437017442647097510447326538965263639101",
    ],
    [
      "2388026358213174446665280700919698872609886601280537296205114254867301080648",
      "11507326595632554467052522095592665270651932854513688777769618397986436103170",
    ],
    ["1", "0"],
  ],
  w: "4158865282786404163413953114870269622875596290766033564087307867933865333818",
};
export const createZKVerifyService = (account: string) => {
  // async function importVK() {
  //   try {
  //     // Read the verification key from the JSON file
  //     elizaLogger.info(process.cwd());
  //     const vkPath = path.join(process.cwd(), "circuit/main.groth16.vkey.json");
  //     const vkJson = JSON.parse(fs.readFileSync(vkPath, "utf-8"));
  //     return vkJson;
  //   } catch (error) {
  //     console.error("Error importing verification key:", error);
  //     throw new Error("Failed to import verification key");
  //   }
  // }
  async function createVK(account: string) {
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
        .ultraplonk()
        .execute(VKEY);
      const { statementHash } = await transactionResult;
      elizaLogger.log(statementHash);
      return statementHash;
    } catch (error) {
      elizaLogger.error("Error in createVK:", error);
      throw error;
    }
  }

  async function getProof() {
    try {
      // // Read the verification key from the JSON file
      // const proofPath = path.join(process.cwd(), "circuit/proof.json");
      // const proofJson = JSON.parse(fs.readFileSync(proofPath, "utf-8"));
      // return proofJson;
      return PROOF;
    } catch (error) {
      elizaLogger.error("Error importing verification key:", error);
      throw new Error("Failed to import verification key");
    }
  }

  async function executeVerificationWithZkVerify() {
    // proof: unknown = null,
    // vk: unknown = null,
    // publicSignals: unknown = null
    if (!account) {
      throw new Error("Invalid parameters");
    }
    try {
      elizaLogger.info("account bofore creating vk:", account);
      const hashStatement = await createVK(account);
      elizaLogger.info("hashstatement:", hashStatement);
      const proof = await getProof();
      elizaLogger.info("proof:", proof);
      // Start a new zkVerifySession on our testnet
      const session = await zkverify.zkVerifySession
        .start()
        .Testnet()
        .withAccount(account);
      console.log("🚀 ~ createZKVerifyService ~ session:", session);

      // Execute the verification transaction
      const { events, transactionResult } = await session
        .verify()
        .groth16()
        .withRegisteredVk()
        .execute({
          proofData: {
            vk: VKEY,
            proof: proof,
            publicSignals: ["385", "5"],
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
      return session;
    } catch (error) {
      elizaLogger.error("Transaction failed:", error);
      throw error;
    }
  }

  return { executeVerificationWithZkVerify };
};
