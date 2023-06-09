import '@testing-library/jest-dom'
import React from 'react'
import MileStoneHistory from './MileStoneHistory'
import { render, screen } from '../../../../../../test/testUtils'

describe('MileStoneHistory Component Testing', () => {
  test('should render MileStoneHistory component with out crashing', () => {
    render(<MileStoneHistory />)
    expect(screen.getByText('Milestone History Details')).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('back-btn')
    expect(backButtonElement).toBeInTheDocument()
    expect(backButtonElement).toHaveValue('')
  })
})
