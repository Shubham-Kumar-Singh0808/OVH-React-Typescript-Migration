import '@testing-library/jest-dom'
import React from 'react'
import EmployeePipList from './EmployeePipList'
import { render, screen } from '../../../../test/testUtils'

describe('PIP List  Component Testing', () => {
  test('should render PIP List component with out crashing', () => {
    render(<EmployeePipList />)

    expect(screen.getByText('PIP List')).toBeInTheDocument()
  })
})
