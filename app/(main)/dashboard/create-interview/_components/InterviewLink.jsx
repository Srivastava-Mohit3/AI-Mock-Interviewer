import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  List,
  Mail,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const InterviewLink = ({ interview_id, formData }) => {
  console.log("interviewId in the InterviewLink page", interview_id);

  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;
  const GetInterviewUrl = () => {
    return url;
  };
  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast("Link Copied to Clipboard");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Image
        src={"/check2.png"}
        alt="check"
        width={200}
        height={200}
        className="w-[70px] h-[70px]"
      />
      <h2 className="font-bold text-lg mt-4">Your AI Interview is Ready!</h2>
      <p className="mr-3">
        share this with your candidate to start the interview process{" "}
      </p>
      <div className="w-full p-7 mt-6 rounded-lg bg-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Interview Link</h2>
          <h2 className="p-1 px-2 text-primary  rounded-xl">
            Valid for 30 Days
          </h2>
        </div>
        <div className="mt-3 flex gap-3 items-center">
          <Input defaultValue={GetInterviewUrl()} disabled={true} />
          <Button onClick={() => onCopyLink()} className="cursor-pointer">
            <Copy />
            Copy Link
          </Button>
        </div>
        <hr className="my-5 bg-white border-amber-300" />
        <div className="flex gap-5">
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Clock className="h-4 w-4" /> {formData?.duration}{" "}
          </h2>
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <List className="h-4 w-4" /> {formData?.duration}{" "}
          </h2>
          {/* <h2 className="text-sm text-gray-500 flex gap-2 items-center"><Calendar className="h-4 w-4"/> 30Min {formData?.duration} </h2> */}
        </div>
      </div>
      <div className="mt-7 bg-gray-200 p-5 rounded-lg w-full">
        <h2 className="font-bold">Share Via</h2>
        <div className="flex gap-7 mt-2">
          <Button variant={"outline"} className="">
            <Mail /> Email
          </Button>
          <Button variant={"outline"} className="">
            <Mail /> Phone
          </Button>
          <Button variant={"outline"} className="">
            <Mail /> WhatsApp
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-5 justify-between mt-6">
        <Link href={"/dashboard"}>
          <Button variant={"outline"}>
            <ArrowLeft />
            Back to Dashboard
          </Button>
        </Link>
        <Link href={"/create-interview"}>
          <Button>
            <Plus /> Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewLink;
