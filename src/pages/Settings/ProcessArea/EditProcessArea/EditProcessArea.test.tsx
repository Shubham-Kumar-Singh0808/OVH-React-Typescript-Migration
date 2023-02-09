import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EditProcessArea from './EditProcessArea'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockProcessAreaDetails,
  mockProcessAreas,
  mockProjectTailoring,
} from '../../../../test/data/processAreaData'

const mockSetToggle = jest.fn()

describe('New Process Areas without data', () => {
  beforeEach(() => {
    render(<EditProcessArea setToggle={mockSetToggle} />, {
      preloadedState: {
        processArea: {
          isLoading: ApiLoadingState.idle,
          error: null,
          getProjectTailoringDocument: mockProjectTailoring,
          ProcessSubHeads: [],
          ProcessAreas: mockProcessAreas,
          currentPage: 1,
          pageSize: 20,
          processAreaDetails: mockProcessAreaDetails,
        },
      },
    })
  })
  test('should be able to render Process Areas Title', () => {
    expect(screen.getByText('Edit Process Area')).toBeInTheDocument()
  })
  test('should render click on back button ', () => {
    const backButtonElement = screen.getByTestId('back-btn-handler')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
  test('should render addTracker List component with out crashing', () => {
    expect(screen.getByText('Category:')).toBeInTheDocument()
    expect(screen.getByText('Process Area Name:')).toBeInTheDocument()
    expect(screen.getByText('Document Name:')).toBeInTheDocument()
    expect(screen.getByText('Responsible:')).toBeInTheDocument()
    expect(screen.getByText('Project Document Link:')).toBeInTheDocument()
    expect(screen.getByText('Status:')).toBeInTheDocument()
    expect(screen.getByText('Order')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
  })
})
