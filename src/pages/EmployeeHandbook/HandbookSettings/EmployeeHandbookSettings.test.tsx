import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import EmployeeHandbookSettings from './EmployeeHandbookSettings'
import EditHandbook from './EditPage/EditHandbook'
import AddNewHandbook from './AddNewPage/AddNewHandbook'
import EmployeeHandbookTable from './EmployeeHandbookTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeeHandbookList } from '../../../test/data/employeeHandbookSettingsData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
describe('Handbook Settings Component Testing', () => {
  test('should render Handbook Settings Component without crashing', () => {
    render(<EmployeeHandbookSettings />, {
      preloadedState: {
        employeeHandbookSettings: {
          employeeHandbooks: mockEmployeeHandbookList,
        },
      },
    })
    expect(screen.getByText('Handbook Settings')).toBeInTheDocument()
  })
  test('render edit page component', () => {
    render(
      <EditHandbook
        headerTitle="Edit Page"
        confirmButtonText="Update"
        backButtonHandler={jest.fn()}
        handbookId={0}
        isEditHandbook={false}
      />,
    )
  })
  test('render Add Page Component', () => {
    render(
      <AddNewHandbook
        headerTitle="Add New Page"
        confirmButtonText="Save"
        backButtonHandler={jest.fn()}
      />,
    )
  })

  describe('test with data', () => {
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
              listSize: 43,
            },
          },
        },
      )
    })
    test('should able to redirect to Employee Handbook page', async () => {
      const btnElement = screen.getByRole('button', { name: 'Back' })
      userEvent.click(btnElement)
      await waitFor(() => {
        expect(history.location.pathname).toBe('/EmployeeHandbook')
      })
    })
    it('should redirect to Add New Page Component', async () => {
      const addPageButton = screen.getByRole('button', { name: 'Add Page' })
      userEvent.click(addPageButton)
      await waitFor(() => {
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
    })
  })

  describe('Edit Page Component testing', () => {
    beforeEach(() => {
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
    })
    it('should redirect to Add New Page Component', async () => {
      const editButton = screen.getByTestId('handbook-edit-btn0')
      userEvent.click(editButton)
      await waitFor(() => {
        expect(
          render(
            <EditHandbook
              headerTitle="Edit Page"
              confirmButtonText="Update"
              backButtonHandler={jest.fn()}
              isEditHandbook={false}
              handbookId={0}
            />,
          ),
        )
      })
    })
  })
})
