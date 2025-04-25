"use client";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState } from "react";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import { useUser } from "@/app/provider";
import { useParams } from "next/navigation";
import CandidateList from "./_components/CandidateList";

const InterviewDetail = () => {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState()
    // const [candidateDetail, setCandidateDetail] = useState()


  useEffect(() => {
    user && GetInterviewDetails();
  }, [user]);

  const GetInterviewDetails = async () => {
    const result = await supabase
      .from("interviews")
      .select(
        "jobposition, jobdescription, type, questionList, duration, interview_id, created_at, interview-feedback(userEmail, userName, feedback, created_at)"
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id);
      setInterviewDetail(result?.data[0])
    console.log("result in interview details page:- ", result);
  };

  console.log(
    "interviewDetail?.['interview-feedback'] - ",
    interviewDetail?.["interview-feedback"]
  );
  

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview Detail</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidateList candidateList={interviewDetail?.['interview-feedback']}/>
      {/* <CandidateList candidateList={candidateDetail} /> */}
    </div>
  );
};

export default InterviewDetail;


