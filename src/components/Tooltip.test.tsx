import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Tooltip from "./Tooltip";
import "@testing-library/jest-dom";

describe("Tooltip Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders children correctly", () => {
    render(
      <Tooltip text="Tooltip content">
        <span>Hover me</span>
      </Tooltip>
    );

    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    render(
      <Tooltip text="Tooltip content">
        <span>Hover me</span>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText("Hover me"));

    expect(await screen.findByText("Tooltip content")).toBeInTheDocument();
  });

  it("hides tooltip when mouse leaves", async () => {
    render(
      <Tooltip text="Tooltip content">
        <span>Hover me</span>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText("Hover me"));
    expect(await screen.findByText("Tooltip content")).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByText("Hover me"));

    await waitFor(() => {
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
    });
  });

  it("shows tooltip on click and disappears after 3 seconds", async () => {
    render(
      <Tooltip text="Tooltip content">
        <span>Click me</span>
      </Tooltip>
    );

    // Klik na element da prikaže tooltip
    fireEvent.click(screen.getByText("Click me"));

    // Tooltip treba da se pojavi odmah
    expect(screen.getByText("Tooltip content")).toBeInTheDocument();

    // ✅ Unutar `act()` simuliramo 3 sekunde vremena
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // ✅ Čekamo da tooltip nestane
    await waitFor(() => {
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
    });
  });

  it("positions tooltip correctly when close to left or right edge", async () => {
    render(
      <Tooltip text="Tooltip content">
        <span>Hover me</span>
      </Tooltip>
    );
    const tooltipElement = screen.getByText("Hover me");
    jest
      .spyOn(tooltipElement, "getBoundingClientRect")
      .mockImplementation(() => ({
        left: -50,
        right: 300,
        width: 100,
        height: 20,
        top: 100,
        bottom: 120,
        x: 0,
        y: 0,
        toJSON: () => {},
      }));
    fireEvent.mouseEnter(tooltipElement);
    const tooltip = await screen.findByText("Tooltip content");
    await waitFor(() => {
      expect(tooltip).toHaveClass("right-0");
    });
  });
});
