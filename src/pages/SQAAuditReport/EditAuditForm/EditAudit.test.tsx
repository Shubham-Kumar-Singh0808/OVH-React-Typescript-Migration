import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditAudit from './EditAudit'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import {
  mockEmployeeNames,
  mockProjectNames,
} from '../../../test/data/allocateEmployeeData'

const backButton = 'editAudit-back-btn'
const auditTypeInputElement = 'editAuditType-input'
const projectTypeDevelopment = 'editProjType-dev'
const projectTypeSupport = 'editProjType-support'
const employeeNames = 'Employees Name'

describe('render all inputs without crashing', () => {
  beforeEach(() => {
    render(<EditAudit />, {
      preloadedState: {
        allocateEmployee: {
          getAllEmployees: mockEmployeeNames,
          getAllProjects: mockProjectNames,
        },
      },
    })
  })
  test('should render Edit Audit Header Text', () => {
    expect(screen.getByText('Edit Audit')).toBeInTheDocument()
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
  })
})
