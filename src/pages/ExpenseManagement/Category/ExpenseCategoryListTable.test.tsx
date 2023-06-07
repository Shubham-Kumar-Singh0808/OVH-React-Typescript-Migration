import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ExpenseCategoryListTable from './ExpenseCategoryListTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockExpenseCategory } from '../../../test/data/expenseCategoryData'

describe('Expense Category List Table without data', () => {
  beforeEach(() => {
    render(<ExpenseCategoryListTable userAccess={undefined} />, {
      preloadedState: {
        addLocationList: {
          getAllCategory: mockExpenseCategory,
          isLoading: ApiLoadingState.succeeded,
          currentPage: 1,
          pageSize: 20,
          error: null,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render expense category list table component with data', () => {
    expect(
      screen.getByText('test adding exactly btn fyhrfh'),
    ).toBeInTheDocument()
    expect(screen.getByText('Jothika Goru')).toBeInTheDocument()
    expect(screen.getByText('Srikath Kotapati')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('kytsaoduyosdaf')).toBeInTheDocument()
    expect(screen.getByText('Category TEsting')).toBeInTheDocument()
  })
  //   test('should be able to click delete button element', () => {
  //     const deleteBtnElement = screen.getByTestId('btn-categoryDelete10')
  //     expect(deleteBtnElement).toBeInTheDocument()
  //     userEvent.click(deleteBtnElement)
  //     const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
  //     userEvent.click(modalConfirmBtn)
  //     expect(modalConfirmBtn).toBeInTheDocument()
  //   })
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
