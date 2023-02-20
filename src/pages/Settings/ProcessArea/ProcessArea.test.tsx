import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProcessArea from './ProcessArea'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockProjectTailoring,
  mockProcessAreas,
} from '../../../test/data/processAreaData'

const mockSetToggle = jest.fn()

describe('New Process Areas without data', () => {
  beforeEach(() => {
    render(<ProcessArea />, {
      preloadedState: {
        processArea: {
          isLoading: ApiLoadingState.idle,
          error: null,
          getProjectTailoringDocument: mockProjectTailoring,
          ProcessSubHeads: [],
          ProcessAreas: mockProcessAreas,
          currentPage: 1,
          pageSize: 20,
        },
      },
    })
  })
  test('should be able to render Process Area List  Title', () => {
    expect(screen.getByText('Process Area List')).toBeInTheDocument()
  })
  test('should select Location Name', () => {
    const LocationSelector = screen.getByTestId('form-select1')
    userEvent.selectOptions(LocationSelector, ['Project Management'])
    expect(LocationSelector).toHaveValue('Project Management')
  })
  test('should render addTracker List component with out crashing', () => {
    expect(screen.getByText('Category:')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add Process Area' }),
    ).toBeInTheDocument()
  })
  test('should render click on back button ', () => {
    const backButtonElement = screen.getByTestId('Process-Area')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
  })
})
