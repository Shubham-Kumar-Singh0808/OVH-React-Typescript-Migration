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
      screen.getByText(mockCertificateType[i].certificateType),
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
      expect(screen.getByText('No data to display')).toBeInTheDocument()
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

  test('should render table records length', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CertificateTypeTable />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expectPageSizeToBeRendered(20)
      expect(
        screen.getByText('Total Records: ' + mockCertificateType.length),
      ).toBeInTheDocument()
    })
  })

  //   test('should render second page data only', async () => {
  //     render(
  //       <ReduxProvider reduxStore={stateStore}>
  //         <CategoryList
  //           headerTitle={''}
  //           confirmButtonText={''}
  //           backButtonHandler={function (): void {
  //             throw new Error('Function not implemented.')
  //           }}
  //         />
  //       </ReduxProvider>,
  //     )

  //     await waitFor(() => {
  //       userEvent.click(screen.getByText('Next >', { exact: true }))

  //       expect(screen.getByRole('rowheader', { name: '40' })).toBeInTheDocument()
  //       expect(screen.queryByRole('rowheader', { name: '41' })).toBeNull()
  //     })
  //   })

  //   test('should disable first and prev in pagination if first page', async () => {
  //     render(
  //       <ReduxProvider reduxStore={stateStore}>
  //         <CategoryList
  //           headerTitle={''}
  //           confirmButtonText={''}
  //           backButtonHandler={function (): void {
  //             throw new Error('Function not implemented.')
  //           }}
  //         />
  //       </ReduxProvider>,
  //     )

  //     await waitFor(() => {
  //       expect(screen.getByText('« First')).toHaveAttribute('disabled')
  //       expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
  //       expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
  //       expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
  //     })
  //   })

  //   test('should disable last and next in pagination if last page', async () => {
  //     render(
  //       <ReduxProvider reduxStore={stateStore}>
  //         <CategoryList
  //           headerTitle={''}
  //           confirmButtonText={''}
  //           backButtonHandler={function (): void {
  //             throw new Error('Function not implemented.')
  //           }}
  //         />
  //       </ReduxProvider>,
  //     )

  //     await waitFor(() => {
  //       userEvent.click(screen.getByText('Next >', { exact: true }))

  //       expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
  //       expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
  //       expect(screen.getByText('Next >')).toHaveAttribute('disabled')
  //       expect(screen.getByText('Last »')).toHaveAttribute('disabled')
  //     })
  //   })
})
