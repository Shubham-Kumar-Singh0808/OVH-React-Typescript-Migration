import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectRequestView from './ProjectRequestView'
import { render, screen } from '../../../../test/testUtils'

const mockSetToggle = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectRequestView setToggle={mockSetToggle} />
  </div>
)

describe('ProjectRequestView Component Testing', () => {
  test('should render ProjectRequestView component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Project Request History')).toBeInTheDocument()

    const viewBackButton = screen.getAllByTestId('toggle-back-button')
    userEvent.click(viewBackButton[0])
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
})
