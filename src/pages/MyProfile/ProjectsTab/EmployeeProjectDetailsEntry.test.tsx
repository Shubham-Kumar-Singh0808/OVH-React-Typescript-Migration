import React from 'react'
import { render, screen } from '@testing-library/react'
import EmployeeProjectDetailsEntry from './EmployeeProjectDetailsEntry'
import { mockEmployeeProjectsDetail } from '../../../test/data/employeeProjectsData'
import { localeDateFormat } from '../../../utils/dateFormatUtils'

describe('Employee Projects Details', () => {
  beforeEach(() => {
    render(
      <EmployeeProjectDetailsEntry
        id={88}
        projectDetails={mockEmployeeProjectsDetail[0]}
      />,
    )
  })
  test('should render the correct project name', () => {
    const tableEntry = screen.getByRole('cell', {
      name:
        mockEmployeeProjectsDetail[0].empFirstName +
        ' ' +
        mockEmployeeProjectsDetail[0].empLastName,
    })
    expect(tableEntry).toBeTruthy()
  })
  test('should render the correct project designation', () => {
    const tableEntry = screen.getByRole('cell', {
      name: mockEmployeeProjectsDetail[0].desigination,
    })
    expect(tableEntry).toBeTruthy()
  })
  test('should render the correct project allocation', () => {
    const tableEntry = screen.getByRole('cell', {
      name: mockEmployeeProjectsDetail[0].allocation as string,
    })
    expect(tableEntry).toBeTruthy()
  })
  test('should render the correct project enddate', () => {
    const tableEntry = screen.getByRole('cell', {
      name: localeDateFormat(mockEmployeeProjectsDetail[0].endDate),
    })
    expect(tableEntry).toBeTruthy()
  })
  test('should render the correct project billable status', () => {
    let value: string
    if (mockEmployeeProjectsDetail[0].billable) value = 'Yes'
    else value = 'No'
    const tableEntry = screen.getByRole('cell', { name: value })
    expect(tableEntry).toBeTruthy()
  })
  test('should render the correct project current status', () => {
    let value: string
    if (mockEmployeeProjectsDetail[0].isAllocated) value = 'Allocated'
    else value = 'Not Allocated'
    const tableEntry = screen.getByRole('cell', { name: value })
    expect(tableEntry).toBeTruthy()
  })
})
