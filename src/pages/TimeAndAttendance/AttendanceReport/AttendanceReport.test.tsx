import '@testing-library/jest-dom'
import React from 'react'
import AttendanceReport from './AttendanceReport'
import { render, screen } from '../../../test/testUtils'

describe('Attendance Report Component Testing', () => {
  test('should render attendance report component with out crashing', () => {
    render(<AttendanceReport />)
    expect(screen.getByText('Attendance Report')).toBeInTheDocument()
  })
})
