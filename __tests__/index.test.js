import { render, screen } from "@testing-library/react"
import Home from "../pages"

describe("Home", () => {
  beforeEach(() => {
    render(<Home />)
  })
  it("renders a home", () => {
    expect(screen.getByText("Supermarket list")).toBeTruthy()
  })
  it("has button Add item", () => {
    const button = screen.getByRole("button")
    expect(button.textContent).toBe("Add item")
  })
  it("list starts empty", () => {
    const value = screen.getByText(/item\(s\)/)
    expect(value.textContent.startsWith("0")).toBeTruthy()
  })
})
