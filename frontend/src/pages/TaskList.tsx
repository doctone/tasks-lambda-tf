import { useMutation, useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/getTasks";
import { SetStateAction, useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import { Plus, Trash2 } from "react-feather";
import { createTask } from "../api/upsertTask";
import { Task } from "../api/types";
import { useAuth } from "../auth/authContext";

export function TaskList() {
  const { data } = useQuery({ queryKey: ["tasks"], queryFn: getTasks });
  console.log(data);
  const { mutateAsync: create } = useMutation({ mutationFn: createTask });

  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTodo = async () => {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      status: "todo",
    };
    await create({ task, user: user?.displayName ?? "" });
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const deleteTodo = (id: string) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Tasks</h2>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setNewTask(e.target.value)
          }
          onKeyPress={(e: { key: string }) => e.key === "Enter" && addTodo()}
          className="flex-1"
        />
        <Button onClick={addTodo}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {tasks.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300"
          >
            <span
              className={`flex-1 ${
                todo.status === "completed"
                  ? "line-through text-slate-500"
                  : "text-slate-900"
              }`}
            >
              {todo.title}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTodo(todo.id)}
              className="h-8 w-8 p-0 text-slate-500 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
