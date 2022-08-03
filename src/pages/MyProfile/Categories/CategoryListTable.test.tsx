import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import CategoryListTable from './CategoryListTable'
import { render, screen } from '../../../test/testUtils'
import { mockCategories } from '../../../test/data/categoryListData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockCategories[i].categoryType)).toBeInTheDocument()
  }
}

describe('Category List Table Component Testing', () => {
  test('should render Category List Tableb component with out crashing', () => {
    render(<CategoryListTable />, {
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
