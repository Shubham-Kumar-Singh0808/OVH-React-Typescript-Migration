import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectInvoicesEntryTable from './ProjectInvoicesEntryTable'
import { mockInvoicesOfMilestoneList } from '../../../../../test/data/projectInvoicesData'
import { render, screen } from '../../../../../test/testUtils'

describe('ProjectInvoicesEntryTable component with data', () => {
  beforeEach(() => {
    render(<ProjectInvoicesEntryTable />, {
      preloadedState: {
        projectInvoices: {
          invoicesOfMilestoneList: mockInvoicesOfMilestoneList,
        },
      },
    })
  })
  test('should render with data ', () => {
    expect(screen.getByText('RB0519IN203006')).toBeInTheDocument()
    expect(screen.getByText('RBIN19101')).toBeInTheDocument()
    expect(screen.getByText('OVER DUE')).toBeInTheDocument()
    expect(screen.getByText('JXT-UI Integration May 2019')).toBeInTheDocument()
    expect(screen.getByText('06/05/2019')).toBeInTheDocument()
  })
  test('should open modal when clicking on invoicNumber link', () => {
    const linkElement = screen.getByTestId('invoice-test')
    userEvent.click(linkElement)
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })
  test('should open modal when clicking on invoiceNumber link', () => {
    const linkElement = screen.getByTestId('milestone-name')
    userEvent.click(linkElement)
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })
})
