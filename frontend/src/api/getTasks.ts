import axios from "axios";
import { Task } from "./types";

export async function getTasks() {
  return axios.get<{ tasks: Task[] }>(import.meta.env.VITE_API_URL + "/scan");
}
