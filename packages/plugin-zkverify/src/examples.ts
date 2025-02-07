import { ActionExample } from "@elizaos/core";

export const verifyZKProofExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to verify this proof?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure! Let me verify the proof for you.",
                action: "EXECUTE_ZK_VERIFY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "can you verify a zk proof using zk verify?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "sure! let me verify the proof for you.",
                action: "EXECUTE_ZK_VERIFY",
            },
        }
    ],
]

// export const getAPODExamples: ActionExample[][] = [
//     [
//         {
//             user: "{{user1}}",
//             content: {
//                 text: "What's the nasa Astronomy picture of the day?",
//             },
//         },
//         {
//             user: "{{agent}}",
//             content: {
//                 text: "Let me get the nasa image of the day.",
//                 action: "NASA_GET_APOD",
//             },
//         }
//     ],
//     [
//         {
//             user: "{{user1}}",
//             content: {
//                 text: "I love space.",
//             },
//         },
//         {
//             user: "{{agent}}",
//             content: {
//                 text: "Oh really, then let me get the nasa image of the day to make your day even better.",
//                 action: "NASA_GET_APOD",
//             },
//         }
//     ],
//     [
//         {
//             user: "{{user1}}",
//             content: {
//                 text: "I am in love with space and space travel.",
//             },
//         },
//         {
//             user: "{{agent}}",
//             content: {
//                 text: "Space is beautiful, dark, scary, and vast. Would you like to see a current photo of space from NASA?",
//             },
//         },
//         {
//             user: "{{user1}}",
//             content: {
//                 text: "yes",
//             },
//         },
//         {
//             user: "{{agent}}",
//             content: {
//                 text: "Here is the NASA Astronomy Picture of the Day.",
//                 action: "NASA_GET_APOD",
//             },
//         }
//     ],
//     [
//         {
//             user: "{{user1}}",
//             content: {
//                 text: "Space is beautiful, dark, scary, and unfathomably vast.",
//             },
//         },
//         {
//             user: "{{agent}}",
//             content: {
//                 text: "Indeed! Would you like to see a current photo from the NASA astronomy database?",
//             },
//         },
//         {
//             user: "{{user1}}",
//             content: {
//                 text: "yes",
//             },
//         },
//         {
//             user: "{{agent}}",
//             content: {
//                 text: "Here is the NASA Astronomy Picture of the Day.",
//                 action: "NASA_GET_APOD",
//             },
//         }
//     ],
//     [
//         {
//             user: "{{user1}}",
//             content: {
//                 text: "I'm a big fan of space and astronomy.",
//             },
//         },
//         {
//             user: "{{agent}}",
//             content: {
//                 text: "Would you like to see the Nasa Astronomy Picture of the Day?",
//             },
//         },
//         {
//             user: "{{user1}}",
//             content: {
//                 text: "yes",
//             },
//         },
//         {
//             user: "{{agent}}",
//             content: {
//                 text: "Here is the NASA Astronomy Picture of the Day.",
//                 action: "NASA_GET_APOD",
//             },
//         }
//     ]
// ];