import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("⚛️ App Page", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("📍 Vite + React 제목이 표시 되어야 한다", () => {
    const title = screen.getByRole("heading", {
      name: /Vite \+ React/i,
    });

    expect(title).toBeInTheDocument();
  });

  describe("⚛️ button", () => {
    test("📍 button이 표시 되어야 한다", () => {
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    test("📍 button을 클릭하면 count가 1씩 증가 되어야 한다", async () => {
      const user = userEvent.setup();
      const button = screen.getByRole("button");
      const count = screen.getByText(/count is 0/i);

      expect(count).toBeInTheDocument();

      await user.click(button);
      expect(count).toHaveTextContent("count is 1");

      await user.click(button);
      expect(count).toHaveTextContent("count is 2");
    });
  });
});
