import axios from "axios";
import { Task } from "./types";

export async function createTask({
  task,
  user,
}: {
  task: Omit<Task, "id">;
  user: string;
}) {
  return axios.post<{ task: Omit<Task, "id"> }>(
    "https://jsonplaceholder.typicode.com/todos",
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
  return axios.put<{ task: Omit<Task, "id"> }>(
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
