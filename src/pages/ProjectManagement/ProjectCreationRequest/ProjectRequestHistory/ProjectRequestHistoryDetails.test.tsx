import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectRequestHistoryDetails from './ProjectRequestHistoryDetails'
import { render, screen } from '../../../../test/testUtils'

const mockSetToggle = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectRequestHistoryDetails setToggle={mockSetToggle} />
  </div>
)

describe('ProjectRequestHistoryDetails Component Testing', () => {
  test('should render ProjectRequestHistoryDetails component with out crashing', () => {
    render(toRender)

    expect(
      screen.getByText('Project Request History Details'),
    ).toBeInTheDocument()

    const historyBackButton = screen.getAllByTestId('toggle-back-button')
    userEvent.click(historyBackButton[0])
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
})
