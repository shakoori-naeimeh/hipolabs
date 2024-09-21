import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Favourite from "./Favourite";
import { HiplabsProvider } from "../HiplabsContext";

const mockUniversity = 
  {
    id: 1,
    name: "University A",
    state_province: "State A",
    web_pages: ["http://www.universitya.edu"]
  }
;
const renderComponent = () => {
  return render(
    <HiplabsProvider>
      <Favourite university={mockUniversity} />
    </HiplabsProvider>
  );
};

afterEach(() => {
  localStorage.clear();
});

describe("Favourite", () => {
  it("renders correctly", () => {
    const { getByRole } = renderComponent();
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("renders the StarBorderIcon when university is not a favourite", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("StarBorderIcon")).toBeInTheDocument();
  });

  it("renders the StarIcon when star is clicked to favourite the university", () => {
    const { getByTestId, getByRole } = renderComponent();

    fireEvent.click(getByRole("button"));
    expect(getByTestId("StarIcon")).toBeInTheDocument();
  });

  it("renders the StarBorderIcon when star is clicked to remove university from favourites", () => {
    const { getByTestId, getByRole } = renderComponent();

    fireEvent.click(getByRole("button"));
    expect(getByTestId("StarIcon")).toBeInTheDocument();

    fireEvent.click(getByRole("button"));
    expect(getByTestId("StarBorderIcon")).toBeInTheDocument();
  });
});