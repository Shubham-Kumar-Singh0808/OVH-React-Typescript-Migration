import '@testing-library/jest-dom'
import React from 'react'
import ProjectRequestHistoryDetails from './ProjectRequestHistoryDetails'
import { render, screen } from '../../../../test/testUtils'

const setToggle = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectRequestHistoryDetails setToggle={setToggle} />
  </div>
)

describe('ProjectRequestHistoryDetails Component Testing', () => {
  test('should render ProjectRequestHistoryDetails component with out crashing', () => {
    render(toRender)

    expect(
      screen.getByText('Project Request History Details'),
    ).toBeInTheDocument()
  })
})
