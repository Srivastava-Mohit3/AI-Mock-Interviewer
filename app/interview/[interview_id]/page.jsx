"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { supabase } from "@/services/supabaseClient";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Interview = () => {
  const { interview_id } = useParams();
  console.log("interview_id - ", interview_id);
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState()
  const [loading, setLoading] = useState(false);

  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, errror } = await supabase
        .from("interviews")
        .select("jobposition, jobdescription, duration, type")
        .eq("interview_id", interview_id);
      setInterviewData(Interviews[0]);
      // console.log("data from database - ", Interviews);
      if (Interviews?.length == 0) {
        toast("Incorrect Interview Link");
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast("Incorrect Interview Link");
    }
  };

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("interview_id", interview_id);
    console.log("onJoinInterview - ", Interviews[0]);
    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: Interviews[0],
    });
    router.push("/interview/" + interview_id + "/start");
    setLoading(false);
  };

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-7">
      <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-32 xl:px-52     mb-20">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-[100]"
        />
        <h2 className="mt-3">AI Powered Interview Platform</h2>
        <Image
          src={"/interview.png"}
          alt="interviewImage"
          width={340}
          height={340}
          className="w-[280px] my-6"
        />
        <h2 className="font-bold text-xl ">{interviewData?.jobposition}</h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-3">
          <Clock className="h-4 w-4" />
          {interviewData?.duration}
        </h2>

        <div className="w-full">
          <h2>Enter your full name</h2>
          <Input
            placeholder="eg. John Snow"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="w-full">
          <h2>Enter your Email</h2>
          <Input
            placeholder="eg. johnsnow@gmail.com"
            onChange={(event) => setUserEmail(event.target.value)}
          />
        </div>
        <div className="p-3 bg-blue-100 flex gap-4 rounded-xl mt-6">
          <Info />
          <div>
            <h2 className="font-bold">Before you start</h2>
            <ul>
              <li className="text-sm text-primary">
                - Test you camera and microphone
              </li>
              <li className="text-sm text-primary">
                - Ensure you have a stable internet connection
              </li>
              <li className="text-sm text-primary">
                - Find a Quite place for interview
              </li>
            </ul>
          </div>
        </div>
        <Button
          className="mt-5 w-full font-bold"
          disabled={loading || !userName}
          onClick={() => onJoinInterview()}
        >
          <Video />
          {loading && <Loader2Icon />}
          Join Interview
        </Button>
      </div>
    </div>
  );
};

export default Interview;
