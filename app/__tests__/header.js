import React from "react"
import renderer from "react-test-renderer"
import Test from "../src/components/header/header"

describe("Test", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Test />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
