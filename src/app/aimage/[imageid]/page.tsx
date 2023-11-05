"use client";

import { trpc } from "@/app/_trpc/client";
import WidthWrapper from "@/components/WidthWrapper";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { imageid } = useParams();
  const imageIdString = Array.isArray(imageid) ? imageid[0] : imageid;
  console.log(imageid);
  const { data: image } = trpc.getImage.useQuery({ imageId: imageIdString });
  console.log(image);
  return (
    <WidthWrapper className="h-[calc(100vh-4rem)]">
      <div className="flex h-full justify-center items-center">
        {image ? (
          <Image width={512} height={512} alt="photo" src={image?.url} />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </div>
    </WidthWrapper>
  );
};

export default page;
