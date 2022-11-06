import '@testing-library/jest-dom'
import React from 'react'
import EmployeeLeaveSettings from './EmployeeLeaveSettings'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeLeaveSettings />,
  </div>
)
describe('Leave Settings Component Testing', () => {
  test('should render Leave Settings component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('Leave Settings')).toBeInTheDocument()
  })
})
