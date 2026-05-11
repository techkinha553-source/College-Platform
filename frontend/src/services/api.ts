import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5050/api",
});

export const getColleges = () => API.get("/colleges");

export const getCollegeById = (id: string) =>
  API.get(`/colleges/${id}`);

export const predictCollege = (
  exam: string,
  rank: number
) =>
  API.post("/colleges/predict", {
    exam,
    rank,
  });