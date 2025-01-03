import { SectionCard } from "./components/SectionCard";

function App() {
  return (
    <div className="flex flex-wrap text-slate-500">
      <SectionCard title="Tasks" href="/tasks">
        <h4 className="text-xs">
          Simplify your to-do list with this basic task manager.
        </h4>
        <h4 className="text-xs">
          Create, edit, update, complete tasks, and set appropriate deadlines
        </h4>
      </SectionCard>
      <SectionCard title="Inventory Management" href="/inventory">
        <h4 className="text-xs">
          Track home supplies (e.g., light bulbs, batteries, cleaning products)
          and get reminders to restock when running low.
        </h4>
        <h4 className="text-xs">
          Integrate barcode/QR code scanning for quick inventory updates.
        </h4>
      </SectionCard>
      <SectionCard title="Seasonal Task Scheduling" href="/seasonal-tasks">
        <h4 className="text-xs">
          Preloaded seasonal checklists for tasks like gutter cleaning, HVAC
          filter replacements, and garden prep.
        </h4>
        <h4 className="text-xs">
          Notifications tied to weather forecasts (e.g., “Snow predicted—prep
          driveway salt and shovels!”).
        </h4>
      </SectionCard>
      <SectionCard title="Chore Assignments" href="/chores">
        <h4 className="text-xs">
          Assign recurring tasks to household members with reminders and
          completion tracking.
        </h4>
        <h4 className="text-xs">“chore market” where users can trade tasks.</h4>
      </SectionCard>
      <SectionCard title="Room-Based Organization" href="/chores">
        <h4 className="text-xs">
          Tasks categorized by room (e.g., “Kitchen: Clean fridge” or “Bathroom:
          Scrub tiles”).
        </h4>
        <h4 className="text-xs">
          Progress tracking for each room, turning cleaning into a visual game.
        </h4>
      </SectionCard>
      <SectionCard title="Decluttering Challenges" href="/chores">
        <h4 className="text-xs">
          30-day decluttering challenges with daily tasks for organizing
          specific areas.
        </h4>
        <h4 className="text-xs">
          Provide before-and-after photo uploads for motivation.
        </h4>
      </SectionCard>
      <SectionCard title="AI-Powered Suggestions" href="/ai">
        <h4 className="text-xs">
          Integrate AI to suggest tasks based on user patterns or goals (e.g.,
          "You usually clean the house on Saturdays—add it?").
        </h4>
        <h4 className="text-xs">
          Use NLP to parse tasks from free-form text input, e.g., "remind me to
          call John tomorrow at 3 PM."
        </h4>
      </SectionCard>
    </div>
  );
}

export default App;
