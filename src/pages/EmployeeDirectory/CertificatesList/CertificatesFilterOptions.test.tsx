import '@testing-library/jest-dom'

import { render, screen } from '../../../test/testUtils'

import CertificatesFilterOptions from './CertificatesFilterOptions'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('List Options Component Testing', () => {
  test('should render Personal info tab component with out crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CertificatesFilterOptions
          selectTechnology={'.Net'}
          setSelectTechnology={jest.fn()}
          setFilterByTechnology={jest.fn()}
          setFilterByCertificate={jest.fn()}
          setMultiSearchValue={jest.fn()}
          filterByTechnology={'.Net'}
          filterByCertificate={'MVC Certificate'}
          multiSearchValue={'Java'}
        />
      </ReduxProvider>,
    )
  })
})
