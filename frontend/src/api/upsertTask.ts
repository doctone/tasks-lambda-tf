import axios from "axios";
import { Task } from "./types";

export async function createTask({ task, user }: { task: Task; user: string }) {
  return axios.put<{ task: Task }>(
    import.meta.env.VITE_API_URL + "/create",
    {
      pk: `User-${user}`,
      sk: task.title,
      status: task.status,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
