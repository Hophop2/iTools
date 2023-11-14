import { File, FileUp, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import Dropzone from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const DashDropzone = () => {
  const router = useRouter();

  const { toast } = useToast();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { startUpload } = useUploadThing("pdfUploader");

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });
  //fake progress
  const startChargeProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (uploadProgress < 90) {
          return prev + 10;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 500);

    return interval;
  };
  return (
    <Dropzone
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        const progressInterval = startChargeProgress();

        // handle file uploading
        const res = await startUpload(acceptedFile);

        if (!res) {
          return toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        }

        const [fileResponse] = res;

        const key = fileResponse?.key;

        if (!key) {
          return toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        startPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <section>
          <div
            className=" cursor-pointer hover:bg-[rgba(0,0,0,0.2)] border w-64 h-48 md:h-64 md:w-96 m-4 border-dashed border-gray-300 rounded-lg flex justify-center items-center flex-col"
            {...getRootProps()}
          >
            <FileUp className="h-6 w-6 text-zinc-400 mb-2" />
            <input
              className="hidden"
              id="dropzone-file"
              type="file"
              {...getInputProps()}
            />
            <div className=" text-zinc-200 flex flex-col text-xs md:text-sm text-center">
              Drag &apos;n&apos; drop some files here, or
              <span>click to select files</span>
              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-[13rem] mt-6 flex items-center p-2  h-8 rounded-lg bg-transparent border border-zinc-700">
                  <File className="w-6 h-6 text-zinc-500  pr-1 " />
                  <p className="text-xs text-zinc-500 truncate ml-1">
                    {acceptedFiles[0].name ?? "Drop file!"}
                  </p>
                </div>
              ) : null}
              {isUploading ? (
                <Progress
                  value={uploadProgress}
                  className="h-1.5 mt-4 w-full bg-zinc-200"
                />
              ) : null}
              {uploadProgress > 30 && uploadProgress < 100 ? (
                <div
                  className="w-full
              flex flex-col items-center justify-center mt-5"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden md:flex text-xs mt-3 text-zinc-400">
                    Uno momento...
                  </span>
                </div>
              ) : uploadProgress === 100 ? (
                <div
                  className="w-full
            flex flex-col items-center justify-center mt-5"
                >
                  <Loader2 className="h-4 w-4 text-green-500 animate-spin" />
                  <span className=" hidden md:flex text-xs mt-3 text-green-500">
                    Redirecting...
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default DashDropzone;
