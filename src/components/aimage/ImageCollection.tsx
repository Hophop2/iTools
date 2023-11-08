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

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

const ImageCollection = () => {
  const { images } = useContext(ImageContext);
  const [position, setPosition] = useState(0);
  // const [width, setWidth] = useState(0);
  // const carousel = useRef<HTMLDivElement | null>(null);
  // const [isDragging, setIsDragging] = useState(false);

  // const [iWdth, setIwidth] = useState(0);
  // const [height, setHeight] = useState(0);

  // useEffect(() => {
  //   console.log("window.innerHeight", window.innerHeight);
  //   setIwidth(window.innerWidth);
  //   setHeight(window.innerHeight);
  //   if (typeof window !== "undefined" && images && carousel.current) {
  //     setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  //   }
  // }, [images, iWdth, height]);

  return (
    <div className="w-full flex justify-center">
      <div className=" flex   w-2/3 mt-4  h-[4rem]   ">
        {images && images.length !== 0 ? (
          <Swiper
            slidesPerView={6}
            spaceBetween={5}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            className=" "
          >
            {images.map((img) => {
              return (
                <SwiperSlide key={img.id}>
                  <Link
                    href={`/aimage/${img.id}`}
                    className=" cursor-grab w-16 h-16"
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
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : images && images.length >= 1 ? (
          <div className="text-zinc-400">Save some generated images!</div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCollection;
