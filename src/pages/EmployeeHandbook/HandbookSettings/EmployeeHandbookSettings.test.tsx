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
} from '../../../test/data/handbookTotalListData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const mockEditButtonHandler = jest.fn()
const backButtonHandler = jest.fn()
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
        backButtonHandler={backButtonHandler}
        handbookId={0}
        isEditHandbook={false}
      />,
      {
        preloadedState: {
          employeeHandbookSettings: {
            employeeCountries: mockCountries,
            selectedCountries: mockCountries,
            totalHandbookList: mockHandbookList,
          },
        },
      },
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
    beforeEach(() => {
      render(
        <EmployeeHandbookTable
          setCurrentPage={mockSetCurrentPage}
          setPageSize={mockSetPageSize}
          currentPage={1}
          pageSize={20}
          paginationRange={[1, 2, 3]}
          editHandbookButtonHandler={mockEditButtonHandler}
        />,
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
    it('should redirect to Edit Page Component', async () => {
      const editButton = screen.getByTestId('handbook-edit-btn0')
      userEvent.click(editButton)
      await waitFor(async () => {
        expect(
          render(
            <EditHandbook
              headerTitle="Edit Page"
              confirmButtonText="Update"
              backButtonHandler={backButtonHandler}
              isEditHandbook={true}
              handbookId={1}
            />,
            {
              preloadedState: {
                employeeHandbookSettings: {
                  employeeCountries: mockCountries,
                  selectedCountries: mockCountries,
                  totalHandbookList: mockHandbookList,
                },
              },
            },
          ),
        )
        await waitFor(() => {
          const editPageBackButton = screen.getByRole('button', {
            name: 'Back',
          })
          userEvent.click(editPageBackButton)
        })
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
    test('should able to redirect to Employee Handbook page', () => {
      const btnElement = screen.getByRole('button', { name: 'Back' })
      userEvent.click(btnElement)
      expect(history.location.pathname).toBe('/EmployeeHandbook')
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
          const addPageBackButton = screen.getByRole('button', { name: 'Back' })
          userEvent.click(addPageBackButton)
          expect(history.location.pathname).toBe('/handbooksettings')
        })
      })
    })
  })
})
