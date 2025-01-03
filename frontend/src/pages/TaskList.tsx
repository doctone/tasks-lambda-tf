import { TaskCard } from "../components/TaskCard";

export function TaskList() {
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
