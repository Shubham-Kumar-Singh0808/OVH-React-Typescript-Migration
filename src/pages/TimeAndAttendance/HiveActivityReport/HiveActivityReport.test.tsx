import '@testing-library/jest-dom'
import React from 'react'
import HiveActivityReport from './HiveActivityReport'
import { render, screen } from '../../../test/testUtils'

describe('Hive Activity Report Component Testing', () => {
  test('should render hive activity report component with out crashing', () => {
    render(<HiveActivityReport />)
    expect(screen.getByText('Hive Activity Report')).toBeInTheDocument()
  })
})
