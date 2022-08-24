import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import EditHandbook from './EditHandbook'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import {
  pageTitle,
  pageName,
  displayOrder,
  cB1,
  cB2,
  cB3,
  cB4,
  cB5,
  updateButton,
  description,
  cB6,
} from '../../../../test/constants'
import {
  mockCountries,
  mockHandbookList,
} from '../../../../test/data/handbookTotalListData'
import { mockEmployeeHandbookList } from '../../../../test/data/employeeHandbookSettingsData'

const mockBackButtonHandler = jest.fn()
const cbAllCountries = 'ch-All-countries'

describe('Edit Page Component Testing', () => {
  describe('edit page with id=0', () => {
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
  describe('Without data', () => {
    beforeEach(() => {
      render(
        <EditHandbook
          headerTitle="Edit Page"
          confirmButtonText="Update"
          backButtonHandler={jest.fn()}
          handbookId={1}
          isEditHandbook={true}
        />,
      )
    })
    test('should render "Edit Page" Heading', () => {
      const editPage = screen.getByRole('heading', {
        name: 'Edit Page',
      })
      expect(editPage).toBeTruthy()
    })
    test('should render title input', () => {
      const titleInput = screen.findByTestId(pageTitle)
      expect(titleInput).toBeTruthy()
    })
    test('should render PageName input', () => {
      const pageNameInput = screen.findByTestId(pageName)
      expect(pageNameInput).toBeTruthy()
    })
    test('should render display order input', () => {
      const displayOrderInput = screen.findByTestId(displayOrder)
      expect(displayOrderInput).toBeTruthy()
    })
    test('should render All countries checkbox', () => {
      const allCountries = screen.findByTestId(cbAllCountries)
      expect(allCountries).toBeTruthy()
    })
    test('should render Australia checkbox', () => {
      const cbAustralia = screen.findByTestId(cB1)
      expect(cbAustralia).toBeTruthy()
    })
    test('should render India country checkbox', () => {
      const cbIndia = screen.findByTestId(cB2)
      expect(cbIndia).toBeTruthy()
    })
    test('should render USA country checkbox', () => {
      const cbUsa = screen.findByTestId(cB3)
      expect(cbUsa).toBeTruthy()
    })
    test('should render Canada country checkbox', () => {
      const allCountries = screen.findByTestId(cB4)
      expect(allCountries).toBeTruthy()
    })
    test('should render Philippines country checkbox', () => {
      const cbPH = screen.findByTestId(cB5)
      expect(cbPH).toBeTruthy()
    })
    test('should render Brazil country checkbox', () => {
      const cbBzl = screen.findByTestId(cB6)
      expect(cbBzl).toBeTruthy()
    })
    test('should have update button enabled initially', () => {
      const updateBtn = screen.getByTestId(updateButton)
      expect(updateBtn).toBeTruthy()
    })
    test('should render back button', () => {
      const backButton = screen.getByTestId('back-btn')
      expect(backButton).toBeTruthy()
    })
  })
  describe('Edit Page With Countries', () => {
    beforeEach(() => {
      render(
        <EditHandbook
          headerTitle="Edit Page"
          confirmButtonText="Update"
          backButtonHandler={jest.fn()}
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
      )
    })
    test('pass description to test input value', () => {
      render(
        <CKEditor
          initData={
            process.env.JEST_WORKER_ID !== undefined && (
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McFlintlock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the uncountable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of de Finials
                Bonjour et Majorem (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular
              </p>
            )
          }
        />,
      )
    })
    test('should render countries checkbox ', async () => {
      fireEvent.click(screen.getByTestId(cB1))
      fireEvent.click(screen.getByTestId(cB2))
      fireEvent.click(screen.getByTestId(cB3))
      fireEvent.click(screen.getByTestId(cB4))
      fireEvent.click(screen.getByTestId(cB5))
      fireEvent.click(screen.getByTestId(cB6))
      await waitFor(() => {
        expect(screen.getByText('CANADA')).toBeInTheDocument()
        expect(screen.getByText('INDIA')).toBeInTheDocument()
        expect(screen.getByText('AUSTRALIA')).toBeInTheDocument()
        expect(screen.getByText('PHILIPPINES')).toBeInTheDocument()
        expect(screen.getByText('USA')).toBeInTheDocument()
        expect(screen.getByText('BRAZIL')).toBeInTheDocument()
      })
    })
    test('Checkbox changes value', async () => {
      const allCountries = screen.getByTestId(cbAllCountries)
      fireEvent.click(allCountries)
      expect(allCountries).toBeChecked()
      await waitFor(() => {
        fireEvent.click(allCountries)
        expect(allCountries).not.toBeChecked()
      })
    })

    test('should disable update button if inputs are empty ', async () => {
      const titleInput = screen.getByTestId(pageTitle)
      userEvent.type(titleInput, '')
      expect(titleInput).toHaveValue('')
      const pageNameInput = screen.getByTestId(pageName)
      expect(pageNameInput).toHaveValue('testttt')
      const displayOrderInput = screen.getByTestId(displayOrder)
      userEvent.type(displayOrderInput, '79')
      expect(displayOrderInput).toHaveValue('79')
      const updateBtn = screen.getByTestId(updateButton)
      await waitFor(() => {
        expect(updateBtn).toBeDisabled()
      })
    })
  })
  describe('render edit Page with handbookID=3 details', () => {
    const history = createMemoryHistory()
    beforeEach(() => {
      render(
        <Router history={history}>
          <EditHandbook
            headerTitle="Edit Page"
            confirmButtonText="Update"
            backButtonHandler={jest.fn()}
            isEditHandbook={true}
            handbookId={3}
          />
        </Router>,
        {
          preloadedState: {
            employeeHandbookSettings: {
              employeeCountries: mockCountries,
              selectedCountries: mockCountries,
              totalHandbookList: mockEmployeeHandbookList,
            },
          },
        },
      )
    })
    test('should render selected id record details upon clicking edit button ', async () => {
      const titleInput = screen.getByTestId(pageTitle)
      expect(titleInput).toHaveValue('Employment Types and Compensation Policy')
      const pageNameInput = screen.getByTestId(pageName)
      expect(pageNameInput).toHaveValue('EmployeeCategoriesCodyu')
      const displayOrderInput = screen.getByTestId(displayOrder)
      expect(displayOrderInput).toHaveValue('53')
      const cb1 = screen.getByTestId(cB1)
      const cb2 = screen.getByTestId(cB2)
      const cb5 = screen.getByTestId(cB5)
      expect(cb1).toBeChecked()
      expect(cb2).toBeChecked()
      expect(cb5).toBeChecked()
      const desc = screen.findByTestId(description)
      expect(desc).toBeTruthy()
      const updateBtn = screen.getByTestId('btn-update')
      await waitFor(() => {
        expect(updateBtn).toBeEnabled()
      })
    })
    test('update the handbook details and redirect to handbookSettings page', async () => {
      const btnUpdate = screen.getByTestId(updateButton)
      fireEvent.click(btnUpdate)
      await waitFor(() => {
        expect(history.location.pathname).toBeTruthy()
      })
    })
  })
  describe('render edit Page details with ID=6', () => {
    beforeEach(() => {
      render(
        <EditHandbook
          headerTitle="Edit Page"
          confirmButtonText="Update"
          backButtonHandler={mockBackButtonHandler}
          handbookId={6}
          isEditHandbook={true}
        />,
        {
          preloadedState: {
            employeeHandbookSettings: {
              employeeCountries: mockCountries,
              selectedCountries: mockCountries,
              totalHandbookList: mockEmployeeHandbookList,
            },
          },
        },
      )
    })
    test('should display error message, when user enters already exist value in the display order input field', async () => {
      const displayOrderInput = screen.getByTestId(displayOrder)
      expect(displayOrderInput).toHaveValue('6')
      userEvent.clear(displayOrderInput)
      expect(displayOrderInput).toHaveValue('0')
      userEvent.type(displayOrderInput, '5')
      expect(displayOrderInput).toHaveValue('5')
      await waitFor(() => {
        expect(
          screen.getByText('Display order Already Exist'),
        ).toBeInTheDocument()
      })
    })
    test('should able to click back button', () => {
      const backBtnElement = screen.getByRole('button', { name: 'Back' })
      userEvent.click(backBtnElement)
      expect(mockBackButtonHandler).toBeCalledTimes(1)
    })
  })

  describe('render edit Page with handbook ID=2 details', () => {
    const history = createMemoryHistory()
    beforeEach(() => {
      render(
        <Router history={history}>
          <EditHandbook
            headerTitle="Edit Page"
            confirmButtonText="Update"
            backButtonHandler={jest.fn()}
            handbookId={2}
            isEditHandbook={true}
          />
        </Router>,
        {
          preloadedState: {
            employeeHandbookSettings: {
              employeeCountries: mockCountries,
              selectedCountries: [0],
              totalHandbookList: mockEmployeeHandbookList,
            },
          },
        },
      )
    })
    test('should Uncheck All countries checkbox', async () => {
      const handCountries = screen.getByTestId(cbAllCountries)
      fireEvent.click(handCountries)
      expect(handCountries).toBeChecked()
      fireEvent.click(handCountries)
      await waitFor(() => {
        expect(handCountries).not.toBeChecked()
      })
    })
    test('should able to update and redirect handbookSettings page', async () => {
      const updateBtnElement = screen.getByRole('button', { name: 'Update' })
      userEvent.click(updateBtnElement)
      await waitFor(() => {
        expect(history.location.pathname).toBeTruthy()
      })
    })
  })
})
