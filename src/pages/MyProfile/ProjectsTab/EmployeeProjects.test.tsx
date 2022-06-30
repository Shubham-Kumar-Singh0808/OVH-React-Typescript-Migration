import '@testing-library/jest-dom'
import React from 'react'
import EmployeeProjects from './EmployeeProjects'
import { render, screen } from '../../../test/testUtils'

describe('Employee Projects Testing', () => {
  render(<EmployeeProjects />)
  test('should render the "Project Report" header', () => {
    const pageTitle = screen.getByRole('heading', { name: 'Project Report' })
    expect(pageTitle).toBeTruthy()
  })
})
