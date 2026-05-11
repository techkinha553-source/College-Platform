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
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">
        {college.name}
      </h1>

      <div className="space-y-2">
        <p>📍 Location: {college.location}</p>
        <p>💰 Fees: {college.fees}</p>
        <p>⭐ Rating: {college.rating}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-3">
          Overview
        </h2>

        <p>
          {college.description ||
            "This college offers quality education, strong placements, and modern campus facilities."}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-3">
          Courses Offered
        </h2>

        <ul className="list-disc pl-6">
          <li>B.Tech</li>
          <li>M.Tech</li>
          <li>MBA</li>
          <li>BCA</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-3">
          Placements
        </h2>

        <p>Average package: ₹12 LPA</p>

        <p>
          Top recruiters: Google, Microsoft, Amazon
        </p>
      </div>
    </div>
  );
}