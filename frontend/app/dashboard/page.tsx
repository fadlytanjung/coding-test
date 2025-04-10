import Home from "@/ui/home";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  );
}
