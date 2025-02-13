import { useQuery } from "@tanstack/react-query";
import { Task } from "../api/types";
import axios from "axios";
// import { getTasks } from "../api/getTasks";
export const useTasks = () => {
  // for local
  return useQuery<
    { data: { id: string; title: string; completed: boolean }[] },
    Error,
    Task[]
  >({
    queryKey: ["tasks"],
    queryFn: () => axios.get("https://jsonplaceholder.typicode.com/todos"),
    select: (data) =>
      data.data.map(({ id, title, completed }) => {
        return {
          id,
          title,
          status: completed ? "Completed" : "In Progress",
        };
      }),
  });
  // return useQuery({ queryKey: ["tasks"], queryFn: getTasks });
};
