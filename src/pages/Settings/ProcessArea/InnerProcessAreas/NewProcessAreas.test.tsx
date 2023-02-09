import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import NewProcessAreas from './NewProcessAreas'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockProcessAreas,
  mockProjectTailoring,
} from '../../../../test/data/processAreaData'

const mockSetToggle = jest.fn()
const clearButton = 'clear-btn'
describe('New Process Areas without data', () => {
  beforeEach(() => {
    render(<NewProcessAreas setToggle={mockSetToggle} />, {
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
  test('should be able to render Process Areas Title', () => {
    expect(screen.getByText('Process Areas')).toBeInTheDocument()
  })
  test('should render click on back button ', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
  test('should display error message, when user enters already existing tracker', async () => {
    const inputElement = screen.getByTestId('processArea')
    userEvent.type(inputElement, 'Risk Management gf')
    await waitFor(() => {
      expect(
        screen.getByText('Process Name Already Exists'),
      ).toBeInTheDocument()
    })
  })
  test('should render addTracker List component with out crashing', () => {
    expect(screen.getByText('Category:')).toBeInTheDocument()
    expect(screen.getByText('Process Area Name:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
  test('should select Location Name', () => {
    const LocationSelector = screen.getByTestId('form-select1')
    userEvent.selectOptions(LocationSelector, ['Project Management'])
    expect(LocationSelector).toHaveValue('1')
  })
  test('should able to clear input field', () => {
    const trackerNameInput = screen.getByTestId('processArea')
    userEvent.type(trackerNameInput, 'Project Planning')
    const LocationSelector = screen.getByTestId('form-select1')
    userEvent.selectOptions(LocationSelector, ['Project Management'])
    expect(LocationSelector).toHaveValue('1')
    const addButton = screen.getByTestId('save-btn')
    expect(addButton).toBeEnabled()
    userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(trackerNameInput).toHaveValue('Project Planning')
    userEvent.click(screen.getByTestId(clearButton))
    expect(trackerNameInput).toHaveValue('')
    expect(LocationSelector).toHaveValue('')
  })
})
