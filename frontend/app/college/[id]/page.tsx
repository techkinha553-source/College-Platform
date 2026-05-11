"use client";

import { use, useEffect, useState } from "react";
import { getCollegeById } from "@/src/services/api";

type College = {
  id: number;
  name: string;
  location: string;
  fees: string;
  rating: number;
  description?: string;
};

export default function CollegePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  const [college, setCollege] = useState<College | null>(
    null
  );

  useEffect(() => {
    getCollegeById(resolvedParams.id).then(
      (res: any) => {
        setCollege(res.data.data);
      }
    );
  }, [resolvedParams.id]);

  if (!college) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 transition-all hover:border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold mb-4">
                Premium College Profile
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                {college.name}
              </h1>

              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                {college.description ||
                  "This college offers quality education, strong placements, advanced research opportunities, and world-class campus facilities for students."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all">
                <p className="text-slate-400 text-sm mb-2">
                  Location
                </p>

                <h3 className="text-lg font-bold text-white">
                  {college.location}
                </h3>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all">
                <p className="text-slate-400 text-sm mb-2">
                  Fees
                </p>

                <h3 className="text-lg font-bold text-green-400">
                  {college.fees}
                </h3>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all">
                <p className="text-slate-400 text-sm mb-2">
                  Rating
                </p>

                <h3 className="text-lg font-bold text-yellow-400">
                  ⭐ {college.rating}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl hover:border-white/20 transition-all">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Courses Offered
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {[
                "B.Tech",
                "M.Tech",
                "MBA",
                "BCA",
                "MCA",
                "BBA",
              ].map((course) => (
                <div
                  key={course}
                  className="bg-slate-900/60 border border-white/10 rounded-2xl px-5 py-4 text-center hover:bg-purple-500/10 hover:border-purple-500/30 transition-all font-semibold"
                >
                  {course}
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl hover:border-white/20 transition-all">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Placement Statistics
            </h2>

            <div className="space-y-5">
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-slate-400 text-sm mb-2">
                  Average Package
                </p>

                <h3 className="text-3xl font-extrabold text-green-400">
                  ₹12 LPA
                </h3>
              </div>

              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-slate-400 text-sm mb-3">
                  Top Recruiters
                </p>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Google",
                    "Microsoft",
                    "Amazon",
                    "Adobe",
                    "TCS",
                  ].map((company) => (
                    <span
                      key={company}
                      className="px-4 py-2 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-sm font-semibold"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl hover:border-white/20 transition-all">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Why Choose This College?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold mb-3 text-purple-300">
                Modern Campus
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Smart classrooms, innovation labs, sports facilities, and a modern digital campus environment.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold mb-3 text-green-300">
                Strong Placements
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Excellent placement opportunities with leading global companies and startups.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold mb-3 text-yellow-300">
                Student Growth
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Focus on skill development, leadership, innovation, and industry-level learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}