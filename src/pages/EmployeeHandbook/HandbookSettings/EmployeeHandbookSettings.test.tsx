import '@testing-library/jest-dom'
import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import EmployeeHandbookSettings from './EmployeeHandbookSettings'
import AddNewHandbook from './AddNewPage/AddNewHandbook'
import EditHandbook from './EditPage/EditHandbook'
import EmployeeHandbookTable from './EmployeeHandbookTable'
import { cleanup, render, screen } from '../../../test/testUtils'
import { mockEmployeeHandbookList } from '../../../test/data/employeeHandbookSettingsData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
describe('Handbook Settings Component Testing', () => {
  describe('should render Handbook Settings Component without crashing', () => {
    const history = createMemoryHistory()
    beforeEach(() => {
      render(
        <Router history={history}>
          <EmployeeHandbookSettings />
        </Router>,
        {
          preloadedState: {
            employeeHandbookSettings: {
              employeeHandbooks: mockEmployeeHandbookList,
              isLoading: ApiLoadingState.succeeded,
            },
          },
        },
      )
    })
    afterEach(cleanup)
    test('should render HandbookSettings Title', () => {
      expect(screen.getByText('Handbook Settings')).toBeInTheDocument()
    })
    test('should render AddPage Button and Back Button', () => {
      const addPageButton = screen.getByRole('button', { name: 'Add Page' })
      expect(addPageButton).toBeInTheDocument()
      const backButton = screen.getByRole('button', { name: 'Back' })
      expect(backButton).toBeInTheDocument()
    })
    test(' should redirect to EmployeeHandbook page onClicking back button', () => {
      const backButtonEl = screen.getByRole('button', { name: 'Back' })
      userEvent.click(backButtonEl)
      expect(history.location.pathname).toBe('/EmployeeHandbook')
    })
    test('should render addPage Section', () => {
      const addHandbookButton = screen.getByRole('button', { name: 'Add Page' })
      userEvent.click(addHandbookButton)
      expect(
        render(
          <AddNewHandbook
            headerTitle="Add New Page"
            confirmButtonText="Save"
            backButtonHandler={jest.fn()}
          />,
        ),
      )
    })
    test('should render editPage Section', () => {
      render(
        <EmployeeHandbookTable
          setCurrentPage={mockSetCurrentPage}
          setPageSize={mockSetPageSize}
          currentPage={1}
          pageSize={20}
          paginationRange={[1, 2, 3]}
          editHandbookButtonHandler={jest.fn()}
        />,
        {
          preloadedState: {
            employeeHandbookSettings: {
              employeeHandbooks: mockEmployeeHandbookList,
              listSize: 43,
            },
          },
        },
      )
      const editBtn = screen.getByTestId('handbook-edit-btn0')
      userEvent.click(editBtn)
      expect(
        <EditHandbook
          headerTitle="Edit Page"
          confirmButtonText="Update"
          backButtonHandler={jest.fn()}
          handbookId={1}
          isEditHandbook={true}
        />,
      )
    })
  })
})
