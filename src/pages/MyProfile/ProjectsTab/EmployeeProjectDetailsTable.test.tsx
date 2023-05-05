import React from 'react'
import '@testing-library/jest-dom'
import EmployeeProjectsDetail from './EmployeeProjectDetailsTable'
import { render, screen } from '../../../test/testUtils'
import { mockEmployeeProjectsDetail } from '../../../test/data/employeeProjectsData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeProjectsDetail projectId={0} />,
  </div>
)

describe('Employee Projects Details', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should render the "Projec Details" table', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the loading spinner when project details are empty', () => {
    expect(screen.getByTestId('project-loader')).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'ID' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Designation' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Allocation' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'End Date' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Billable' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Current Status' }),
    ).toBeTruthy()
  })

  describe('Employee Projects Details with data', () => {
    beforeEach(() => {
      render(toRender)
    })
    test('should not render the loading spinner when project details are not empty', () => {
      expect(screen.findByTestId('project-loader')).toMatchObject({})
    })
  })
})
