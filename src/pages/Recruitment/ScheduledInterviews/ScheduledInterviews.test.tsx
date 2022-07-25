import '@testing-library/jest-dom'

import React from 'react'
import ScheduledInterviews from './ScheduledInterviews'
import { render, screen } from '../../../test/testUtils'

describe('Scheduled Interviews Component Testing', () => {
  test('should render scheduled interviews component with out crashing', () => {
    render(<ScheduledInterviews />)
    expect(screen.getByText('Scheduled Interviews')).toBeInTheDocument()
  })
})
