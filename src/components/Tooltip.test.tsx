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
});
