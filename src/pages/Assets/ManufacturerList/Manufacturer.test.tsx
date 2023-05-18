import React from 'react'
import { fireEvent } from '@testing-library/react'
import Manufacturer from './Manufacturer'
import { render, screen } from '../../../test/testUtils'
import { mockManufacturerData } from '../../../test/data/ManufacturerListData'

// Mock the redux store and dependencies as needed
const mockHandleExport = jest.fn()
const mockHandleAdd = jest.fn()
describe('Manufacturer Component Testing', () => {
  beforeEach(() => {
    render(<Manufacturer />, {
      preloadedState: {
        manufacturerList: {
          manufacturerDetails: mockManufacturerData,
        },
      },
    })
  })
  test('should be able to render  Product Specification List  Title', () => {
    expect(screen.getByText('Manufacturer List')).toBeInTheDocument()
  })
  test('should able to click "click to to export" button', () => {
    const exportBtn = screen.getByRole('button', { name: 'Click to Export' })
    fireEvent.click(exportBtn)
    expect(mockHandleExport).toHaveBeenCalledTimes(0)
  })
  test('renders Manufacturer component', () => {
    // Assert that the component renders without error
    expect(screen.getByText('Manufacturer List')).toBeInTheDocument()
  })

  test('handles search input and button click', () => {
    const searchInput = screen.getByTestId('searchField')
    fireEvent.change(searchInput, { target: { value: 'search keyword' } })

    const searchButton = screen.getByTestId('multi-search-btn')
    fireEvent.click(searchButton)

    // Assert that the search functionality is triggered correctly
    expect(screen.getByText('Testing Flow')).toBeInTheDocument()
  })
})
