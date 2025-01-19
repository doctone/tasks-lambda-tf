import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

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
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(title)).toBeTruthy();
  });
});
