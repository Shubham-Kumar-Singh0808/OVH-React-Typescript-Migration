import '@testing-library/jest-dom'
import React from 'react'
import AddTrackerList from './AddTrackerList'
import { render, screen } from '../../../../test/testUtils'

describe('Certificate Type Component Testing', () => {
  test('should render addTracker List component with out crashing', () => {
    render(<AddTrackerList />)
    expect(screen.getByText('Name:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
})
