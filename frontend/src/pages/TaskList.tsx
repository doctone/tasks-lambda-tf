import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "@chakra-ui/react";
import { Plus, Trash2 } from "react-feather";
import { createTask } from "../api/upsertTask";
import { useAuth } from "../auth/authContext";
import { useTasks } from "./useTasks";
import { Form, useForm } from "react-hook-form";

export function TaskList() {
  const { data } = useTasks();

  const { mutateAsync: create } = useMutation({ mutationFn: createTask });

  const { user } = useAuth();
  const form = useForm<{ title: string }>();

  const onSubmit = async (data: { title: string }) => {
    const task = {
      title: data.title,
      status: "todo",
    };
    await create({ task, user: user?.displayName ?? "" });
    form.reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Tasks</h2>

      <Form control={form.control} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Add a new task..."
            className="flex-1"
            {...form.register("title", { minLength: 1, required: true })}
          />
          <Button type="submit">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </Form>

      <div className="space-y-2">
        {data &&
          data.map((todo) => (
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
                onClick={() => todo.id}
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
