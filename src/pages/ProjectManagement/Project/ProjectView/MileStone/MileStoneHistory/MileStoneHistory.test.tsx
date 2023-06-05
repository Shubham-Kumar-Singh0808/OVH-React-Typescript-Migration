import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MileStoneHistory from './MileStoneHistory'
import { render, screen } from '../../../../../../test/testUtils'

describe('MileStoneHistory Component Testing', () => {
  test('should render MileStoneHistory component with out crashing', () => {
    render(<MileStoneHistory />)
    expect(screen.getByText('Milestone History Details')).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('back-btn')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(backButtonElement).toHaveValue('')
  })
})
