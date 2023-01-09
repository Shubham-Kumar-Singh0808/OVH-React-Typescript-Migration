import '@testing-library/jest-dom'

import React from 'react'
import ReviewListFilterOptions from './ReviewListFilterOptions'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ReviewListFilterOptions
      setFilterByDepartment={jest.fn()}
      setFilterByDesignation={jest.fn()}
      setIsTableView={jest.fn()}
      initialReviewList={{
        appraisalFormStatus: 'COMPLETED',
        cycleId: 3,
        departmentName: 'Administrative',
        designationName: '',
        empStatus: 'Active',
        employeeID: '1978',
        endIndex: 20,
        ratings: [],
        role: '',
        searchString: '',
        startIndex: 0,
        toDate: '',
        fromDate: '',
      }}
    />
  </div>
)

const configurationsInput = 'select-configurations'
const deptNameInput = 'dept-name'
const designationInput = 'designation-name'
const statusInput = 'select-status'
const ratingsInput = 'ratings'
const empStatusInput = 'emp-status'
const viewButtonElement = 'view-button'
const clearButtonElement = 'clear-button'
describe('Ticket Approvals Filter Options Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should render cycle status filter', () => {
    const cycleStatus = screen.findByTestId(configurationsInput)
    expect(cycleStatus).toBeTruthy()
  })
  test('should render department status filter', () => {
    const department = screen.findByTestId(deptNameInput)
    expect(department).toBeTruthy()
  })
  test('should render designation name select filter', () => {
    const designation = screen.findByTestId(designationInput)
    expect(designation).toBeTruthy()
  })
  test('should render status select field', () => {
    const status = screen.findByTestId(statusInput)
    expect(status).toBeTruthy()
  })
  test('should render ratingsInput select field', () => {
    const ratingsInp = screen.findByTestId(ratingsInput)
    expect(ratingsInp).toBeTruthy()
  })
  test('should render empStatus Input', () => {
    const employeeStatus = screen.findByTestId(empStatusInput)
    expect(employeeStatus).toBeTruthy()
  })
  test('should render view button', () => {
    const viewBtn = screen.findByTestId(viewButtonElement)
    expect(viewBtn).toBeTruthy()
  })
  test('should render clear button', () => {
    const clearBtn = screen.findByTestId(clearButtonElement)
    expect(clearBtn).toBeTruthy()
  })
})
