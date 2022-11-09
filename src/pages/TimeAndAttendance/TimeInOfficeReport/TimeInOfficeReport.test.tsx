import '@testing-library/jest-dom'
import React from 'react'
import TimeInOfficeReport from './TimeInOfficeReport'
import { render, screen } from '../../../test/testUtils'

describe('Time In Office Report Component Testing', () => {
  test('should render Time In Office Report Parent component without crashing', () => {
    render(
      <div>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <div id="root"></div>
        <TimeInOfficeReport />
      </div>,
    )

    expect(screen.getByText('Time in Office Report')).toBeInTheDocument()
  })
})
