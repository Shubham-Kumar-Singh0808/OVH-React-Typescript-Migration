import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import CertificationsTable from './CertificationsTable'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { mockCertificates } from '../../../../test/data/certificationListData'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Category List Table Testing', () => {
  test('should render No Records Found if certificates table is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CertificationsTable />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records Found')).toBeInTheDocument()
    })
  })
  test('should render table with data without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CertificationsTable />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expect(
        screen.getByText('Total Records: ' + mockCertificates.length),
      ).toHaveLength(2)
    })
  })
})
