import '@testing-library/jest-dom'
import React from 'react'
import EmployeeAllocation from './EmployeeAllocation'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeAllocation />
  </div>
)

describe('Employee Allocation Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should render Employee Allocation component with out crashing', () => {
    expect(screen.getByText('Employee Allocation Report')).toBeInTheDocument()
  })
})
