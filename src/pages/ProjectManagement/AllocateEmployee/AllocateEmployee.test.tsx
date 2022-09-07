import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AllocateEmployee from './AllocateEmployee'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import {
  mockAllocateEmployeeToProject,
  mockEmployeeNames,
  mockProjectNames,
} from '../../../test/data/allocateEmployeeData'
// import { dateFormatPerLocale } from '../../../utils/dateFormatUtils'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

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
  test('should render clear button', () => {
    const clearButton = screen.getByTestId('clear-btn')
    expect(clearButton).toBeEnabled()
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
})

describe('should render allocate Employee Component with data', () => {
  beforeEach(() => {
    render(<AllocateEmployee />, {
      preloadedState: {
        allocateEmployee: {
          getAllEmployees: mockEmployeeNames,
          getAllProjects: mockProjectNames,
          allocateEmployee: mockAllocateEmployeeToProject,
        },
      },
    })
  })
  test('should render dates on selection', () => {
    const dateInput = screen.getAllByPlaceholderText('dd/mm/yy')
    userEvent.type(
      dateInput[0],
      new Date('10/02/20').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
    userEvent.type(
      dateInput[1],
      new Date('12/02/20').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
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
  test('should enabled on every input of AllocateEmployee', async () => {
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
    userEvent.click(screen.getByTestId(clearButton))
    await waitFor(() => {
      expect(employeeNameInput).toBeEnabled()
      expect(projectNameInput).toBeEnabled()
      expect(allocationValueInput).toBeEnabled()
    })
  })

  afterEach(cleanup)
  test('should render labels', () => {
    expect(screen.getByText('Employee:')).toBeInTheDocument()
    expect(screen.getByText('Project Name:')).toBeInTheDocument()
    expect(screen.getByText('Billable:')).toBeInTheDocument()
    expect(screen.getByText('Allocation:')).toBeInTheDocument()
    expect(screen.getByText('Allocation Date:')).toBeInTheDocument()
    expect(screen.getByText('End Date:')).toBeInTheDocument()
    expect(screen.getByText('Comments:')).toBeInTheDocument()
  })

  test('should enabled allocate button when input is not empty', () => {
    expect(screen.getByTestId(clearButton)).not.toBeDisabled()
    expect(screen.getByTestId(allocateButton)).toBeDisabled()
  })
  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
      />,
    )
  })
})
