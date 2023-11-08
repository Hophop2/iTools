"use client";

import { ArrowBigLeft, ArrowBigRightDash, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImageContext } from "./ImageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

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
    <div className="w-full flex justify-center">
      {images && images.length !== 0 ? (
        <motion.div className="flex  w-[40vw] overflow-hidden" ref={carousel}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className={`flex gap-4  ${isDragging ? "is-dragging" : ""}`}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            whileTap={{ cursor: "grabbing" }}
          >
            {images.map((img, index) => {
              return (
                <Link href={`/aimage/${img.id}`} className="w-16   h-16">
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
      ) : images && images.length >= 1 ? (
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
