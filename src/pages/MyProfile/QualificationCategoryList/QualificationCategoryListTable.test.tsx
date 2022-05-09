import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { mockQualificationCategories } from '../../../test/data/qualificationCategoryListData'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'
import QualificationCategoryListTable from './QualificationCategoryListTable'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockQualificationCategories[i].qualificationName),
    ).toBeInTheDocument()
  }
}

describe('Qualification Detail List Table Testing', () => {
  test('should render No data to display if Qualification Categories is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <QualificationCategoryListTable />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No data to display')).toBeInTheDocument()
    })
  })
  test('should render table with data without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <QualificationCategoryListTable />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expectPageSizeToBeRendered(20)
      expect(
        screen.getByText(
          'Total Records: ' + mockQualificationCategories.length,
        ),
      ).toBeInTheDocument()
    })
  })
})
