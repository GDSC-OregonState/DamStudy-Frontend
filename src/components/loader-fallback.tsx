import { Loader2 } from "lucide-react";

export default function LoaderFallback() {
  return (
    <>
      <Loader2 className="animate-spin h-16 w-16 text-orange-600 dark:text-orange-600 mx-auto" />
    </>
  );
}
