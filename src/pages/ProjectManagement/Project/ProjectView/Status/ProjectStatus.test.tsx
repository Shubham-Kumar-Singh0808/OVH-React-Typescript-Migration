import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectStatus from './ProjectStatus'
import { render, screen } from '../../../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../../../test/data/userAccessToFeaturesData'

const mockSetToggle = jest.fn()

describe('Ticket Configurations Filter Options Component Testing', () => {
  beforeEach(() => {
    render(<ProjectStatus />, {
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
