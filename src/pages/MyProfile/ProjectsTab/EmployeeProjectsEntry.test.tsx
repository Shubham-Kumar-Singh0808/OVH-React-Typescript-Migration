import '@testing-library/jest-dom'
import React from 'react'
import EmployeeProjectsEntry from './EmployeeProjectsEntry'
import { render, screen } from '../../../test/testUtils'
import { mockEmployeeProjectEntry } from '../../../test/data/employeeProjectsData'

const getProjectHealth = () => {
  return screen.queryByTestId('project-health')
}

describe('Employee Projects Testing', () => {
  beforeEach(() => {
    render(<EmployeeProjectsEntry id={1} project={mockEmployeeProjectEntry} />)
  })
  test('should show the correct project name', () => {
    const projectName = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.projectName,
    })
    expect(projectName).toBeTruthy()
  })
  test('should show the correct project client name', () => {
    const projectClient = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.client,
    })
    expect(projectClient).toBeTruthy()
  })
  test('should show the correct project manager', () => {
    const projectManagerName = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.managerName,
    })
    expect(projectManagerName).toBeTruthy()
  })
  test('should show the correct project start date', () => {
    const projectStartDate = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.startdate as string,
    })
    expect(projectStartDate).toBeTruthy()
  })
  test('should show the correct project end date', () => {
    const projectEndDate = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.enddate as string,
    })
    expect(projectEndDate).toBeTruthy()
  })
  test('should show the correct project status', () => {
    const projectStatus = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.status,
    })
    expect(projectStatus).toBeTruthy()
  })
})
describe('Project Entry Health Class Testing', () => {
  test('should have the correct health class - green', () => {
    render(<EmployeeProjectsEntry id={1} project={mockEmployeeProjectEntry} />)
    const projectStatus = getProjectHealth()
    expect(projectStatus).toHaveClass(
      'profile-tab-label profile-tab-label-success',
    )
  })
  test('should have the correct health class - orange', () => {
    const projectHealthOrange = mockEmployeeProjectEntry
    projectHealthOrange.health = 'Orange'
    render(<EmployeeProjectsEntry id={1} project={projectHealthOrange} />)
    const projectStatus = getProjectHealth()
    expect(projectStatus).toHaveClass(
      'profile-tab-label profile-tab-label-warning',
    )
  })
  test('should have the correct health class - red', () => {
    const projectHealthRed = mockEmployeeProjectEntry
    projectHealthRed.health = 'Red'
    render(<EmployeeProjectsEntry id={1} project={projectHealthRed} />)
    const projectStatus = getProjectHealth()
    expect(projectStatus).toHaveClass(
      'profile-tab-label profile-tab-label-failed',
    )
  })
  test('should have the correct health class - gray', () => {
    const projectHealthGray = mockEmployeeProjectEntry
    projectHealthGray.health = 'Gray'
    render(<EmployeeProjectsEntry id={1} project={projectHealthGray} />)
    const projectStatus = getProjectHealth()
    expect(projectStatus).toHaveClass(
      'profile-tab-label profile-tab-label-null',
    )
  })
  test('should have the correct health class - null', () => {
    const projectHealthNull = mockEmployeeProjectEntry
    projectHealthNull.health = null
    render(<EmployeeProjectsEntry id={1} project={projectHealthNull} />)
    const projectStatus = getProjectHealth()
    expect(projectStatus).toHaveClass(
      'profile-tab-label profile-tab-label-null',
    )
  })
})
