import { QUESTIONS_PROMPT } from "@/services/Constant";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { jobposition, jobdescription, duration, type } = await req.json();

  const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobposition)
    .replace("{{jobDescription}}", jobdescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      // model: "google/gemini-2.5-pro-exp-03-25:free",
      // model: "openrouter/optimus-alpha",
      model: "google/gemini-flash-1.5",
      messages: [
        {
          role: "user",
          content: FINAL_PROMPT,
        },
      ],
      // response_format: "json",
    });
    console.log(
      "in the generate question route - ",
      completion.choices[0].message
    );
    
    return NextResponse.json(completion.choices[0].message);
  } catch (e) {
    console.log("Error in route.jsx trycatch block -> ", e.message);
    return NextResponse.json(e.message);
  }
}







// // import { QUESTIONS_PROMPT } from "@/services/Constant";
// // import { NextResponse } from "next/server";
// // import OpenAI from "openai";

// // export async function POST(req) {
// //   try {
// //     // **Parse Request Body**
// //     const requestData = await req.json();
// //     const { jobposition, jobdescription, duration, type } = requestData;

// //     if (!jobposition || !jobdescription || !duration || !type) {
// //       throw new Error("Missing required fields in request body");
// //     }

// //     console.log(
// //       "Received Request Data:",
// //       jobposition,
// //       jobdescription,
// //       duration,
// //       type
// //     );

// //     // **Construct Final Prompt**
// //     const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobposition)
// //       .replace("{{jobDescription}}", jobdescription)
// //       .replace("{{duration}}", duration.toString()) // Ensure duration is a string
// //       .replace("{{type}}", type);
// //     console.log("Constructed Final Prompt:", FINAL_PROMPT);

// //     // **OpenAI Configuration & Request**
// //     const openai = new OpenAI({
// //       baseURL: "https://openrouter.ai/api/v1",
// //       apiKey: process.env.OPENROUTER_API_KEY,
// //     });

// //     // **UPDATED MODEL SPECIFICATION (Assuming Availability)**
// //     const MODEL_NAME = "nvidia/llama-3.1-nemotron-nano-8b-v1:free"; // Verify existence
// //     const response = await openai.chat.completions.create({
// //       model: `${MODEL_NAME}:free`, // Append :free if tier is part of the model spec
// //       messages: [
// //         {
// //           role: "user",
// //           content: FINAL_PROMPT,
// //         },
// //       ],
// //     });

// //     // **Logging & Response**
// //     console.log("Completion Response:", response);
// //     console.log("Content to Return:", response.choices[0].message.content);

// //     // **Error Handling for Response**
// //     if (
// //       !response ||
// //       !response.choices ||
// //       !response.choices[0].message?.content
// //     ) {
// //       throw new Error("Invalid response from OpenAI");
// //     }

// //     return NextResponse.json(response.choices[0].message.content);
// //   } catch (error) {
// //     console.error("Caught Error:", error.message, "Stack:", error.stack);
// //     return NextResponse.json({ error: error.message }, { status: 500 });
// //   }
// // }




// used this one and worked also

// import { QUESTIONS_PROMPT } from "@/services/Constant";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// export async function POST(req) {
//   try {
//     // Parse input
//     const { jobposition, jobdescription, duration, type } = await req.json();

//     // Prepare the prompt
//     const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobposition)
//       .replace("{{jobDescription}}", jobdescription)
//       .replace("{{duration}}", duration)
//       .replace("{{type}}", type);

//     // Initialize OpenAI client
//     const openai = new OpenAI({
//       baseURL: "https://openrouter.ai/api/v1",
//       apiKey: process.env.OPENROUTER_API_KEY,
//     });

//     // Call the OpenAI API
//     const completion = await openai.chat.completions.create({
//       model: "openrouter/optimus-alpha",
//       messages: [
//         {
//           role: "user",
//           content: FINAL_PROMPT,
//         },
//       ],
//       response_format: { type: "json_object" }, // Correct API format for OpenAI V1
//     });

//     // Parse the response (assuming the model returns a JSON object as content)
//     const rawContent = completion.choices[0]?.message?.content || "{}";
//     // let result;
//     // try {
//     //   result = JSON.parse(rawContent);
//     // } catch {
//     //   result = { error: "Failed to parse model response." };
//     // }
//     // console.log(result);
    
//     // Reply with structured JSON
//     // return NextResponse.json(result);
//     // console.log("raw content on route - ", rawContent);
    
//     return NextResponse.json(rawContent);
//   } catch (e) {
//     console.error("Error in question generation: ", e);
//     return NextResponse.json(
//       { error: e.message || "Unexpected error." },
//       { status: 500 }
//     );
//   }
// }
