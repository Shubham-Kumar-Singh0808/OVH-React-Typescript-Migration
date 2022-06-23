import React from 'react'
import { render, screen } from '@testing-library/react'
import EmployeeProjectDetailsEntry from './EmployeeProjectDetailsEntry'
import { mockEmployeeProjectsDetail } from '../../../test/data/employeeProjectsData'

describe('Employee Projects Details', () => {
  beforeEach(() => {
    render(
      <EmployeeProjectDetailsEntry
        id={88}
        projectDetails={mockEmployeeProjectsDetail[0]}
      />,
    )
  })
  test('should render the correct project id', () => {
    const tableEntry = screen.getByRole('cell', { name: '88' })
    expect(tableEntry).toBeTruthy()
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
      name: mockEmployeeProjectsDetail[0].endDate,
    })
    expect(tableEntry).toBeTruthy()
  })
  test('should render the correct project billable status', () => {
    let value: string
    mockEmployeeProjectsDetail[0].billable ? (value = 'Yes') : (value = 'No')
    const tableEntry = screen.getByRole('cell', { name: value })
    expect(tableEntry).toBeTruthy()
  })
  test('should render the correct project current status', () => {
    let value: string
    mockEmployeeProjectsDetail[0].isAllocated
      ? (value = 'Allocated')
      : (value = 'Not Allocated')
    const tableEntry = screen.getByRole('cell', { name: value })
    expect(tableEntry).toBeTruthy()
  })
})
