"use client";

import { ReactNode, createContext } from "react";
import { trpc } from "@/app/_trpc/client";
import Slider from "react-slick";

interface ImageType {
  userId: string | null;
  id: string;
  prompt: string;
  url: string;
  createdAt: string;
}

interface Props {
  children: ReactNode;
}

type ImageContextType = {
  images: ImageType[];
  imagesRefetch: () => void;
};

export const ImageContext = createContext<ImageContextType>({
  images: [],
  imagesRefetch: () => {},
});

export const ImageContextProvider = ({ children }: Props) => {
  const { data: images, refetch: imagesRefetch } = trpc.getImages.useQuery();

  return (
    <ImageContext.Provider
      value={{
        images: images || [],
        imagesRefetch,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
