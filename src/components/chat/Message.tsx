import { cn } from "@/lib/utils";
import { ExtendendMessage } from "@/types/messageTypes";
import { format } from "date-fns";
import { BotIcon, CatIcon } from "lucide-react";
import React, { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
interface MsgProps {
  message: ExtendendMessage;
  isNextMsgSamePerson: boolean;
}

const Message = forwardRef<HTMLDivElement, MsgProps>(
  ({ message, isNextMsgSamePerson }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-end", {
          "justify-end": message.isUserMessage,
        })}
      >
        <div
          className={cn(
            "relative flex h-5 w-5 aspect-square items-center justify-center",
            {
              "order-2 bg-violet-600 rounded-sm": message.isUserMessage,
              "order-1 bg-zinc-700 rounded-sm": !message.isUserMessage,
              invisible: isNextMsgSamePerson,
            }
          )}
        >
          {message.isUserMessage ? <BotIcon /> : <CatIcon />}
        </div>

        <div
          className={cn("flex flex-col space-y-2 text-base max-w-md mx-2", {
            "order-1 items-end": message.isUserMessage,
            "order-2 items-start": !message.isUserMessage,
          })}
        >
          <div
            className={cn("px-4 py-2 rounded-lg inline-block", {
              "bg-violet-600 text-white": message.isUserMessage,
              "bg-gray-200 text-gray-900": !message.isUserMessage,
              "rounded-br-none": !isNextMsgSamePerson && message.isUserMessage,
              "rounded-bl-none": !isNextMsgSamePerson && !message.isUserMessage,
            })}
          >
            {typeof message.text === "string" ? (
              <ReactMarkdown
                className={cn("prose", {
                  "text-zinc-50": message.isUserMessage,
                })}
              >
                {message.text}
              </ReactMarkdown>
            ) : (
              message.text
            )}
            {message.id !== "loading-message" ? (
              <div
                className={cn("text-xs select-none mt-2 w-full text-right", {
                  "text-zinc-500 text-left": !message.isUserMessage,
                  "text-zinc-300": message.isUserMessage,
                })}
              >
                {format(new Date(message.createdAt), "HH:mm")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

Message.displayName = "Message";

export default Message;
