/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/named */
// Todd: remove eslint and fix error
// Todo: remove eslint and fix all the errors
import '@testing-library/jest-dom'
import { prettyDOM, render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CategoryList from './CategoryList'
import { mockCategories } from '../../../test/data/categoryListData'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockCategories[i].categoryType)).toBeInTheDocument()
  }
}

describe('Category List Table Testing', () => {
  test('should render no data to display if categories is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CategoryList
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records Found')).toBeInTheDocument()
    })
  })

  test('should render table with data without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CategoryList
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expectPageSizeToBeRendered(20)
      expect(
        screen.getByText('Total Records: ' + mockCategories.length),
      ).toBeInTheDocument()
    })
  })

  test('should render correct number of page records', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CategoryList
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )

    await waitFor(() => {
      // 21 including the heading
      expect(screen.getAllByRole('row')).toHaveLength(21)
    })
  })

  test('should render correct number of 40 page records', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CategoryList
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(true)

      // 41 including the heading
      expect(screen.getAllByRole('row')).toHaveLength(41)
    })
  })

  test('should render first page data only', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CategoryList
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expect(screen.getByRole('rowheader', { name: '20' })).toBeInTheDocument()
      expect(screen.queryByRole('rowheader', { name: '21' })).toBeNull()
    })
  })

  test('should disable first and prev in pagination if first page', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CategoryList
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
})
