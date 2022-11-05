import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CertificateTypeTable from './CertificateTypeTable'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { mockCertificateType } from '../../../../test/data/certificateTypeData'

describe('CertificateType Table Testing', () => {
  beforeEach(() => {
    render(<CertificateTypeTable />, {
      preloadedState: {
        certificateType: {
          certificateTypes: mockCertificateType,
        },
      },
    })
  })
  it('should render the "CertificateType Table"', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  it('should show the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Technology' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Certificate' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })
  test('should render delete button', () => {
    expect(screen.getByTestId('btn-delete2')).toHaveClass(
      'btn btn-danger btn-sm',
    )
  })
  test('should render correct number of page records', async () => {
    await waitFor(() => {
      //22 including the heading
      expect(screen.getAllByRole('row')).toHaveLength(21)
    })
  })
  test('should render correct number of 40 page records', () => {
    userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
    const pageSizeSelect = screen.getByRole('option', {
      name: '40',
    }) as HTMLOptionElement
    expect(pageSizeSelect.selected).toBe(true)

    // 41 including the heading
    expect(screen.getAllByRole('row')).toHaveLength(41)
  })

  test('should disable first and prev in pagination if first page', () => {
    expect(screen.getByText('« First')).toHaveAttribute('disabled')
    expect(screen.getByText('‹ Prev')).toHaveAttribute('disabled')
    expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
    expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
  })

  test('should disable last and next in pagination if last page', () => {
    userEvent.click(screen.getByText('Next ›', { exact: true }))

    expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
    expect(screen.getByText('‹ Prev')).not.toHaveAttribute('disabled')
    expect(screen.getByText('Next ›')).toHaveAttribute('disabled')
    expect(screen.getByText('Last »')).toHaveAttribute('disabled')
  })
  jest.retryTimes(3)
  it('should render Delete modal on clicking delete button from Actions', async () => {
    const deleteButtonElement = screen.getByTestId('btn-delete1')
    userEvent.click(deleteButtonElement)
    await waitFor(() => {
      expect(screen.getByText('Delete Certificate Type')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })
  it('should close the modal on clicking No button from the popup', async () => {
    const deleteButtonElement = screen.getByTestId('btn-delete6')
    userEvent.click(deleteButtonElement)
    const yesButtonElement = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(yesButtonElement)
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(21)
    })
  })
})
