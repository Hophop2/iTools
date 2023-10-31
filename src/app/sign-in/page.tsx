"use client";

import WidthWrapper from "@/components/WidthWrapper";
import { buttonVariants } from "@/components/ui/button";

import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Home() {
  return (
    <WidthWrapper className="relative">
      <div className="w-full h-[calc(100vh-4rem)] flex flex-col justify-center items-center gap-4  pt-10 text-center ">
        <h1
          className=" mx-auto text-6xl  md:text-8xl   font-bold 
         "
        >
          <span className="text-violet-600">I</span>Tools
        </h1>
        <p className="">
          To access iTools, you need to log in or register first
        </p>
        <div>
          <LoginLink
            className={buttonVariants({
              variant: "link",
              size: "sm",
            })}
          >
            Sign in
          </LoginLink>
          <RegisterLink
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
            })}
          >
            Sign up
          </RegisterLink>
        </div>
      </div>
    </WidthWrapper>
  );
}
