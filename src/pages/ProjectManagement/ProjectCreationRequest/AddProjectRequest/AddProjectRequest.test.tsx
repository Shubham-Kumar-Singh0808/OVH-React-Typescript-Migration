import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddProjectRequest from './AddProjectRequest'
import { render, screen } from '../../../../test/testUtils'

const mockSetToggle = jest.fn()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddProjectRequest setToggle={jest.fn()} />
  </div>
)

describe('AddProjectRequest Component Testing', () => {
  test('should render AddProjectRequest component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('Request Project')).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('toggle-back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
  })
})
