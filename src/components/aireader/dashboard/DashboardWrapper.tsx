"use client";

import { ArrowLeft, FolderX, Loader2, Trash } from "lucide-react";
import React, { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { format } from "date-fns";
import Link from "next/link";
import DashDropzone from "./DashDropzone";

import SortedBtn from "./SortedBtn";
import { $Enums } from "@prisma/client";

type FileType = {
  userId: string | null;
  key: string;
  id: string;
  name: string;
  uploadStatus: $Enums.File_uploadStatus;
  color: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

const DashboardWrapper = () => {
  const [position, setPosition] = useState("newest");
  const [fileToDel, setFileToDel] = useState<string | null>();
  const { data: files, isLoading } = trpc.getFiles.useQuery();

  const utils = trpc.useContext();
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getFiles.invalidate();
    },

    onSettled: () => {
      setFileToDel(null);
    },
    onMutate: ({ id }) => {
      setFileToDel(id);
    },
  });

  const handleSort = (files: FileType[], position: string) => {
    if (position === "newest") {
      return files.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (position === "oldest") {
      return files.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (position === "alphabetical") {
      return files.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return [];
    }
  };
  let sortedFiles: FileType[] | [] = [];

  if (files && files.length !== 0) {
    sortedFiles = handleSort(files, position);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row ">
      <div className="md:w-2/3 flex justify-center items-center  ">
        <DashDropzone />
      </div>
      <div className="md:w-1/3 h-full  flex-0.5 bg-[rgba(0,0,0,0.5)]">
        <ol>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-4xl ml-6  my-8">My files</h2>
            <SortedBtn position={position} setPosition={setPosition} />
          </div>
          {sortedFiles && sortedFiles?.length !== 0 ? (
            sortedFiles.map((file) => {
              return (
                <li
                  key={file.id}
                  className="w-full md:shadow-sm md:shadow-slate-200 p-4 h-24 border-b mb-8 border-zinc-800"
                >
                  <Link
                    href={`dashboard/${file.id}`}
                    className="flex items-center  pb-4  border-b border-zinc-800"
                  >
                    <div
                      className="aspect-square"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        backgroundColor: file.color,
                      }}
                    />
                    <span className="text-white ml-6 truncate">
                      {file.name}
                    </span>
                  </Link>
                  <div className="flex mt-2  text-xs  text-zinc-400">
                    <div className="border-r border-zinc-800 w-full text-center">
                      {format(new Date(file.createdAt), "MMM yyyy")}
                    </div>
                    <button
                      onClick={() => deleteFile({ id: file.id })}
                      className=" w-full  text-center flex justify-center items-center"
                    >
                      {fileToDel === file.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4 text-red-600 hover:text-red-800 cursor-pointer" />
                      )}
                    </button>
                  </div>
                </li>
              );
            })
          ) : isLoading ? (
            <li className="w-full flex justify-center items-center">
              <Loader2 className="animate-spin mt-4" />
            </li>
          ) : (
            <li className="w-full flex justify-center text-zinc-300 flex-col items-center">
              <FolderX />
              <p className="text-sm mt-2 mb-1">No files here</p>
              <p className="text-sm flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Let&apos;s add some!
              </p>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default DashboardWrapper;
