import { fireEvent, render, screen } from "@testing-library/react"
import ItemForm from "components/ItemForm"

describe("ItemForm", () => {
  it("renders correctly", () => {
    render(<ItemForm setShowModal={() => {}} listState={[[], () => {}]} />)

    screen.getByText("Add item")
  })
  it("close button works", () => {
    const mockHandler = jest.fn()
    render(<ItemForm setShowModal={mockHandler} listState={[[], () => {}]} />)

    const button = screen.getByText("Close")
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
  it("add button is disabled when input empty", () => {
    const mockHandler = jest.fn()
    render(<ItemForm setShowModal={() => {}} listState={[[], mockHandler]} />)

    const button = screen.getByText("Add")
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(0)
  })
  it("add button is enabled when input isent empty", () => {
    jest.useFakeTimers()
    const mockHandler = jest.fn()
    render(<ItemForm setShowModal={() => {}} listState={[[], mockHandler]} />)

    const input = screen.getByLabelText("item")
    fireEvent.change(input, { target: { value: "Helado" } })

    const button = screen.getByText("Add")
    fireEvent.click(button)
    jest.runOnlyPendingTimers()

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
