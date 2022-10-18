import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeHandbookSettings from './EmployeeHandbookSettings'
import AddNewHandbook from './AddNewPage/AddNewHandbook'
import EditHandbook from './EditPage/EditHandbook'
import EmployeeHandbookTable from './EmployeeHandbookTable'
import { cleanup, getByTestId, render, screen } from '../../../test/testUtils'
import { mockEmployeeHandbookList } from '../../../test/data/employeeHandbookSettingsData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeHandbookSettings />
  </div>
)
describe('Handbook Settings Component Testing', () => {
  describe('should render Handbook Settings Component without crashing', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          employeeHandbookSettings: {
            employeeHandbooks: mockEmployeeHandbookList,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
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
    test('should render addPage Section', () => {
      const addPageButton = screen.getByRole('button', { name: 'Add Page' })
      userEvent.click(addPageButton)
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
      const { container } = render(
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
      render(
        <EditHandbook
          headerTitle="Edit Page"
          confirmButtonText="Update"
          backButtonHandler={jest.fn()}
          handbookId={1}
          isEditHandbook={true}
        />,
      )
      const editBtn = getByTestId(container, 'handbook-edit-btn0')
      userEvent.click(editBtn)
      expect(
        render(
          <EditHandbook
            headerTitle="Edit Page"
            confirmButtonText="Update"
            backButtonHandler={jest.fn()}
            handbookId={1}
            isEditHandbook={true}
          />,
        ),
      )
    })
  })
})
