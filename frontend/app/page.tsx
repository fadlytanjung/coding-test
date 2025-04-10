import HomePage from "@/ui/home";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomePage />
    </Suspense>
  );
}
