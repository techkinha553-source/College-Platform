/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

type SavedCollege = {
  id: number;
  college: {
    id: number;
    name: string;
    location: string;
    fees: string;
    rating: number;
  };
};

export default function WishlistPage() {
  const [saved, setSaved] = useState<SavedCollege[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");

    if (!userStr) {
      setLoading(false);
      return;
    }

    const user = JSON.parse(userStr);

    const fetchSaved = async () => {
      try {
        const res = await fetch(
          `http://localhost:5050/api/wishlist/${user.id}`
        );

        const data = await res.json();
        setSaved(data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  const removeCollege = async (collegeId: number) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;

    const user = JSON.parse(userStr);

    await fetch("http://localhost:5050/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        collegeId,
      }),
    });

    setSaved((prev) =>
      prev.filter((item) => item.college.id !== collegeId)
    );
  };

  if (loading) {
    return (
      <div className="p-10 text-center">Loading wishlist...</div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-10">
      <h1 className="text-3xl font-bold mb-6">
         My Saved Colleges
      </h1>

      {saved.length === 0 ? (
        <p>No colleges saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {saved.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold">
                {item.college.name}
              </h2>

              <p>{item.college.location}</p>
              <p>Fees: {item.college.fees}</p>
              <p>⭐ {item.college.rating}</p>

              <button
                onClick={() => removeCollege(item.college.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
