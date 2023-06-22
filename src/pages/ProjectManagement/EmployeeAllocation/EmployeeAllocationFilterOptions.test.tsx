import '@testing-library/jest-dom'

import React from 'react'
import EmployeeAllocationFilterOptions from './EmployeeAllocationFilterOptions'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockSetSelect = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeAllocationFilterOptions
      Select={'Custom'}
      setSelect={mockSetSelect}
    />
  </div>
)
describe('Employee Allocation Filter Options Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should render select date filter', () => {
    const selectDate = screen.findByTestId('form-select1')
    expect(selectDate).toBeTruthy()
  })
  test('should render Employee Billing Status filter', () => {
    const billingStatus = screen.findByTestId('form-select2')
    expect(billingStatus).toBeTruthy()
  })
  test('should render Allocation Status filter', () => {
    const allocationStatus = screen.findByTestId('form-select3')
    expect(allocationStatus).toBeTruthy()
  })
  test('should render date option select field', () => {
    const dateOptionSelect = screen.findByTestId('date-picker')
    expect(dateOptionSelect).toBeTruthy()
  })
  test('should render tracker select field', () => {
    const trackerSelect = screen.findByTestId('technology-select1')
    expect(trackerSelect).toBeTruthy()
  })
})
