import '@testing-library/jest-dom'
import React from 'react'
import EmployeeView from './EmployeeView'
import { render, screen } from '../../../test/testUtils'

describe('EmployeeView Component Testing', () => {
  test('should render EmployeeView component with out crashing', () => {
    render(<EmployeeView />)

    expect(screen.getByText('Employee View')).toBeInTheDocument()
  })
})
