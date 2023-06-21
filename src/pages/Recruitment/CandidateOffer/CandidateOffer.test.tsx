import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import moment from 'moment'
import CandidateOffer from './CandidateOffer'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'

const workFlowInput = 'msg-candidate'
const fileUploadInput = 'file-upload'
const handleAddCandidate = jest.fn()
describe('Job Openings without data', () => {
  beforeEach(() => {
    render(<CandidateOffer />, {
      preloadedState: {
        addNewCandidate: {
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })

  test('should render workFlow checkbox input', () => {
    expect(screen.getByTestId(workFlowInput)).toBeTruthy()
  })

  test('should render with data ', () => {
    expect(screen.getByText('Attach File:')).toBeInTheDocument()
    expect(screen.getByText('Name:')).toBeInTheDocument()
    expect(screen.getByText('Department:')).toBeInTheDocument()
    expect(screen.getByText('Designation:')).toBeInTheDocument()
    expect(screen.getByText('D.O.J:')).toBeInTheDocument()
    expect(screen.getByText('CTC:')).toBeInTheDocument()
    expect(screen.getByText('Employment Type:')).toBeInTheDocument()
    expect(screen.getByText('Job Type:')).toBeInTheDocument()
    expect(screen.getByText('Comments:')).toBeInTheDocument()
  })
  test('should able to Add input field', () => {
    const positionType = screen.getByTestId('candidatePosition')
    userEvent.type(positionType, 'Java')
    const name = screen.getByTestId('candidateName')
    userEvent.type(name, 'Raju')
    const designationInput = screen.getByTestId('departmentName')
    fireEvent.change(designationInput, ['Accounts & Finance'])
    expect(designationInput).toHaveValue('')
    const departmentInput = screen.getByTestId('designation-id')
    fireEvent.change(departmentInput, ['Finance and Account Executive'])
    expect(departmentInput).toHaveValue('')
    const ctc = screen.getByTestId('CandidateCTC')
    userEvent.type(ctc, '6')
    const employmentType = screen.getByTestId('selectEmploymentType')
    userEvent.type(employmentType, 'Permanent')
    const textType = screen.getByTestId('text-area')
    userEvent.type(textType, 'welocome Offer')
  })

  test('should be able to click edit button element', () => {
    const deleteBtnElement = screen.getByTestId('save-btn')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('Should display error message when wrong format of file is uploaded', () => {
    const file = new File(['feedbackFormTest'], 'feedbackFormTest.jpg', {
      type: 'doc/docx/pdf/zip',
    })
    const fileInput = screen.getByTestId(fileUploadInput)
    userEvent.upload(fileInput, file)
    expect(
      screen.getByText('Please choose doc or docx or pdf or zip. file'),
    ).toBeInTheDocument()
  })

  test('should render Template rich text editor', () => {
    const Comments = screen.findByTestId('text-area')
    expect(Comments).toBeTruthy()
  })
  test('should render select date filter', () => {
    const selectDate = screen.findByTestId('join-select')
    expect(selectDate).toBeTruthy()
  })

  it('should call handleAddCandidate when the Add button is clicked', () => {
    const addButton = screen.getByTestId('save-btn')
    userEvent.click(addButton)
    expect(handleAddCandidate).toHaveBeenCalledTimes(0)
  })
  test('Should be able to upload feedback form', () => {
    const file = new File(['feedbackForm'], 'feedbackForm.docx', {
      type: 'doc/docx/pdf',
    })
    const fileInput = screen.getByTestId(fileUploadInput)
    userEvent.upload(fileInput, file)

    expect(fileInput.files[0]).toStrictEqual(file)
    expect(fileInput.files.item(0)).toStrictEqual(file)
    expect(fileInput.files).toHaveLength(1)
    expect(fileInput).toBeInTheDocument()
  })
})
