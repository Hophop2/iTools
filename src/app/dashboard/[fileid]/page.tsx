import Loading from "@/app/loading";
import ChatWrapper from "@/components/aireader/chat/ChatWrapper";

import CurrPdf from "@/components/aireader/CurrPdf";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";

interface Props {
  params: {
    fileid: string;
  };
}

const page = async ({ params }: Props) => {
  const { getUser } = getKindeServerSession();
  const kindeUser = getUser();

  const { fileid } = params;

  if (!kindeUser || !kindeUser.id)
    redirect(`/auth-callback?origin=dashboard/${fileid}`);

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: kindeUser.id,
    },
  });

  if (!file) notFound();

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex-1 justify-between flex flex-col  h-[calc(100vh-4rem)]">
        <div className="mx-auto  w-full max-w-8xl grow lg:flex xl:px-2">
          <div className="flex-1 xl:flex">
            <div className="px-4  pt-4  sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <CurrPdf file={file.url} />
            </div>
          </div>

          <div className="shrink-0 flex-[0.75]  border-t border-gray-200  lg:border-l lg:border-t-0">
            <ChatWrapper fileId={file.id} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default page;
