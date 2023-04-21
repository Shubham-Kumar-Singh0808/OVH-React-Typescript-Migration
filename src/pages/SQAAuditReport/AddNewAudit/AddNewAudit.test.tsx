import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddNewAudit from './AddNewAudit'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import {
  mockEmployeeNames,
  mockProjectNames,
} from '../../../test/data/allocateEmployeeData'

const backButton = 'newAudit-back-btn'
const auditTypeInputElement = 'auditType-input'
const projectTypeDevelopment = 'projType-dev'
const projectTypeSupport = 'projType-support'
const projectNameInputElement = 'projectName-input'
const employeeNames = 'Employees Name'

describe('render all inputs without crashing', () => {
  beforeEach(() => {
    render(<AddNewAudit />, {
      preloadedState: {
        allocateEmployee: {
          getAllEmployees: mockEmployeeNames,
          getAllProjects: mockProjectNames,
        },
      },
    })
  })
  test('should render Add Audit Header Text', () => {
    expect(screen.getByText('Add New Audit')).toBeInTheDocument()
  })
  test('should render Save and Submit Buttons', () => {
    const saveBtnElement = screen.getByRole('button', { name: 'Save' })
    expect(saveBtnElement).toBeTruthy()
    const submitBtnElement = screen.getByRole('button', { name: 'Submit' })
    expect(submitBtnElement).toBeTruthy()
  })
  test('should render back button', () => {
    expect(screen.getByTestId(backButton)).toBeTruthy()
  })
  test('should render auditType Input', () => {
    expect(screen.getByTestId(auditTypeInputElement)).toBeTruthy()
  })
  test('should render development radio button Input', () => {
    expect(screen.getByTestId(projectTypeDevelopment)).toBeTruthy()
  })
  test('should render support radio button Input', () => {
    expect(screen.getByTestId(projectTypeSupport)).toBeTruthy()
  })
  test('should render projectName Input', () => {
    const projectTypeRbtn = screen.getByTestId(projectTypeSupport)
    fireEvent.click(projectTypeRbtn)
    expect(projectTypeRbtn).toBeChecked()
    expect(screen.getByTestId(projectNameInputElement)).toBeTruthy()
  })
  test('should render auditdate', async () => {
    const audiDatePickerEle = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(audiDatePickerEle[0])

    await waitFor(() =>
      fireEvent.change(audiDatePickerEle[0], {
        target: { value: '30 Aug, 2022' },
      }),
    )
  })
  test('should render projectName autocomplete on select projectType Development', () => {
    const projectTypeRbtn = screen.getByTestId(projectTypeDevelopment)
    userEvent.click(projectTypeRbtn)
    expect(projectTypeRbtn).toBeChecked()
    const employeeNameInput = screen.getAllByPlaceholderText(employeeNames)
    userEvent.type(employeeNameInput[0], 'Sunny')

    const projectNameInput = screen.getByPlaceholderText('Project Name')
    userEvent.type(projectNameInput, 'ovh')
  })
})
