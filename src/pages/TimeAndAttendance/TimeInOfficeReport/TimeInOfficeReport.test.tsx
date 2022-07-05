import '@testing-library/jest-dom'
import React from 'react'
import TimeInOfficeReport from './TimeInOfficeReport'
import { render, screen } from '../../../test/testUtils'

describe('Time In Office Report Component Testing', () => {
  test('should render Time In Office Report Parent component without crashing', () => {
    render(<TimeInOfficeReport />)

    expect(screen.getByText('Time in Office Report')).toBeInTheDocument()
  })
})
