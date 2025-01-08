import {
  RefreshCcw,
  Calendar,
  Package,
  Clipboard,
  Box,
  TrendingUp,
} from "react-feather";
import { SectionCard } from "./components/SectionCard";

const sections = [
  {
    title: "Tasks",
    href: "/tasks",
    icon: RefreshCcw,
    iconColor: "text-blue-400",
    description: [
      "Simplify your to-do list with this basic task manager.",
      "Create, edit, update, complete tasks, and set appropriate deadlines",
    ],
  },
  {
    title: "Inventory Management",
    href: "/inventory",
    icon: Calendar,
    iconColor: "text-green-400",
    description: [
      "Track home supplies (e.g., light bulbs, batteries, cleaning products) and get reminders to restock when running low.",
      "Integrate barcode/QR code scanning for quick inventory updates.",
    ],
  },
  {
    title: "Seasonal Task Scheduling",
    href: "/seasonal-tasks",
    icon: Package,
    iconColor: "text-amber-400",
    description: [
      "Preloaded seasonal checklists for tasks like gutter cleaning, HVAC filter replacements, and garden prep.",
      "Notifications tied to weather forecasts (e.g., “Snow predicted—prep driveway salt and shovels!”).",
    ],
  },
  {
    title: "Chore Assignments",
    href: "/chores",
    icon: Clipboard,
    iconColor: "text-purple-400",
    description: [
      "Assign recurring tasks to household members with reminders and completion tracking.",
      " “chore market” where users can trade tasks.",
    ],
  },
  {
    title: "Room-Based Organization",
    href: "/room-organization",
    icon: Box,
    iconColor: "text-orange-400",
    description: [
      "Tasks categorized by room (e.g., “Kitchen: Clean fridge” or “Bathroom: Scrub tiles”).",
      " Progress tracking for each room, turning cleaning into a visual game.",
    ],
  },
  {
    title: "Decluttering Challenges",
    href: "/decluttering",
    icon: Clipboard,
    iconColor: "text-indigo-400",
    description: [
      "30-day decluttering challenges with daily tasks for organizing specific areas.",
      " Provide before-and-after photo uploads for motivation.",
    ],
  },
  {
    title: "AI-Powered Suggestions",
    href: "/ai",
    icon: TrendingUp,
    iconColor: "text-cyan-400",
    description: [
      "Integrate AI to suggest tasks based on user patterns or goals (e.g., “You usually clean the house on Saturdays—add it?”).",
      "Use NLP to parse tasks from free-form text input, e.g., “remind me to call John tomorrow at 3 PM.”",
    ],
  },
];

function App() {
  return (
    <div className="flex justify-center flex-wrap text-slate-500">
      {sections.map((section) => (
        <SectionCard
          key={section.title}
          Icon={section.icon}
          iconColor={section.iconColor}
          title={section.title}
          href={section.href}
        >
          {section.description.map((line, index) => (
            <h4 key={index} className="text-xs">
              {line}
            </h4>
          ))}
        </SectionCard>
      ))}
    </div>
  );
}

export default App;
