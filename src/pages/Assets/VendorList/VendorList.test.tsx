import '@testing-library/jest-dom'
import React from 'react'
import VendorList from './VendorList'
import { fireEvent, render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <VendorList />
  </div>
)

describe('Vendor List Component Testing', () => {
  test('should render Vendor List component without crashing', () => {
    render(toRender, {
      preloadedState: {},
    })
    expect(screen.getByText('Vendor List')).toBeInTheDocument()
  })

  test('renders search input and search button', () => {
    render(toRender, {
      preloadedState: {},
    })
    const searchInput = screen.getByTestId('searchField')
    const searchButton = screen.getByTestId('multi-search-btn')

    expect(searchInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  })

  test('updates search input value on change', () => {
    render(toRender, {
      preloadedState: {},
    })
    const searchInput = screen.getByTestId('searchField')

    fireEvent.change(searchInput, { target: { value: 'search input' } })
  })
})
