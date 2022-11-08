import '@testing-library/jest-dom'
import React from 'react'
import EmployeeList from './EmployeeList'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeList />
  </div>
)

describe('Employee List Component Testing', () => {
  test('should render Personal info tab component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Employee Directory')).toBeInTheDocument()
  })
})
