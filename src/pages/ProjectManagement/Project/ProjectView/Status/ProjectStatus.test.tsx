import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectStatus from './ProjectStatus'
import { render, screen } from '../../../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../../../test/data/userAccessToFeaturesData'

const mockSetToggle = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectStatus />
  </div>
)

describe('ProjectStatus Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })

  test('should render Ticket Report component with out crashing', () => {
    render(<ProjectStatus />)
    const addButtonElement = screen.getByTestId('add-btn')
    expect(addButtonElement).toBeInTheDocument()
    userEvent.click(addButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
  })
})
