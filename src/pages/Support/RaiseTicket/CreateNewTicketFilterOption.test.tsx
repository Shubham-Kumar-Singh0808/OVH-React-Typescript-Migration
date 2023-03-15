import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import CreateNewTicketFilterOptions from './CreateNewTicketFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import {
  mockCategoryList,
  mockDepartmentNamesList,
  mockSubCategoryList,
  mockTrackerList,
} from '../../../test/data/ticketApprovalsData'

const mockSetTogglePage = jest.fn()

describe('Ticket Approvals Filter Options Component Testing', () => {
  beforeEach(() => {
    render(
      <CreateNewTicketFilterOptions
        setToggle={mockSetTogglePage}
        userViewAccess={true}
      />,
    )
  })
  test('should render tracker select field', () => {
    const trackerSelect = screen.findByTestId('trackerSelect')
    expect(trackerSelect).toBeTruthy()
  })
  test('should render approval status filter', () => {
    const approvalStatus = screen.findByTestId('departmentName')
    expect(approvalStatus).toBeTruthy()
  })
  test('should render category name select filter', () => {
    const categoryNameSelect = screen.findByTestId('categoryNameSelect')
    expect(categoryNameSelect).toBeTruthy()
  })
  test('should render sub category name select filter', () => {
    const categoryNameSelect = screen.findByTestId('subCategoryNameSelect')
    expect(categoryNameSelect).toBeTruthy()
  })
  test('should render date option select field', () => {
    const dateOptionSelect = screen.findByTestId('dateOptionSelect')
    expect(dateOptionSelect).toBeTruthy()
  })
  test('should render subject input text field', () => {
    const dateOptionSelect = screen.findByTestId('selectSubject')
    expect(dateOptionSelect).toBeTruthy()
  })
  test('should render priority select field', () => {
    const dateOptionSelect = screen.findByTestId('priority')
    expect(dateOptionSelect).toBeTruthy()
  })
  test('should render Template rich text editor', () => {
    const Comments = screen.findByTestId('ckEditor-component')
    expect(Comments).toBeTruthy()
  })
  test('should render File upload', () => {
    const Comments = screen.findByTestId('fileUpload')
    expect(Comments).toBeTruthy()
  })
})

describe('Create New Ticket Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(
      <CreateNewTicketFilterOptions
        setToggle={mockSetTogglePage}
        userViewAccess={true}
      />,
      {
        preloadedState: {
          ticketApprovals: {
            trackerList: mockTrackerList,
            departmentNameList: mockDepartmentNamesList,
            departmentCategoryList: mockCategoryList,
            subCategoryList: mockSubCategoryList,
          },
        },
      },
    )
  })
  screen.debug()
  test('should able to select values for options for respective select element', async () => {
    const trackerSelect = screen.getByTestId('trackerSelect')
    userEvent.selectOptions(trackerSelect, ['Issue'])
    expect(trackerSelect).toHaveValue('1')

    const departmentSelect = screen.getByTestId('departmentName')
    userEvent.selectOptions(departmentSelect, ['HR'])
    expect(departmentSelect).toHaveValue('3')

    const categoryName = screen.getByTestId('categoryNameSelect')
    userEvent.selectOptions(categoryName, [''])
    expect(categoryName).toHaveValue('')

    const subCategoryName = screen.getByTestId('subCategoryNameSelect')
    userEvent.selectOptions(subCategoryName, [''])
    expect(subCategoryName).toHaveValue('')

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '10 Jan, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')

    const subject = screen.getByTestId('selectSubject')
    userEvent.type(subject, 'testing')
    expect(subject).toHaveValue('testing')

    const selectPriority = screen.getByTestId('priority')
    userEvent.selectOptions(selectPriority, ['Normal'])
    expect(selectPriority).toHaveValue('Normal')

    const createBtnElement = screen.getByRole('button', { name: 'Create' })
    expect(createBtnElement).toBeDisabled()
    userEvent.click(createBtnElement)
    userEvent.click(screen.getByTestId('clear-btn'))
    userEvent.selectOptions(trackerSelect, [''])
    userEvent.selectOptions(departmentSelect, [''])
    userEvent.selectOptions(categoryName, [''])
    userEvent.selectOptions(subCategoryName, [''])
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')
    userEvent.type(subject, '')
    userEvent.selectOptions(selectPriority, ['Normal'])
    expect(screen.getByTestId('create-btn')).toBeDisabled()
  })

  test('should upload file image', async () => {
    const fileToUpload = new File(['(⌐□_□)'], 'testFile.png', {
      type: 'image/png',
    })
    const uploader = screen.getByTestId('file-upload') as HTMLInputElement

    await waitFor(() => {
      userEvent.upload(uploader, fileToUpload)
    })

    expect(uploader).toBeTruthy()
  })
  test('should be able to click Add button element', () => {
    const toggleBtn = screen.getByRole('button', { name: 'Add' })
    userEvent.click(toggleBtn)
    expect(toggleBtn).toBeInTheDocument()
  })
})
