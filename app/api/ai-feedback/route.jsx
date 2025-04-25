import { FEEDBACK_PROMPT } from "@/services/Constant";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  
  const { conversation } = await req.json();
  
  const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    JSON.stringify(conversation)
  );


  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-flash-1.5",
      messages: [
        {
          role: "user",
          content: FINAL_PROMPT,
        },
      ],
    });
    
    console.log(
      "response in route ai-feedback - ",
      completion.choices[0].message
    );
    
    return NextResponse.json(completion.choices[0].message);
  } catch (e) {
    console.error("Error in question generation: ", e);
    return NextResponse.json(
      { error: e.message || "Unexpected error." },
      { status: 500 }
    );
  }
}


// import { FEEDBACK_PROMPT } from "@/services/Constant";
// import OpenAI from "openai";
// import { NextResponse } from "next/server"; // <-- add this import

// export async function POST(req) {
//   const { conversation } = await req.json();
//   const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
//     "{{conversation}}",
//     JSON.stringify(conversation)
//   );

//   try {
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
//       response_format: { type: "json_object" },
//     });

//     const rawContent = completion.choices[0]?.message?.content || "{}";
//     console.log("ai feedback rawContent - ", rawContent);

//     // Safely parse JSON string
//     let feedbackObj;
//     try {
//       feedbackObj = JSON.parse(rawContent);
//     } catch (err) {
//       feedbackObj = { error: "Failed to parse model response." };
//     }
//     console.log("feedbackObj in route.jsx file - ", feedbackObj);
    

//     return NextResponse.json(feedbackObj);
//   } catch (e) {
//     console.error("Error in feedback generation: ", e);
//     return NextResponse.json(
//       { error: e.message || "Unexpected error." },
//       { status: 500 }
//     );
//   }
// }
