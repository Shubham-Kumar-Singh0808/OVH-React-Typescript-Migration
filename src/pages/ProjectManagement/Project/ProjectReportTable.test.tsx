import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectReportTable from './ProjectReportTable'
import { waitFor, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockProjectReportData } from '../../../test/data/projectReportData'
import { mockEmployeeProjectsDetail } from '../../../test/data/employeeProjectsData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const deAllocated = 'De-Allocated'

const mockUserAccess = {
  featureId: 25,
  name: 'Projects',
  viewaccess: true,
  createaccess: true,
  updateaccess: true,
  deleteaccess: true,
  childFeatures: null,
}

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectReportTable
      paginationRange={[]}
      currentPage={1}
      setCurrentPage={jest.fn()}
      pageSize={1}
      setPageSize={jest.fn()}
      isCloseBtnVisible={true}
      userAccess={mockUserAccess}
    />
  </div>
)
describe('Project Report Table Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        projectReport: {
          listSize: 28,
          isProjectLoading: ApiLoadingState.succeeded,
          isClientProjectLoading: ApiLoadingState.succeeded,
          ProjectDetails: {
            Projsize: mockProjectReportData.Projsize,
            Projs: mockProjectReportData.Projs,
          },
          Clients: mockProjectReportData.Projs,
          ClientProjects: mockEmployeeProjectsDetail,
        },
      },
    })
  })

  test('Should be able to see table titles', () => {
    expect(screen.getByText('Project Code')).toBeInTheDocument()
    expect(screen.getByText('Project Name')).toBeInTheDocument()
    expect(screen.getByText('Pricing Model')).toBeInTheDocument()
    expect(screen.getByText('Client')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Project Manager')).toBeInTheDocument()
    expect(screen.getByText('Delivery Manager')).toBeInTheDocument()
    expect(screen.getByText('Start Date')).toBeInTheDocument()
    expect(screen.getByText('End Date')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  test('Should be able to see total of 6 records', () => {
    expect(screen.getByText('Total Records: 28')).toBeInTheDocument()
  })

  test('Should be able to see page size', async () => {
    const pageSize = screen.getByTestId('paginationTestID')

    await waitFor(() => {
      userEvent.selectOptions(pageSize, ['20'])
      expect(pageSize).toHaveValue('20')
    })
  })
})

describe('Project Report Table Testing with sub table', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
        projectReport: {
          listSize: 28,
          isProjectLoading: ApiLoadingState.succeeded,
          isClientProjectLoading: ApiLoadingState.succeeded,
          ProjectDetails: {
            Projsize: mockProjectReportData.Projsize,
            Projs: mockProjectReportData.Projs,
          },
          Clients: mockProjectReportData.Projs,
          ClientProjects: mockEmployeeProjectsDetail,
        },
      },
    })
  })
  jest.retryTimes(3)
  test('Should be able open sub table when clicking plus button', async () => {
    const plusBtn = screen.getAllByTestId('plus-btn')
    userEvent.click(plusBtn[0])
    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument()
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Designation')).toBeInTheDocument()
      expect(screen.getByText('Department')).toBeInTheDocument()
      expect(screen.getByText('Allocation')).toBeInTheDocument()
      expect(screen.getByText('Allocated Date')).toBeInTheDocument()
      expect(screen.getByText('Billable')).toBeInTheDocument()
      expect(screen.getByText('Current Status')).toBeInTheDocument()
    })
  })

  test('Should be able open sub table when clicking plus button', () => {
    const plusBtn = screen.getAllByTestId('plus-btn')
    userEvent.click(plusBtn[0])
    const minusBtn = screen.getAllByTestId('minus-btn')
    userEvent.click(minusBtn[0])
  })

  test('Should be able click close btn', () => {
    const closeBtn = screen.getAllByTestId('close-btn')
    userEvent.click(closeBtn[0])

    const modalConfirmBtn = screen.getByTestId('modalConfirmBtn')
    userEvent.click(modalConfirmBtn)
  })

  test('Should be able click delete btn', () => {
    const closeBtn = screen.getAllByTestId('delete-btn')
    userEvent.click(closeBtn[3])

    const modalConfirmBtn = screen.getByTestId('modalConfirmBtn')
    userEvent.click(modalConfirmBtn)
  })

  test('Should be able open sub table and click close btn', () => {
    const plusBtn = screen.getAllByTestId('plus-btn')
    userEvent.click(plusBtn[0])

    const closeBtn = screen.getAllByTestId('close-btn')
    userEvent.click(closeBtn[0])

    const modalConfirmBtn = screen.getByTestId('modalConfirmBtn')
    userEvent.click(modalConfirmBtn)
  })
  test('Should be able open sub table and click delete btn', async () => {
    const plusBtn = screen.getAllByTestId('plus-btn')
    userEvent.click(plusBtn[0])
    await waitFor(() => {
      const closeBtn = screen.getByTestId('delete-sub-btn')
      userEvent.click(closeBtn)
      const modalConfirmBtn = screen.getByTestId('modalConfirmBtn')
      userEvent.click(modalConfirmBtn)
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
    })
  })

  test('Should be able open sub table and edit field', async () => {
    const plusBtn = screen.getAllByTestId('plus-btn')
    userEvent.click(plusBtn[0])
    await waitFor(() => {
      const editBtn = screen.getAllByTestId('edit-sub-project-btn')
      userEvent.click(editBtn[0])
      const inputField = screen.getByTestId('allocation')
      inputField.click()
      inputField.focus()
      userEvent.type(inputField, '2')
      inputField.blur()
    })

    // Billable
    const billableField = screen.getByTestId('formBillable')
    userEvent.selectOptions(billableField, ['No'])

    expect(billableField).toHaveValue('No')

    // Status
    const allocatedField = screen.getByTestId('formallocated')
    userEvent.selectOptions(allocatedField, [deAllocated])

    expect(allocatedField).toHaveValue(deAllocated)

    // Save update btn
    const updateBtn = screen.getByTestId('update-project-btn')
    userEvent.click(updateBtn)
  })
})
