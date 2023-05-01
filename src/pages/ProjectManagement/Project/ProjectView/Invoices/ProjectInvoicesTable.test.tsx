import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectInvoicesTable from './ProjectInvoicesTable'
import { mockInvoicesList } from '../../../../../test/data/projectInvoicesData'
import { render, screen } from '../../../../../test/testUtils'

describe('ProjectInvoicesTable component with data', () => {
  beforeEach(() => {
    render(<ProjectInvoicesTable />, {
      preloadedState: {
        projectInvoices: {
          invoicesList: mockInvoicesList,
        },
      },
    })
  })
  test('should render with data ', () => {
    expect(screen.getByText('JXT-UI Integration May 2019')).toBeInTheDocument()
    expect(screen.getByText('100.0%')).toBeInTheDocument()
    expect(screen.getByText('0.0%')).toBeInTheDocument()
  })
  test('should open modal when clicking on milestone name link', () => {
    const linkElement = screen.getByTestId('title-model')
    userEvent.click(linkElement)
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })
})
