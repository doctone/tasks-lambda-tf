import { useQuery } from "@tanstack/react-query";
import { TaskCard } from "../components/TaskCard";
import { getTasks } from "../api/getTasks";

export function TaskList() {
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
    <TaskCard
      key={task.sk}
      task={task.pk}
      status={task.status.toLowerCase() as any}
    />
  ));
}
