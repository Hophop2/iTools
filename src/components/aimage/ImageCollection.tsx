"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ImageContext } from "./ImageContext";

import { motion } from "framer-motion";

const ImageCollection = () => {
  const { images } = useContext(ImageContext);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (images && carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [images]);

  return (
    <div className="w-full flex mt-4 justify-center">
      {images && images.length !== 0 ? (
        <motion.div className="flex  w-[40vw] overflow-hidden" ref={carousel}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className={`flex gap-8  ${isDragging ? "is-dragging" : ""}`}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            whileTap={{ cursor: "grabbing" }}
          >
            {images.map((img) => {
              return (
                <Link
                  key={img.id}
                  href={`/aimage/${img.id}`}
                  className="w-16 hover:shadow-xl hover:shadow-violet-600 border border-violet-600  h-16"
                >
                  <Image
                    width={64}
                    height={64}
                    src={img.url}
                    alt="photo"
                    loading="lazy"
                    className="cursor-pointer"
                  />
                </Link>
              );
            })}
          </motion.div>
        </motion.div>
      ) : images && images.length >= 0 ? (
        <div className="text-zinc-400">Save some generated images!</div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ImageCollection;
