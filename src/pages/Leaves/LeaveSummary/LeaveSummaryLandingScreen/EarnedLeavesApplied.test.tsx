import '@testing-library/jest-dom'
import React from 'react'
import EarnedLeavesApplied from './EarnedLeavesApplied'
import { render, screen } from '../../../../test/testUtils'

describe('Leave Summary Component Testing', () => {
  test('should render Leave Summary Component without crashing', () => {
    render(<EarnedLeavesApplied />)
    expect(screen.getByText('Casual')).toBeInTheDocument()
    expect(screen.getByText('PAID')).toBeInTheDocument()
  })
})
