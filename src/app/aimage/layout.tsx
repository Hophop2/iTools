import WidthWrapper from "@/components/WidthWrapper";
import ImageCollection from "@/components/aimage/ImageCollection";
import { ImageContextProvider } from "@/components/aimage/ImageContext";

export default function ImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ImageContextProvider>
      <ImageCollection />
      <WidthWrapper className="min-h-[calc(100vh-4rem)]">
        {children}
      </WidthWrapper>
    </ImageContextProvider>
  );
}
