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
import {
  mockCountries,
  mockHandbookList,
  mockSelectedCountries,
} from '../../../test/data/handbookTotalListData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const mockEditButtonHandler = jest.fn()
const backButtonHandler = jest.fn()
describe('Handbook Settings Component Testing', () => {
  test('should render Handbook Settings Component without crashing', () => {
    const history = createMemoryHistory()
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
    expect(screen.getByText('Handbook Settings')).toBeInTheDocument()
  })
  test('render edit page component', () => {
    render(
      <EditHandbook
        headerTitle="Edit Page"
        confirmButtonText="Update"
        backButtonHandler={backButtonHandler}
        handbookId={2}
        isEditHandbook={true}
      />,
    )
  })
  test('render Add Page Component', () => {
    render(
      <AddNewHandbook
        headerTitle="Add New Page"
        confirmButtonText="Save"
        backButtonHandler={backButtonHandler}
      />,
    )
  })

  describe('Edit Page Component testing', () => {
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
              listSize: 43,
            },
          },
        },
      )
    })
    test('check edit button', () => {
      render(
        <EmployeeHandbookTable
          setCurrentPage={mockSetCurrentPage}
          setPageSize={mockSetPageSize}
          currentPage={2}
          pageSize={20}
          paginationRange={[1, 2, 3]}
          editHandbookButtonHandler={mockEditButtonHandler}
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
      const editButtonEl = screen.getByTestId('handbook-edit-btn0')
      userEvent.click(editButtonEl)
      expect(editButtonEl).toBeInTheDocument()
    })
  })
  describe('Edit Page Component testing', () => {
    beforeEach(() => {
      render(<EmployeeHandbookSettings />, {
        preloadedState: {
          employeeHandbookSettings: {
            employeeHandbooks: mockEmployeeHandbookList,
          },
        },
      })
    })
    it('should redirect to Edit Handbook Page Component with `id=33` ', async () => {
      render(
        <EmployeeHandbookTable
          setCurrentPage={mockSetCurrentPage}
          setPageSize={mockSetPageSize}
          currentPage={2}
          pageSize={20}
          paginationRange={[1, 2, 3]}
          editHandbookButtonHandler={mockEditButtonHandler}
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
      const editButtonEl = screen.getByTestId('handbook-edit-btn33')
      userEvent.click(editButtonEl)
      expect(mockEditButtonHandler).toBeCalledTimes(1)
      await waitFor(() => {
        expect(
          render(
            <EditHandbook
              headerTitle="Edit Page"
              confirmButtonText="Update"
              backButtonHandler={backButtonHandler}
              isEditHandbook={true}
              handbookId={33}
            />,
            {
              preloadedState: {
                employeeHandbookSettings: {
                  employeeCountries: mockCountries,
                  selectedCountries: mockSelectedCountries,
                  totalHandbookList: mockHandbookList,
                },
              },
            },
          ),
        )
      })
    })
  })
  describe('test', () => {
    const history = createMemoryHistory()
    beforeEach(() => {
      render(
        <Router history={history}>
          <EmployeeHandbookSettings />
        </Router>,
        {
          preloadedState: {
            employeeHandbookSettings: {
              employeeHandbooks: mockHandbookList,
              listSize: 43,
            },
          },
        },
      )
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
              backButtonHandler={backButtonHandler}
            />,
            {
              preloadedState: {
                employeeHandbookSettings: {
                  employeeCountries: mockCountries,
                  totalHandbookList: mockHandbookList,
                },
              },
            },
          ),
        )
        waitFor(() => {
          const addPageBackButton = screen.getByRole('button', {
            name: 'Back',
          })
          userEvent.click(addPageBackButton)
          expect(addPageBackButton).toBeInTheDocument()
        })
      })
    })
  })
})
