import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ApproveProjectRequest from './ApproveProjectRequest'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ApproveProjectRequest setToggle={jest.fn()} />
  </div>
)
const mockSetToggle = jest.fn()
describe('ApproveProjectRequest Component Testing', () => {
  test('should render ApproveProjectRequest component with out crashing', () => {
    render(toRender)
    const subTitle = screen.getAllByText('Add Project')
    expect(subTitle[0]).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('toggle-back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
  })
})
