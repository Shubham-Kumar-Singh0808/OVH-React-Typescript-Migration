import '@testing-library/jest-dom'

import React from 'react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import DesignationReportFilter from './DesignationReportFilter'
import { render, screen } from '../../../../test/testUtils'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Employee Designation Report Filter Component Testing', () => {
  // eslint-disable-next-line require-await
  test('should render employee designation report filter component without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <DesignationReportFilter
          designation={'Software Engineer'}
          setDesignation={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(screen.getByText('Designation :')).toBeInTheDocument()
    expect(screen.getByTestId('designation')).toBeInTheDocument()
  })
})
