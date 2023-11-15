import React, { useContext, useRef } from "react";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { SendIcon } from "lucide-react";
import { ChatContext } from "./ChatContext";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="absolute  bottom-0 left-0 w-full">
      <div
        onSubmit={addMessage}
        className="mx-2 flex   flex-row gap-3 md:mx-4  md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
      >
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow  p-4">
            <div className="relative ">
              <Textarea
                ref={textareaRef}
                autoFocus
                className="resize-none pr-12 bg-transparent shadow shadow-violet-500 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                rows={1}
                value={message}
                maxRows={3}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();

                    addMessage();

                    textareaRef.current?.focus;
                  }
                }}
              />
              <Button
                disabled={isLoading || isDisabled}
                type="submit"
                className="absolute bottom-1.5 w-12 h-9 right-[8px]"
                onClick={() => {
                  addMessage();
                  textareaRef.current?.focus;
                }}
              >
                <SendIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
