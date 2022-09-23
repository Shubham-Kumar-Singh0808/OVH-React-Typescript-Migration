import '@testing-library/jest-dom'
import React from 'react'
import CreateNewTicket from './CreateNewTicket'
import { render, screen } from '../../../test/testUtils'

describe('Create new Ticket Component Testing', () => {
  test('should render create New Ticket component with out crashing', () => {
    render(<CreateNewTicket />)
    expect(screen.getByText('New Ticket')).toBeInTheDocument()
  })
})
