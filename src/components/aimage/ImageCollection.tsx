"use client";

import { trpc } from "@/app/_trpc/client";
import { ArrowBigLeft, ArrowBigRightDash, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ImageCollection = () => {
  const { data: images } = trpc.getImages.useQuery();

  return (
    <div className="w-full h-20  flex items-center justify-center gap-4">
      {images && images.length !== 0 ? (
        <>
          <ArrowBigLeft />
          {images.map((img) => {
            return (
              <Link
                href={`aimage/${img.id}`}
                className="border w-16 h-16 border-violet-600 hover:shadow-lg cursor-pointer hover:shadow-violet-500"
              >
                <Image width={64} height={64} src={img.url} alt="photo" />
              </Link>
            );
          })}
          <ArrowBigRightDash />
        </>
      ) : images && images.length >= 1 ? (
        <div className="text-zinc-400">Save some generated images!</div>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
};

export default ImageCollection;
