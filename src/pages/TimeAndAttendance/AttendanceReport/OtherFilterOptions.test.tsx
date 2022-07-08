import '@testing-library/jest-dom'
import React from 'react'
import OtherFilterOptions from './OtherFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'

describe('Other Filter Options Component Testing', () => {
  test('should render other filter options component with out crashing', () => {
    render(
      <OtherFilterOptions
        setFilterByEmployeeStatus={jest.fn()}
        setFilterByDate={jest.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument()
  })
  test('should render other filter options component with out crashing', async () => {
    render(
      <OtherFilterOptions
        setFilterByEmployeeStatus={jest.fn()}
        setFilterByDate={jest.fn()}
      />,
    )
    const datePicker = screen.getByPlaceholderText('mm/yyyy')
    fireEvent.mouseDown(datePicker)
    fireEvent.change(datePicker, { target: { value: '5-2021' } })
    const radio = screen.getByLabelText('Active')
    fireEvent.change(radio, { target: { value: 'Active' } })
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'View' })).not.toBeEnabled()
      expect(screen.getByRole('button', { name: 'Clear' })).not.toBeEnabled()
    })
  })
})
