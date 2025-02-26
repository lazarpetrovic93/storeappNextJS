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
    fireEvent.click(screen.getByText("Click me"));
    expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
    });
  });
});
