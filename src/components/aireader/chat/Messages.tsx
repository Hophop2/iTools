import { trpc } from "@/app/_trpc/client";
import { Loader2, MessageSquare } from "lucide-react";
import React, { useContext, useEffect, useRef } from "react";
import Message from "./Message";
import { ChatContext } from "./ChatContext";
import { useIntersection } from "@mantine/hooks";

interface MessagesProps {
  fileId: string;
}

const Messages = ({ fileId }: MessagesProps) => {
  const { isLoading: isAireplaying } = useContext(ChatContext);

  const { data, isLoading, fetchNextPage } =
    trpc.getFileMessages.useInfiniteQuery(
      {
        fileId,
        limit: 8,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
      }
    );
  const loadingMessage = {
    createdAt: new Date().toISOString(),
    id: "loading-message",
    isUserMessage: false,
    text: (
      <span className="flex h-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    ),
  };

  const messages = data?.pages.flatMap((page) => page.messages);
  const combinedMessages = [
    ...(isAireplaying ? [loadingMessage] : []),
    ...(messages ?? []),
  ];
  const lastMsg = combinedMessages.length - 1;

  const lastMsgRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastMsgRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [fetchNextPage, entry]);

  return (
    <div className="flex  max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200  flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((msg, i) => {
          const isNextMsgSamePerson =
            combinedMessages[i - 1]?.isUserMessage ===
            combinedMessages[i]?.isUserMessage;

          if (i === lastMsg) {
            return (
              <Message
                ref={ref}
                isNextMsgSamePerson={isNextMsgSamePerson}
                message={msg}
                key={msg.id}
              />
            );
          } else
            return (
              <Message
                isNextMsgSamePerson={isNextMsgSamePerson}
                message={msg}
                key={msg.id}
              />
            );
        })
      ) : isLoading ? (
        <div className="w-full flex flex-col gap-2">
          <Loader2 />
          <Loader2 />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-500" />
          <p className="">Ask your first question!</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
