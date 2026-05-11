"use client";

import { useState } from "react";
import { predictCollege } from "@/src/services/api";

type Result = {
  id: number;
  college: {
    name: string;
    location: string;
  };
};

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE");
  const [rank, setRank] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const handlePredict = async () => {
    const res = await predictCollege(
      exam,
      Number(rank)
    );

    setResults(res.data.data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        AI Rank Predictor
      </h1>

      <div className="space-y-4">
        <select
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option>JEE</option>
          <option>NEET</option>
        </select>

        <input
          type="number"
          placeholder="Enter Rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={handlePredict}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Predict Colleges
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {results.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded"
          >
            <h2 className="text-xl font-bold">
              {item.college.name}
            </h2>

            <p>{item.college.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}