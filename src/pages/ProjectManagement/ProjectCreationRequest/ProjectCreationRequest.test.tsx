import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectCreationRequest from './ProjectCreationRequest'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectCreationRequest />
  </div>
)
const mockSetToggle = jest.fn()
describe('ProjectCreationRequest Component Testing', () => {
  test('should render ProjectCreationRequest component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('Project Request Report')).toBeInTheDocument()
    const subject = screen.getByTestId('searchField')
    userEvent.type(subject, 'testing')
    expect(subject).toHaveValue('testing')
    const addButtonElement = screen.getByTestId('add-project-test')
    expect(addButtonElement).toBeInTheDocument()
    userEvent.click(addButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
  })
})
