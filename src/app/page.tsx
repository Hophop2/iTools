import WidthWrapper from "@/components/WidthWrapper";
import { Play } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <WidthWrapper className="relative min-h-[calc(60vh-4rem)] flex gap-64 flex-col justify-center ">
        <div>
          <div className="w-full    text-center ">
            <h1
              className=" mx-auto text-7xl  md:text-9xl   font-bold 
         "
            >
              <span className="text-violet-600">I</span>Tools
            </h1>
            <p className="text-zinc-400 px-6 mt-2 xl:px-12">
              ITools is a versatile online platform that houses a range of
              AI-powered tools designed to simplify your tasks. Whether you need
              to create stunning images, extract text from PDF documents, or
              perform various other AI-related tasks, ITools has you covered.
              Explore the possibilities of AI with ITools and streamline your
              work processes today!
            </p>
          </div>
        </div>
      </WidthWrapper>
      <div className="flex flex-col  gap-20">
        <div className="w-full flex flex-col  lg:flex-row   ">
          <div className="w-full lg:w-1/2 flex  flex-col p-8  ">
            <div className=" ">
              <h2 className=" text-6xl  sm:text-8xl font-semibold text-center ">
                <span className="text-violet-600">AI</span>Reader
              </h2>
              <p className="text-zinc-600 text-center text-xs mt-1">
                allows you to quickly and easily extract specific information
                from your PDF document.
              </p>
            </div>
            <ul className="flex  ml-0   flex-col mt-20 gap-4 text-lg">
              <li className="flex gap-2 items-center ">
                <Play className="w-6 h-6" />
                Drag and drop uploads
              </li>
              <li className="flex gap-2 items-center ">
                <Play className="w-6 h-6" />
                Chatting with PDF
              </li>
              <li className="flex gap-2 items-center ">
                <Play className="w-6 h-6" />
                Storing PDF files and messages
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center mx-8 sm:mx-0 z-40">
            <Image
              src="/itools33.jpg"
              alt="aireader chat"
              width={700}
              height={390}
              quality={100}
              className="rounded-md  p-1 sm:p-2 md:p-4 shadow-2xl ring-1 ring-gray-900/30"
            />
          </div>
        </div>

        <div className="w-full flex flex-col  lg:flex-row-reverse  ">
          <div className="w-full lg:w-1/2 flex  flex-col p-8  z-50">
            <div className=" ">
              <h2 className=" text-6xl sm:text-8xl font-semibold text-center ">
                <span className="text-violet-600">AI</span>mage
              </h2>
              <p className="text-zinc-600 text-center text-xs mt-5">
                allows you to quickly and easily generate image by yor command.
              </p>
            </div>
            <ul className="flex  ml-0   flex-col mt-20 gap-4 text-lg">
              <li className="flex gap-2 items-center ">
                <Play className="w-6 h-6" />
                Generating a picture of what you want
              </li>
              <li className="flex gap-2 items-center ">
                <Play className="w-6 h-6" />
                Save and dowloand your image
              </li>
              <li className="flex gap-2 items-center ">
                <Play className="w-6 h-6" />
                Your own image collection
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center mx-8 sm:mx-0 pb-8 z-40 ">
            <Image
              src="/itools4.jpg"
              alt="product preview"
              width={700}
              height={390}
              quality={100}
              className="rounded-md  z-50  p-1 sm:p-2 md:p-4 shadow-2xl ring-1 ring-gray-900/30"
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[650px] left-[600px] -z-10 transform-gpu overflow-hidden blur-3xl "
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
    </>
  );
}
