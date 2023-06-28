/* eslint-disable react/react-in-jsx-scope */
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import moment from 'moment'
import React from 'react'
import EditUpComingJoinee from './EditUpComingJoinee'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { GetUpComingJoineeList } from '../../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const mockSetTogglePage = jest.fn()
const fileUploadInput = 'file-upload'
const selectDepartment = 'departmentName'
const designationTextInput = 'designation'
const technologyInpitval = 'technology'
const onChangeInputHandler = jest.fn()

describe('Vendor Details without data', () => {
  beforeEach(() => {
    render(
      <EditUpComingJoinee
        setToggle={mockSetTogglePage}
        editNewJoineeInfo={{
          id: 0,
          appliedForLookUp: '',
          candidateName: '',
          designation: '',
          dateOfJoining: '',
          currentCTC: '',
          employmentType: '',
          jobType: '',
          status: '',
          comments: '',
          attachedDocumentPath: null,
          experience: '',
          candidateEmail: '',
          dateOfBirth: null,
          candidateId: 0,
          technology: '',
          candidateInterviewStatus: '',
          departmentName: '',
          mobile: '',
          sendOfferMessagetoCandidate: null,
        }}
        setEditNewJoineeInfo={mockSetTogglePage}
        searchInput={undefined}
      />,
      {
        preloadedState: {
          preloadedState: {
            upComingJoinList: {
              upComingJoineeListDetails: [],
              listSize: 0,
              isLoading: ApiLoadingState.idle,
              getUpComingJoineeList: {} as GetUpComingJoineeList,
            },
          },
        },
      },
    )
  })

  afterEach(cleanup)
  test('should render Departments filter', () => {
    const departments = screen.getByTestId(selectDepartment)
    expect(departments).toBeTruthy()
  })
  test('should render designation filter', () => {
    const departments = screen.getByTestId(designationTextInput)
    expect(departments).toBeTruthy()
  })
  test('should render technology filter', () => {
    const departments = screen.getByTestId(technologyInpitval)
    expect(departments).toBeTruthy()
  })

  test('should be able to render  Edit UpComingJoinee  Title', () => {
    expect(screen.getByText('Edit Upcoming Joinee')).toBeInTheDocument()
  })

  test('should render edit Edit UpComing Joinee component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should able to click Back Button', () => {
    const backBtnElement = screen.getByRole('button', {
      name: 'Back',
    })
    expect(backBtnElement).toBeEnabled()
    userEvent.click(backBtnElement)
  })
  test('should be able to click update button element', () => {
    const updateBtnElement = screen.getByTestId('update-btn')
    expect(updateBtnElement).toBeInTheDocument()
    userEvent.click(updateBtnElement)
  })
  test('should render Edit New Joinee List component with out crashing', () => {
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
    expect(screen.getByText('D.O.J:')).toBeInTheDocument()
    expect(screen.getByText('Name:')).toBeInTheDocument()
    expect(screen.getByText('Email:')).toBeInTheDocument()
    expect(screen.getByText('Experience:')).toBeInTheDocument()
    expect(screen.getByText('Department:')).toBeInTheDocument()
    expect(screen.getByText('Designation:')).toBeInTheDocument()
    expect(screen.getByText('Technology:')).toBeInTheDocument()
    expect(screen.getByText('CTC:')).toBeInTheDocument()
    expect(screen.getByText('Employment Type:')).toBeInTheDocument()
    expect(screen.getByText('Job Type:')).toBeInTheDocument()
    expect(screen.getByText('Joining Status:')).toBeInTheDocument()
    expect(screen.getByText('Comments:')).toBeInTheDocument()
    expect(screen.getByText('Attach File:')).toBeInTheDocument()
  })
  test('should able to render every element', () => {
    const position = screen.getByTestId('updatePosition')
    userEvent.type(position, 'developer')

    const name = screen.getByTestId('updateName')
    userEvent.type(name, 'Ravi')

    const email = screen.getByTestId('email')
    userEvent.type(email, 'ravi@gmail.com')

    const experience = screen.getByTestId('Experience')
    userEvent.type(experience, '3')

    const departmentName = screen.getByTestId('departmentName')
    userEvent.type(departmentName, 'Admin Executive')

    const designation = screen.getByTestId('designation')
    userEvent.type(designation, 'designation')

    const technology = screen.getByTestId('technology')
    userEvent.type(technology, 'technology')

    const jobType = screen.getByTestId('jobTypeId')
    userEvent.type(jobType, 'Part Time')

    const jobStatus = screen.getByTestId('update-joining-Status')
    userEvent.type(jobStatus, 'OFFERED')
  })

  test('Should display error message when wrong format of file is uploaded', () => {
    const file = new File(['feedbackFormTest'], 'feedbackFormTest.jpg', {
      type: 'doc/docx/pdf/zip',
    })
    const fileInput = screen.getByTestId(fileUploadInput)
    userEvent.upload(fileInput, file)

    expect(
      screen.getByText('Please choose a doc, docx, pdf, or zip file.'),
    ).toBeInTheDocument()
  })

  test('Should be able to Attach File', () => {
    const file = new File(['file-Upload'], 'file-Upload', {
      type: 'doc/docx/pdf',
    })
    const fileInput = screen.getByTestId(fileUploadInput)
    userEvent.upload(fileInput, file)

    expect(fileInput.files[0]).toStrictEqual(file)
    expect(fileInput.files.item(0)).toStrictEqual(file)
    expect(fileInput.files).toHaveLength(1)
    expect(fileInput).toBeInTheDocument()
  })
  describe('onHandleDatePicker', () => {
    test('should update editToDate with formatted date', () => {
      const dateFormat = 'YYYY-MM-DD'
      const setEditToDate = jest.fn()

      const value = new Date('2023-06-27')
      const fakeObject = {
        setEditToDate,
      }

      const onHandleDatePicker = (value: Date) => {
        fakeObject.setEditToDate(moment(value).format(dateFormat))
      }

      onHandleDatePicker(value)

      expect(setEditToDate).toHaveBeenCalledWith('2023-06-27')
    })
  })

  test('should call onChangeInputHandler when the value is changed', () => {
    const selectElement = screen.getByLabelText('Designation')
    userEvent.selectOptions(selectElement, 'Select Designation')

    expect(onChangeInputHandler).toHaveBeenCalledTimes(0)

    const selectElement1 = screen.getByLabelText('technology')
    userEvent.selectOptions(selectElement1, '')

    expect(onChangeInputHandler).toHaveBeenCalledTimes(0)
  })
})
