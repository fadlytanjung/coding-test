"use client";

import { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/molecules/markdown-renderer";
import type { User } from "@/types/user";
import env from "@/libs/env";

export default function HomePage() {
  const [users, setUsers] = useState<{ salesReps: User[] }>({ salesReps: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [isAsking, setIsAsking] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${env.NEXT_PUBLIC_BASE_API_URL}/data`);
        const data = await res.json();
        setUsers(data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAskQuestion = async () => {
    setIsAsking(true);
    setAnswer("");

    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BASE_API_URL}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          setAnswer((prev) => prev + chunk);
        }
      }
    } catch (err) {
      console.error("Error reading stream:", err);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-center text-blue-700">
          AI Chat + FastAPI 🔥
        </h1>
        <p className="text-center text-gray-500">
          Next.js, Tailwind, Gemini AI
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Dummy User Data</h2>
        <div className="bg-white p-4 rounded shadow">
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {(users.salesReps || []).map((user) => (
                <li key={user.id} className="text-sm text-gray-700">
                  <span className="font-medium text-blue-600">{user.name}</span>{" "}
                  - {user.role}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Chat with AI</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask me anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
          />
          <button
            onClick={handleAskQuestion}
            disabled={!question || isAsking}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isAsking ? "Asking..." : "Ask"}
          </button>
        </div>

        {answer && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow text-gray-800 whitespace-pre-wrap">
            <strong className="block mb-2 text-blue-600">AI Response:</strong>
            <MarkdownRenderer content={answer} />
            {isAsking && <span className="animate-pulse text-gray-400">▍</span>}
          </div>
        )}
      </section>
    </main>
  );
}
