"use client";

import { trpc } from "@/app/_trpc/client";
import { buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import cuid from "cuid";

const Page = () => {
  const { imageid } = useParams();
  const imageIdString = Array.isArray(imageid) ? imageid[0] : imageid;

  const { data: image } = trpc.getImage.useQuery({ imageId: imageIdString });

  const handleDownload = async (src: string) => {
    const uniqueId = cuid();
    const limitedId = uniqueId.slice(0, 6);
    const imageBlob = await fetch(src, {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/webp" }));

    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlob);
    link.download = `aimage_${limitedId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-full mt-12 flex-col justify-center items-center ">
      {image ? (
        <>
          <div className="flex w-[512px] items-center mb-2  justify-between  ">
            <p className="w-3/4 ml-2 text-justify ">
              Prompt: <span className="text-zinc-400">{image.prompt}</span>
            </p>
            <button
              onClick={() => handleDownload(image.url)}
              className={buttonVariants({
                variant: "link",
                size: "sm",
              })}
            >
              Dowloand
            </button>
          </div>
          <Image
            width={512}
            height={512}
            alt="photo"
            src={image.url}
            loading="lazy"
          />
        </>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
};

export default Page;
