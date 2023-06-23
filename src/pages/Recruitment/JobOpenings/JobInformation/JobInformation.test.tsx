import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import JobInformation from './JobInformation'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const mockSetTogglePage = jest.fn()

describe('Job Openings without data', () => {
  beforeEach(() => {
    render(<JobInformation />, {
      preloadedState: {
        jobVacancies: {
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          getAllTechnology: [],
          getAllJobVacancies: [],
        },
      },
    })
  })
  test('should be able to render  Job Openings  Title', () => {
    expect(screen.getByText('Job Info')).toBeInTheDocument()
  })
  test('should render add PIP component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should able to click Add Button', () => {
    const addBtnElement = screen.getByRole('button', {
      name: 'Back',
    })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })
  test('should render  Add PIP component with out crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
  })
  test('should be able to click edit button element', () => {
    const deleteBtnElement = screen.getByTestId('edit-button')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
})
