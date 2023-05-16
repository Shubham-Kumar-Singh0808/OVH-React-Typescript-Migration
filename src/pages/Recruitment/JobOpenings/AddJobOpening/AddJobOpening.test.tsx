import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddJobOpening from './AddJobOpening'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const mockSetTogglePage = jest.fn()

describe('Job Openings without data', () => {
  beforeEach(() => {
    render(<AddJobOpening />, {
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
    expect(screen.getByText('Add Job Opening')).toBeInTheDocument()
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
  test('should be able to click edit button element', () => {
    const deleteBtnElement = screen.getByTestId('save-btn')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should be able to click edit button element', () => {
    const deleteBtnElement = screen.getByTestId('clear-btn')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should render  Add PIP component with out crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
  })
  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
      />,
    )
  })
  test('should render with data ', () => {
    expect(screen.getByText('Job Code:')).toBeInTheDocument()
    expect(screen.getByText('Job Title:')).toBeInTheDocument()
    expect(screen.getByText('No. of Openings:')).toBeInTheDocument()
    expect(screen.getByText('Experience:')).toBeInTheDocument()
  })
  test('should able to render every element', () => {
    const pfNumber = screen.getByTestId('jobTitle')
    userEvent.type(pfNumber, '123456987')

    const uanNumber = screen.getByTestId('Job-Code')
    userEvent.type(uanNumber, '123456789')

    const panCardNumber = screen.getByTestId('noOfOpenings')
    userEvent.type(panCardNumber, '123456789')

    const aadharCardNumber = screen.getByTestId('experience')
    userEvent.type(aadharCardNumber, '636188754099')
  })
})