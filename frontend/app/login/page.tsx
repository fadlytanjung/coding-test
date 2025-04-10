import LoginForm from "@/ui/login";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
