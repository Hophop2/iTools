import { AppRouter } from "@/trpc";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>

type Messages = RouterOutput['getFileMessages']['messages']

type OmitText = Omit<Messages[number], "text">

type ExtendendText = {
    text: string | JSX.Element
}


export type ExtendendMessage = OmitText & ExtendendText