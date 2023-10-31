"use client";

import WidthWrapper from "@/components/WidthWrapper";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <WidthWrapper className="relative">
      <div className="w-full  pt-10 text-center ">
        <h1
          className=" mx-auto text-6xl  md:text-8xl   font-bold 
         "
        >
          <span className="text-violet-600">I</span>Tools
        </h1>
        <p className="text-zinc-400 mt-2 xl:px-12">
          ITools is a versatile online platform that houses a range of
          AI-powered tools designed to simplify your tasks. Whether you need to
          create stunning images, extract text from PDF documents, or perform
          various other AI-related tasks, ITools has you covered. Explore the
          possibilities of AI with ITools and streamline your work processes
          today!
        </p>
      </div>
      <div className=" w-full mt-24 flex-col md:flex-row  flex justify-between">
        <div className=" w-full pb-8 border-b border-white md:border-none h-full px-12 flex flex-col items-center gap-8 justify-center ">
          <div>
            <h2 className="text-5xl text-center ">
              <span className="text-violet-600">AI</span>Reader
            </h2>
            <p className="text-zinc-600 text-center text-xs mt-1">
              Only for logged users!
            </p>
          </div>

          <p className="text-center mt-4">
            allows you to quickly and easily extract specific information from
            your <strong>PDF</strong> document.
          </p>

          <span className="text-violet-600">
            Just create an account or log in
          </span>
        </div>
        {/* section */}
        <div className=" w-full pb-8 h-full px-12 flex flex-col items-center gap-8 justify-center ">
          <div>
            <h2 className="text-5xl text-center ">
              <span className="text-violet-600">AI</span>mage
            </h2>
            <p className="text-zinc-600 text-center text-xs mt-1">
              Free for all
            </p>
          </div>

          <p className="text-center mt-4">
            quickly and easily allows you to create an <strong>image </strong>in
            few seconds!
          </p>
          <span className="text-zinc-400 "> Avaible soon...</span>
          {/* <Link href="#" className="w-20">
            Let&apos;s go!
          </Link> */}
        </div>
      </div>
    </WidthWrapper>
  );
}
