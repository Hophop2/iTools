"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";

import Image from "next/image";

import { trpc } from "@/app/_trpc/client";
import { ImageContext } from "./ImageContext";

const ImageGenerator = () => {
  const { imagesRefetch } = useContext(ImageContext);

  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const {
    mutate: generateImage,
    isError,
    error,
  } = trpc.CreateImage.useMutation({
    onSuccess: (newImage) => {
      setImage("");
      setIsLoading(false);
      const firstImageData = newImage.data[0];
      if (firstImageData && firstImageData.url) {
        setImage(firstImageData.url);
      }
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const { mutate: saveImage } = trpc.saveImage.useMutation({
    onSuccess: () => {
      setImage("");
      setPrompt("");
      imagesRefetch();
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    console.log(e.target.value);
  };
  console.log(error);
  return (
    <>
      {" "}
      <div className="flex w-2/3 justify-center items-center  text-black">
        <Input
          onChange={handleInputChange}
          value={prompt}
          placeholder="ex. black cat in bedroom"
        />
      </div>
      <Button onClick={() => generateImage({ prompt })}>Create Image</Button>
      {/* Image */}
      {image !== "" && !isLoading ? (
        <div className="pb-12 ">
          <div className="relative shadow  shadow-violet-600">
            <Image src={image} width={512} height={512} alt="photo" />
            <div className="absolute bottom-0 left-0 w-full flex items-center justify-around h-12  ">
              <Button onClick={() => saveImage({ image, prompt })}>
                Save img
              </Button>
              <Button
                onClick={() => setImage("")}
                className="bg-red-600 hover:bg-red-500"
              >
                Discard
              </Button>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col mt-24 justify-center gap-8 items-center">
          <Loader2 className="animate-spin" />
          <p className="text-xl">
            Wait a moment, we are creating photo for you 😉
          </p>
        </div>
      ) : isError ? (
        <div className="text-center text-red-600">
          <p>An error occurred while generating the image</p>
          <span>Try again or your prompt is forbidden!</span>
        </div>
      ) : null}
    </>
  );
};

export default ImageGenerator;
