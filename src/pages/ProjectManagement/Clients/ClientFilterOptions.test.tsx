import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import ClientFilterOptions from './ClientFilterOptions'
import { render, screen, waitFor } from '../../../test/testUtils'

const mockSetSelectedFunction = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ClientFilterOptions
      currentPage={1}
      pageSize={20}
      setCurrentPage={mockSetSelectedFunction}
      setPageSize={mockSetSelectedFunction}
    />
  </div>
)
describe('Client Filter Options Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should render all status filter', () => {
    const allStatus = screen.findByTestId('allClientsStatus')
    expect(allStatus).toBeTruthy()
  })
  test('should render active status filter', () => {
    const activeStatus = screen.findByTestId('activeClientsStatus')
    expect(activeStatus).toBeTruthy()
  })
  test('should render inactive status filter', () => {
    const inactiveStatus = screen.findByTestId('inactiveClientsStatus')
    expect(inactiveStatus).toBeTruthy()
  })
  test('should render search input field', () => {
    const searchInput = screen.getByPlaceholderText('Search here')
    expect(searchInput).toBeTruthy()
  })
  test('should render search button', () => {
    const searchBtn = screen.findByTestId('search-button')
    expect(searchBtn).toBeTruthy()
  })
  test('Client Filter Options component with value that should render values based on radio button status change', async () => {
    const activeRadio = screen.getByRole('radio', {
      name: 'Active',
    }) as HTMLInputElement
    expect(activeRadio.checked).toEqual(true)

    const allRadio = screen.getByRole('radio', {
      name: 'All',
    }) as HTMLInputElement

    const searchInput = screen.getByPlaceholderText('Search here')
    expect(searchInput).toBeInTheDocument()
    userEvent.type(searchInput, 'test')
    expect(searchInput).toHaveValue('test')
    const searchBtn = screen.getByTestId('search-button')
    userEvent.click(searchBtn)
    expect(searchBtn).toBeInTheDocument()

    await waitFor(() => {
      userEvent.click(allRadio)
      expect(activeRadio.checked).toEqual(false)
      expect(allRadio.checked).toEqual(true)
    })
  })
})
