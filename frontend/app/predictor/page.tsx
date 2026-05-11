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
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-3">
            AI Rank Predictor
          </h1>

          <p className="text-slate-500 text-lg">
            Predict the best colleges based on your exam rank
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select Exam
            </label>

            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-slate-700"
            >
              <option>JEE</option>
              <option>NEET</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Enter Your Rank
            </label>

            <input
              type="number"
              placeholder="e.g. 15000"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-slate-700"
            />
          </div>
        </div>

        <button
          onClick={handlePredict}
          className="w-full bg-black hover:bg-slate-800 transition-all text-white font-semibold py-4 rounded-xl text-lg"
        >
          Predict Colleges
        </button>

        {results.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-5 text-center">
              Predicted Colleges
            </h2>

            <div className="grid gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="border border-slate-200 bg-slate-50 hover:shadow-lg transition-all rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">
                        {item.college.name}
                      </h3>

                      <p className="text-slate-500">
                        {item.college.location}
                      </p>
                    </div>

                    <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Match
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}