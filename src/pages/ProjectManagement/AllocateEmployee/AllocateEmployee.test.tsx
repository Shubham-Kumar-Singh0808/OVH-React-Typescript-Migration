import '@testing-library/jest-dom'
import React from 'react'
import AllocateEmployeecToProject from './AllocateEmployee'
import { render, screen } from '../../../test/testUtils'

describe('Project Management Allocate Employee Component Testing', () => {
  render(<AllocateEmployee />)
})
test('should render from date picker', () => {
  const allocationDatePicker = screen.findByTestId(
    'allocateEmployeeAllocationDate',
  )
  expect(allocationDatePicker).toBeTruthy()
})
test('should render to date picker', () => {
  const EndDatePicker = screen.findByTestId('allocateEmployeeEndDate')
  expect(EndDatePicker).toBeTruthy()
})
