import '@testing-library/jest-dom'
import React from 'react'
import EmployeeAssets from './EmployeeAssets'
import { render, screen } from '../../../test/testUtils'

describe('Employee Assets Component Testing', () => {
  test('should render Employee Assets tab component with out crashing', () => {
    render(<EmployeeAssets />)

    expect(screen.getByText('My Assets')).toBeInTheDocument()
  })
})
