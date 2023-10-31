import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] justify-center items-center">
      <Loader2 className="animate-spin w-16 h-16" />
    </div>
  );
}
