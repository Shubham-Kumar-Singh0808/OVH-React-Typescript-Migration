import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import OPagination from './OPagination'
import { screen, render } from '../../test/testUtils'

describe('OPagination component', () => {
  describe('OPagination Component Testing..', () => {
    beforeEach(() => {
      render(
        <OPagination
          currentPage={0}
          pageSetter={jest.fn()}
          paginationRange={[]}
        />,
      )
    })

    test('should be able to render OPagination Component PaginationItems', () => {
      expect(screen.getByText('« First')).toBeInTheDocument()
      expect(screen.getByText('‹ Prev')).toBeInTheDocument()
      expect(screen.getByText('Next ›')).toBeInTheDocument()
      expect(screen.getByText('Last »')).toBeInTheDocument()
    })
  })

  describe('Should be able to perform Pagination', () => {
    beforeEach(() => {
      render(
        <OPagination
          currentPage={1}
          pageSetter={jest.fn()}
          paginationRange={[20]}
        />,
      )
    })

    test('Should be able to click First Page', () => {
      const firstPageElement = screen.getByTestId('first-page')
      userEvent.click(firstPageElement)
    })

    test('Should be able to click Next Page', () => {
      const nextPageElement = screen.getByTestId('next-page')
      userEvent.click(nextPageElement)
    })
    test('Should be able to click Previous Page', () => {
      const previousPageElement = screen.getByTestId('prev-page')
      userEvent.click(previousPageElement)
    })
    test('Should be able to click Previous Page', () => {
      const lastPageElement = screen.getByTestId('last-page')
      userEvent.click(lastPageElement)
    })
  })
})
