import { ReactNode } from "react";
import { Link } from "react-router";

export function SectionCard({
  title,
  href,
  children,
}: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Link to={href}>
      <div className="flex flex-col gap-5 min-h-48 max-w-96 bg-white m-3 dark:bg-slate-800 rounded-lg px-3 py-4 ring-1 ring-slate-900/5 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center p-2 bg-green-500 rounded-md shadow-lg">
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
            {title}
          </h3>
        </div>
        {children}
      </div>
    </Link>
  );
}
