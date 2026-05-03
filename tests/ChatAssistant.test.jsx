import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ChatAssistant from "../components/ChatAssistant";
import { UserProvider } from "../context/UserContext";

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ response: "Hello, I am VoteGuide AI." }),
  })
);

describe("ChatAssistant", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders chat input and send button", () => {
    render(
      <UserProvider>
        <ChatAssistant />
      </UserProvider>
    );

    expect(screen.getByPlaceholderText(/Ask anything/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });

  it("allows sending a message and displays it", async () => {
    render(
      <UserProvider>
        <ChatAssistant />
      </UserProvider>
    );

    const input = screen.getByPlaceholderText(/Ask anything/i);
    const sendButton = screen.getByRole("button", { name: /Send/i });

    fireEvent.change(input, { target: { value: "Where is my polling booth?" } });
    fireEvent.click(sendButton);

    const messages = screen.getAllByText("Where is my polling booth?");
    expect(messages.length).toBeGreaterThan(0);
  });
});
