"use client";

import { useEffect, useState } from "react";
import { getColleges } from "@/src/services/api";
import Link from "next/link";
import Image from "next/image";

type College = {
  id: number;
  name: string;
  location: string;
  fees: string;
  rating: number;
};

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getColleges().then((res: { data: { data: College[] } }) => {
      setColleges(res.data.data);
    });
  }, []);

  const filtered = colleges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0b1220] text-white">
      {/* NAVBAR */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-extrabold">CollegeFinder AI</h1>
        <Link href="/login" className="px-4 py-2 bg-white text-black rounded">
          Login
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center mt-10 text-center px-4">
        <h2 className="text-4xl font-bold mb-3">
          Find Your Dream College
        </h2>
        <p className="text-gray-300 mb-6">
          Search, compare, and predict colleges instantly
        </p>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search colleges..."
          className="w-full max-w-xl p-3 rounded-lg text-white bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4 mt-6">
          <Link
            href="/predictor"
            className="bg-blue-500 px-6 py-2 rounded"
          >
            AI Predictor
          </Link>

          <Link
            href={filtered.length > 0 ? `/college/${filtered[0].id}` : "/"}
            className="bg-purple-500 hover:bg-purple-600 transition px-6 py-2 rounded-lg font-semibold shadow-lg"
          >
            Best Colleges
          </Link>
        </div>
      </div>

      {/* COLLEGE LIST */}
      <div
        id="best"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 scroll-mt-24"
      >
        {filtered.map((college) => (
          <Link
            href={`/college/${college.id}`}
            key={college.id}
          >
            <div className="bg-white text-black rounded-xl p-4 shadow-lg hover:scale-105 transition">
              <Image
                src="https://source.unsplash.com/400x250/?college,university"
                alt="college image"
                width={400}
                height={250}
                className="rounded"
                unoptimized
              />
              <h2 className="text-xl font-bold mt-3">
                {college.name}
              </h2>
              <p>{college.location}</p>
              <p>Fees: {college.fees}</p>
              <p>⭐ {college.rating}</p>
              <button

                onClick={async (e) => {

                  e.preventDefault(); // IMPORTANT (prevents link navigation)

                  const user = JSON.parse(localStorage.getItem("user") || "{}");

                  await fetch("http://localhost:5050/api/wishlist/save", {

                    method: "POST",

                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify({

                      userId: user.id,

                      collegeId: college.id,

                    }),

                  });

                  alert("Saved to wishlist ⭐");

                }}

                className="mt-3 bg-yellow-400 text-black px-3 py-1 rounded"

              >

                ⭐ Save

            </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
