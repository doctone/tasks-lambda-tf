import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router";

describe("App", () => {
  const cardTitles = [
    "Tasks",
    "Inventory Management",
    "Seasonal Task Scheduling",
    "Chore Assignments",
    "Room-Based Organization",
    "Decluttering Challenges",
    "AI-Powered Suggestions",
  ];
  it.each(cardTitles)(`should render %s successfully`, (title) => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(title)).toBeTruthy();
  });
});
