import '@testing-library/jest-dom'
import React from 'react'
import TicketDetails from './TicketDetails'
import { render, screen } from '../../../test/testUtils'

describe('Ticket Report Component Testing', () => {
  test('should render Ticket Report component with out crashing', () => {
    render(
      <TicketDetails
        setToggle={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(screen.getByText('Ticket Details')).toBeInTheDocument()
  })
})
