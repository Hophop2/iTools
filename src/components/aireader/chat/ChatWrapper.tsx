"use client";

import React from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { trpc } from "@/app/_trpc/client";
import { Loader2, XCircle } from "lucide-react";
import { ChatContextProvider } from "./ChatContext";

interface ChatProps {
  fileId: string;
}

const ChatWrapper = ({ fileId }: ChatProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    }
  );

  if (isLoading)
    return (
      <div className="relative min-h-full flex flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin" />
            <p>Wait a moment, pdf is rendering!</p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );
  if (data?.status === "PROCESSING")
    return (
      <div className="relative min-h-full flex flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin" />
            <p>Uno momento Amigos!!</p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );

  if (data?.status === "FAILED")
    return (
      <div className="relative min-h-full flex flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <XCircle className=" text-red-500" />
            <p>Something went wrong ☹</p>
            <span>Try again!</span>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );

  return (
    <ChatContextProvider fileId={fileId}>
      <div className="relative min-h-full    flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 justify-between w-full   flex flex-col mb-28">
          <Messages fileId={fileId} />
        </div>
        <ChatInput />
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
