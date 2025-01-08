import { useQuery } from "@tanstack/react-query";
import { TaskCard } from "../components/TaskCard";
import { getTasks } from "../api/getTasks";
import { SetStateAction, useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import { Plus, Trash2 } from "react-feather";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export function TaskList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo,
      completed: false,
    };

    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Tasks</h2>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setNewTodo(e.target.value)
          }
          onKeyPress={(e: { key: string }) => e.key === "Enter" && addTodo()}
          className="flex-1"
        />
        <Button onClick={addTodo}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300"
          >
            <span
              className={`flex-1 ${
                todo.completed
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
  const { data } = useQuery({ queryKey: ["tasks"], queryFn: getTasks });
  const tasks = data?.data?.tasks ?? [];
  if (tasks.length === 0) {
    return (
      <div>
        <TaskCard task="finish benches" status="in progress" />
        <TaskCard task="replace lounge drawers" status="completed" />
        <TaskCard task="tidy garden" status="pending" />
        <TaskCard task="remove island" status="not started" />
        <TaskCard task="hall walls" status="in progress" />
        <TaskCard task="finish benches" status="completed" />
      </div>
    );
  }
  return tasks.map((task) => (
    <TaskCard key={task.sk} task={task.pk} status="completed" />
  ));
}
