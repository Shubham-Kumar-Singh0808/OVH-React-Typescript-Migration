import '@testing-library/jest-dom'
import React from 'react'
import LeaveReport from './LeaveReport'
import { render, screen } from '../../../test/testUtils'

describe('Leave Report Component Testing', () => {
  test('should render Leave Report component with out crashing', () => {
    render(<LeaveReport />)
    expect(screen.getByText('Leave Reports')).toBeInTheDocument()
  })
})
