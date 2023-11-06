import { ReactNode, createContext, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";

type ImageContextType = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

export const ImageContext = createContext<ImageContextType>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

interface Props {
  children: ReactNode;
}

export const ImageContextProvider = ({ children }: Props) => {
  const { data: images } = trpc.getImages.useQuery();

  const { mutate: saveImage } = trpc.saveImage.useMutation({
    onSuccess: () => {},
  });
  return <ImageContext.Provider value={"a"}>{children}</ImageContext.Provider>;
};
