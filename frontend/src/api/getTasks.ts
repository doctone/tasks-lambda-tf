import axios from "axios";

type Task = { sk: string; pk: string; status: string };

export async function getTasks() {
  return axios.get<{ tasks: Task[] }>(import.meta.env.VITE_API_URL + "/scan");
}
