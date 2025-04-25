// "use client";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { Loader2Icon } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";
// import QuestionListContainer from "./QuestionListContainer";

// const QuestionList = ({ formData }) => {
//   const [loading, setLoading] = useState(true);
//   const [questionList, setQuestionList] = useState();
//   useEffect(() => {
//     if (formData) {
//       GenerateQuestionList();
//     }
//   }, [formData]);

//   const GenerateQuestionList = async () => {
//     setLoading(true);
//     try {
//       const result = await axios.post("/api/ai-model", {
//         ...formData,
//       });

//       console.log("raw result of generate questions- ", result);

//       console.log("QuestionList generate ques result CONTENT - ", result.data.content);
//       const Content = result.data.content;
//       const FINAL_CONTENT = Content.replace(/```json\s*|\s*```/g, "").trim();


//       setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
//       setLoading(false);
//     } catch (error) {
//       toast("Server Error, Try Again!");
//       setLoading(false);
//     }
//   };

//   const onFinish = () => {};

//   return (
//     <div>
//       {loading && (
//         <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
//           <Loader2Icon className="animate-spin" />
//           <div>
//             <h2 className="font-medium">Generating Interview Questions</h2>
//             <p className="text-primary">
//               Our AI is crafting personalized questions bases on you data.
//             </p>
//           </div>
//         </div>
//       )}
//       {questionList?.length > 0 && (
//         <div>
//           <QuestionListContainer questionList={questionList} />
//         </div>
//       )}
//       <div className="flex justify-end mt-10">
//         <Button onClick={() => onFinish()}> Finish</Button>
//       </div>
//     </div>
//   );
// };

// export default QuestionList;

// this one is of the optimus

"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { useUser } from "@/app/provider";
import {v4 as uuidv4} from 'uuid';
import { supabase } from "@/services/supabaseClient";

const QuestionList = ({ formData, onCreateLink }) => {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) GenerateQuestionList();
  }, [formData]);

  
  
  
  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      // console.log("raw result of generate questions- ", result);

      // console.log(
      //   "QuestionList generate ques result CONTENT - ",
      //   result.data.content
      // );
      const Content = result.data.content;
      const FINAL_CONTENT = Content.replace(/```json\s*|\s*```/g, "").trim();

      setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
      setLoading(false);
    } catch (error) {
      toast("Server Error, Try Again!");
      setLoading(false);
    }
  };
  
  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();
    console.log("interview table data - ", data);
    setSaveLoading(false);

    onCreateLink(interview_id);
  };

  // ... rest of the component remains the same
  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions based on your data.
            </p>
          </div>
        </div>
      )}

      {questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}

      <div className="flex justify-end mt-10">
        <Button onClick={onFinish} disabled={saveLoading}>
          {saveLoading && <Loader2 className="animate-spin" />}
          Create Interview Link & Finish
        </Button>
      </div>
    </div>
  );
};

export default QuestionList;
