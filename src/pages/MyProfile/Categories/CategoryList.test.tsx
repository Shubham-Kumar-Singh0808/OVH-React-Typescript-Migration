import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import CategoryListTable from './CategoryListTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockCategories } from '../../../test/data/categoryListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <CategoryListTable />
  </div>
)

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockCategories[i].categoryType)).toBeInTheDocument()
  }
}

describe('Category List Table Component Testing', () => {
  test('should render Category List Tableb component with out crashing', () => {
    render(toRender, {
      preloadedState: {
        category: {
          categories: mockCategories,
          listSize: 45,
        },
      },
    })

    expectPageSizeToBeRendered(20)

    const deleteBtn = screen.getByTestId('category-delete-btn0')
    userEvent.click(deleteBtn)

    expect(screen.getByText('Delete Category'))
  })
})

describe('Tracker List Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should render the table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
  })
})

describe('Add Tracker List Table without data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        category: {
          categories: mockCategories,
          listSize: 45,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render with data ', () => {
    expect(screen.getByText('Testing')).toBeInTheDocument()
  })
  test('should render number of records', () => {
    expect(screen.getByText('Total Records: 40')).toBeInTheDocument()
  })
  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
})
