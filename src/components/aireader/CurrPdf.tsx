"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ArrowBigLeft,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Loader2,
  RotateCw,
  Search,
} from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import SimpleBar from "simplebar-react";

//worker pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfProps {
  file: string;
}

const CurrPdf = ({ file }: PdfProps) => {
  const { toast } = useToast();
  const [pdfScale, setPdfScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(1);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const PageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  const hadnlePageUp = () => {
    if (currPage !== numPages) setCurrPage((prev) => prev + 1);
  };

  const hadnlePageDown = () => {
    if (currPage > 1) setCurrPage((prev) => prev - 1);
  };

  type TPageValidator = z.infer<typeof PageValidator>;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(PageValidator),
  });

  const handlePageSubmit = ({ page }: TPageValidator) => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };

  const { width, ref } = useResizeDetector();

  const isLoading = renderedScale !== pdfScale;
  return (
    <div className="w-full flex-col  rounded-md shadow shadow-violet-400 flex">
      <div className="h-12 w-full mb-1  flex justify-between items-center">
        <div className="text-zinc-500 ml-4 text-xl flex items-center">
          <button disabled={currPage === 1} onClick={hadnlePageDown}>
            <ArrowLeft
              className={cn("w-5 h-5 mr-2 text-violet-600", {
                "text-zinc-400": currPage === 1,
              })}
            />
          </button>
          <Input
            value={currPage}
            {...register("page")}
            className={cn(
              "bg-transparent w-8 h-7 mr-2",
              errors.page && "focus-visible:ring-red-500"
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(handlePageSubmit)();
              }
            }}
          />
          <span>/</span>
          <span>{numPages ?? "?"}</span>
          <button disabled={currPage === numPages} onClick={hadnlePageUp}>
            <ArrowRight
              className={cn("w-5 h-5 ml-2 text-violet-600", {
                "text-zinc-400": currPage === numPages,
              })}
            />
          </button>
        </div>
        <div className=" flex gap-4 mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onClick={() => {}}
                className="gap-1.5 hover:bg-transparent hover:text-zinc-600"
                variant="ghost"
              >
                <Search className="h-4 w-4" />
                {pdfScale * 100}%
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setPdfScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setPdfScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setPdfScale(2)}>
                200%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => setRotation((prev) => prev + 90)}
            variant="ghost"
            aria-label="rotate 90 degrees"
            className="hover:bg-transparent hover:text-zinc-600"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full max-h-screen">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              loading={
                <div
                  className=" w-full flex justify-center
              pb-12"
                >
                  <Loader2 className="animate-spin" />
                </div>
              }
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
              }}
              onLoadError={() => {
                toast({
                  title: "Error",
                  description: "Something went wrong, Try again!",
                  variant: "destructive",
                });
              }}
              file={file}
              className="max-h-full"
            >
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  pageNumber={currPage}
                  scale={pdfScale}
                  rotate={rotation}
                  key={"@" + renderedScale}
                />
              ) : null}

              <Page
                className={cn(isLoading ? "hidden" : "")}
                width={width ? width : 1}
                pageNumber={currPage}
                scale={pdfScale}
                rotate={rotation}
                key={"%" + pdfScale}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(pdfScale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default CurrPdf;
