import '@testing-library/jest-dom'

import React from 'react'
import EmployeeList from './EmployeeList'
import { render, screen } from '../../../test/testUtils'

describe('Employee List Component Testing', () => {
  test('should render Personal info tab component with out crashing', async () => {
    render(<EmployeeList />)

    expect(screen.getByText('Employee Directory')).toBeInTheDocument()
  })
})
