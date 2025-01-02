type Status = "pending" | "completed" | "in progress" | "not started";

const statusColors = {
  pending: "bg-yellow-500",
  completed: "bg-green-500",
  "in progress": "bg-blue-500",
  "not started": "bg-red-500",
};

export function TaskCard({ task, status }: { task: string; status: Status }) {
  return (
    <div className="bg-white m-3 dark:bg-slate-800 rounded-lg px-3 py-4 ring-1 ring-slate-900/5 shadow-xl">
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center justify-center p-2 ${statusColors[status]} rounded-md shadow-lg`}
        >
          <svg
            className="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          ></svg>
        </span>
        <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
          {task}
        </h3>
      </div>
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
        {status}
      </p>
    </div>
  );
}
