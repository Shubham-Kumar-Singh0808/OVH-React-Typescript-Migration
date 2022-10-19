import React from 'react'
import '@testing-library/jest-dom'
import EmployeeDesignationReport from './EmployeeDesignationReport'
import { render, screen, waitFor } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeDesignationReport />
  </div>
)

describe('Employee Designation Report Component Testing', () => {
  test('should render Employee Designation Report component without crashing', async () => {
    render(toRender)

    await waitFor(() => {
      expect(
        screen.getByText('Employee Designation List Report'),
      ).toBeInTheDocument()
    })
  })
})
