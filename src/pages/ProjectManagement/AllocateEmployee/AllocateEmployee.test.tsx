import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AllocateEmployee from './AllocateEmployee'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import {
  mockAllocateEmployeeToProject,
  mockEmployeeNames,
  mockProjectNames,
} from '../../../test/data/allocateEmployeeData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const billableValue = 'form-select1'
const employeeNames = 'Employee Name'
const allocationValue = 'allocation-value'
const allocateButton = 'save-btn'
const clearButton = 'clear-btn'

describe('Allocate Employee without data', () => {
  beforeEach(() => {
    render(<AllocateEmployee />)
  })

  test('should be able to render Allocate Employee without data', () => {
    screen.debug()
  })

  test('should be able to render Allocate Employee Title', () => {
    expect(screen.getByText('Employee Allocation')).toBeInTheDocument()
  })

  test('should render to date picker', () => {
    const EndDatePicker = screen.findByTestId('allocateEmployeeEndDate')
    expect(EndDatePicker).toBeTruthy()
  })
  test('should render Allocate button as disabled and Clear Button not disabled initially', () => {
    expect(screen.getByTestId(allocateButton)).toBeDisabled()
    expect(screen.getByTestId(clearButton)).toBeEnabled()
  })
  test('should select billable dropdown value', () => {
    const BillableSelector = screen.getByTestId('form-select1')
    userEvent.selectOptions(BillableSelector, ['Yes'])
    expect(BillableSelector).toHaveValue('true')
  })
  test('should render Template rich text editor', () => {
    const templateComment = screen.findByTestId('ckEditor-component')
    expect(templateComment).toBeTruthy()
  })
  test('should render labels', () => {
    expect(screen.getByText('Employee:')).toBeInTheDocument()
    expect(screen.getByText('Project Name:')).toBeInTheDocument()
    expect(screen.getByText('Billable:')).toBeInTheDocument()
    expect(screen.getByText('Allocation:')).toBeInTheDocument()
    expect(screen.getByText('Allocation Date:')).toBeInTheDocument()
    expect(screen.getByText('End Date:')).toBeInTheDocument()
    expect(screen.getByText('Comments:')).toBeInTheDocument()
  })
})

describe('should render allocate Employee Component with data', () => {
  beforeEach(() => {
    render(<AllocateEmployee />, {
      preloadedState: {
        allocateEmployee: {
          getAllEmployees: mockEmployeeNames,
          getAllProjects: mockProjectNames,
          allocateEmployee: mockAllocateEmployeeToProject,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })
  test('should render on Dates AllocateEmployee', async () => {
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '30 Aug, 2022' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '07 Sep, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('08/30/2022')
    expect(datePickers[1]).toHaveValue('09/07/2022')
    userEvent.click(screen.getByTestId(clearButton))
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')
  })

  test('should render on every input of AllocateEmployee', async () => {
    const employeeNameInput = screen.getByPlaceholderText(employeeNames)
    userEvent.type(employeeNameInput, 'Sunny')
    expect(employeeNameInput).toHaveValue('Sunny')

    const projectNameInput = screen.getByPlaceholderText('Project Name')
    userEvent.type(projectNameInput, 'ovh')
    expect(projectNameInput).toHaveValue('ovh')

    const allocationValueInput = screen.getByTestId(allocationValue)
    userEvent.type(allocationValueInput, '100')
    expect(allocationValueInput).toHaveValue('100')

    userEvent.selectOptions(screen.getByTestId(billableValue), 'Yes')
    userEvent.click(screen.getByTestId('clear-btn'))
    await waitFor(() => {
      expect(employeeNameInput).toHaveValue('')
      expect(projectNameInput).toHaveValue('')
      expect(allocationValueInput).toHaveValue('')
    })
  })
  test('should enabled on every input of AllocateEmployee', () => {
    const employeeNameInput = screen.getByPlaceholderText(employeeNames)
    userEvent.type(employeeNameInput, 'Sunny')

    const projectNameInput = screen.getByPlaceholderText('Project Name')
    userEvent.type(projectNameInput, 'ovh')

    const allocationValueInput = screen.getByTestId(allocationValue)
    userEvent.type(allocationValueInput, '100')

    userEvent.selectOptions(screen.getByTestId(billableValue), 'Yes')
    userEvent.click(screen.getByTestId(allocateButton))
    expect(screen.getByTestId(allocateButton)).not.toBeEnabled()
    expect(employeeNameInput).toHaveValue('')
    expect(projectNameInput).toHaveValue('ovh')
    expect(allocationValueInput).toHaveValue('100')

    userEvent.click(screen.getByTestId(clearButton))
    expect(screen.getByTestId(clearButton)).toBeEnabled()
    expect(employeeNameInput).toHaveValue('')
    expect(projectNameInput).toHaveValue('')
    expect(allocationValueInput).toHaveValue('')
  })
  test('should be able to click Add button element', () => {
    const addBtn = screen.getByRole('button', { name: 'Allocate' })
    userEvent.click(addBtn)
    expect(addBtn).toBeInTheDocument()
  })
})

afterEach(cleanup)
test('pass comments to test input value', () => {
  render(
    <CKEditor
      initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
    />,
  )
})
