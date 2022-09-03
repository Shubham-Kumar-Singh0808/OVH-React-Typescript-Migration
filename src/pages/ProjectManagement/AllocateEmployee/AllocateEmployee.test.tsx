import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AllocateEmployee from './AllocateEmployee'
import { render, screen, waitFor } from '../../../test/testUtils'
import {
  mockAllocateEmployeeToProject,
  mockEmployeeNames,
  mockProjectNames,
} from '../../../test/data/allocateEmployeeData'
import { dateFormatPerLocale } from '../../../utils/dateFormatUtils'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language
const localeDateFormat = dateFormatPerLocale.filter(
  (lang) => lang.label === deviceLocale,
)
const dateFormat = localeDateFormat[0].format
const billableValue = 'form-select1'
const employeeNames = 'Employee Name'
const allocationValue = 'allocation - Value'

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
  test('should render Allocate button as  disabled initially', () => {
    expect(screen.getByRole('button', { name: 'Allocate' })).toBeInTheDocument()
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
  test('should render Allocate button as disabled and Clear Button not disabled initially', () => {
    render(<AllocateEmployee />)
    expect(screen.getByRole('button', { name: 'Allocate' })).toBeDisabled()
    expect(screen.getByRole('button', { name: ' Clear' })).toBeInTheDocument()
  })
})
