import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectCreationRequestTable from './ProjectCreationRequestTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockProjectRequestList } from '../../../test/data/projectCreationRequestData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const mockSetToggle = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectCreationRequestTable
      setCurrentPage={mockSetCurrentPage}
      setPageSize={mockSetPageSize}
      currentPage={1}
      pageSize={20}
      paginationRange={[1, 2, 3]}
      setToggle={mockSetToggle}
      userDeleteAction={true}
      userRejectAction={true}
    />
    ,
  </div>
)

describe('Employee ProjectCreationRequestTable Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        projectCreationRequest: {
          getAllProjectRequestList: mockProjectRequestList,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)

  test('should render number of records', () => {
    expect(
      screen.getByText(
        'Total Records: ' + mockProjectRequestList.projectRequestListSize,
      ),
    ).toBeInTheDocument()
  })
  test('should render first page data only', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByText('Next ›', { exact: true }))
      expect(screen.getByText('« First')).not.toHaveAttribute('')
      expect(screen.getByText('‹ Prev')).not.toHaveAttribute('')
    })
  })
  test('should disable first and prev in pagination if first page', async () => {
    await waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render ProjectCreationRequestTable component with data without crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(false)
      expect(screen.getAllByRole('row')).toHaveLength(2)
    })
  })
  test('should render table with data', () => {
    expect(screen.getByText('Approved')).toBeInTheDocument()
  })
  test('should click on view button  ', () => {
    const viewElement = screen.getAllByTestId('view-btn')
    userEvent.click(viewElement[0])
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
  test('should click on history button  ', () => {
    const historyElement = screen.getAllByTestId('history-btn')
    userEvent.click(historyElement[0])
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
  test('should click on delete button ', () => {
    const deleteElement = screen.getAllByTestId('delete-btn')
    userEvent.click(deleteElement[0])
    expect(deleteElement[0]).toBeInTheDocument()
  })

  test('should click on reject button ', () => {
    const rejectElement = screen.getAllByTestId('reject-btn')
    userEvent.click(rejectElement[0])
    expect(rejectElement[0]).toBeInTheDocument()
  })
})
