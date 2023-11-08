import React from "react";
import ImageGenerator from "@/components/aimage/ImageGenerator";

const page = () => {
  return (
    <div className="flex flex-col h-[calc(100%-5rem)] gap-8 justify-center items-center">
      <div>
        <h1 className="text-center text-6xl ">Image generator</h1>
        <p className="text-center mt-2 text-zinc-600">
          Just write sentence into input and wait for Ai who will make image for
          you!
        </p>
      </div>
      <ImageGenerator />
    </div>
  );
};

export default page;
