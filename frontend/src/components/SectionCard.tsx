import { ReactNode } from "react";
import { Icon } from "react-feather";
import { Link } from "react-router";

export function SectionCard({
  title,
  href,
  Icon,
  iconColor,
  children,
}: {
  href: string;
  title: string;
  Icon: Icon;
  iconColor: string;
  children: ReactNode;
}) {
  return (
    <Link to={href}>
      <div className="flex flex-col gap-5 min-h-48 max-w-96 bg-white m-3 dark:bg-slate-800 rounded-lg px-3 py-4 ring-1 ring-slate-900/5 shadow-xl">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <h3 className="text-slate-900 dark:text-white text-base font-medium tracking-tight">
            {title}
          </h3>
        </div>
        {children}
      </div>
    </Link>
  );
}
