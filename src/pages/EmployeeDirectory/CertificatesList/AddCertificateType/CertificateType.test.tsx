import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import CertificateType from './CertificateType'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { mockCertificateType } from '../../../../test/data/certificateTypeData'
import stateStore from '../../../../stateStore'
import CertificateTypeTable from './CertificateTypeTable'
import { reduxServices } from '../../../../reducers/reduxServices'
import userEvent from '@testing-library/user-event'

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
      screen.queryByText(mockCertificateType[i].certificateType),
    ).toBeInTheDocument()
  }
}
describe('CertificateType Table Testing', () => {
  test('should render no data to display if table is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CertificateType />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.queryByText('No data to display')).toBeInTheDocument()
    })
  })

  test('should render table with data without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CertificateTypeTable />
      </ReduxProvider>,
    )
    await stateStore.dispatch(
      reduxServices.certificateType.getCertificateTypeList(),
    )
  })
})
