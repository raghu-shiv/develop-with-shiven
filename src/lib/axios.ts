// File: src/lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
});

export default instance;
