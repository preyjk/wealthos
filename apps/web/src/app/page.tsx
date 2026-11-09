"use client";

import { useEffect, useState } from "react";

type DemoRecord = {
  id: string;
  title: string;
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch data without modifying React state
async function fetchRecords(): Promise<DemoRecord[]> {
  const response = await fetch(`${API_URL}/demo-records`);

  if (!response.ok) {
    throw new Error("Failed to fetch records");
  }

  return (await response.json()) as DemoRecord[];
}

export default function Home() {
  const [records, setRecords] = useState<DemoRecord[]>([]);
  const [error, setError] = useState("");

  // Load records when the component mounts
  useEffect(() => {
    let cancelled = false;

    fetchRecords()
      .then((data) => {
        if (!cancelled) {
          setRecords(data);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setError(String(error));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Create a record and refresh the list
  async function createRecord() {
    try {
      setError("");

      const response = await fetch(`${API_URL}/demo-records`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "WealthOS Test" }),
      });

      if (!response.ok) {
        throw new Error("Failed to create record");
      }

      const data = await fetchRecords();
      setRecords(data);
    } catch (error) {
      setError(String(error));
    }
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">WealthOS</h1>
      <p className="mt-2">Full-stack architecture test</p>

      <button
        onClick={createRecord}
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Create Test Record
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <ul className="mt-6 space-y-2">
        {records.map((record) => (
          <li key={record.id}>{record.title}</li>
        ))}
      </ul>
    </main>
  );
}
