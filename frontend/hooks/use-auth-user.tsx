"use client";

import { useEffect, useState } from "react";

type AuthUser = {
  sub: string;
  fullname: string;
  role: string;
  id: number;
  exp: number;
};

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      });
  }, []);

  return user;
}
