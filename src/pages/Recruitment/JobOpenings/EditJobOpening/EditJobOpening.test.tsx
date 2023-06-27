import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import EditJobOpening from './EditJobOpening'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const mockSetTogglePage = jest.fn()

describe('Job Openings without data', () => {
  beforeEach(() => {
    render(
      <EditJobOpening
        setToggle={mockSetTogglePage}
        editJobInfo={{
          id: 0,
          jobCode: '',
          positionVacant: '',
          minimumExperience: '',
          description: '',
          opendDate: '',
          expiryDate: '',
          noOfRequirements: 0,
          offered: 0,
          remaining: 0,
          status: '',
        }}
        setEditJobInfo={mockSetTogglePage}
        searchInput={''}
        selectRadioAction={''}
      />,
      {
        preloadedState: {
          jobVacancies: {
            isLoading: ApiLoadingState.succeeded,
            listSize: 0,
            getAllTechnology: [],
            getAllJobVacancies: [],
          },
        },
      },
    )
  })
  test('should be able to render  Job Openings  Title', () => {
    expect(screen.getByText('Edit Job Opening')).toBeInTheDocument()
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
    const deleteBtnElement = screen.getByTestId('updateBtn')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should render component with out crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(1)
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
    const pfNumber = screen.getByTestId('positionVacant')
    userEvent.type(pfNumber, '123456987')

    const uanNumber = screen.getByTestId('Job-Code')
    userEvent.type(uanNumber, '123456789')

    const panCardNumber = screen.getByTestId('noOfRequirements')
    userEvent.type(panCardNumber, '123456789')

    const aadharCardNumber = screen.getByTestId('minimumExperience')
    userEvent.type(aadharCardNumber, '636188754099')
  })
})
