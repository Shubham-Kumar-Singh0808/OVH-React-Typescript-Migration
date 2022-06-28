import '@testing-library/jest-dom'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CertificatesFilterOptions from './CertificatesFilterOptions'
import stateStore from '../../../stateStore'
import { ReduxProvider } from '../../../components/Helper'
import { render, screen } from '../../../test/testUtils'

describe('Certificates Filter Options Component Testing', () => {
  test('should render certificates filter options component with out crashing', async () => {
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
          setIsAccordionItemShow={jest.fn}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('view button should disable if the technology select box does not have value', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CertificatesFilterOptions
          selectTechnology={''}
          setSelectTechnology={jest.fn()}
          setFilterByTechnology={jest.fn()}
          setFilterByCertificate={jest.fn()}
          setMultiSearchValue={jest.fn()}
          filterByTechnology={''}
          filterByCertificate={''}
          multiSearchValue={''}
          setIsAccordionItemShow={jest.fn}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'View' })).not.toBeEnabled()
  })
  test('view button should enable only if the technology select box has a value', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CertificatesFilterOptions
          selectTechnology={'.Net'}
          setSelectTechnology={jest.fn()}
          setFilterByTechnology={jest.fn()}
          setFilterByCertificate={jest.fn()}
          setMultiSearchValue={jest.fn()}
          filterByTechnology={'.Net'}
          filterByCertificate={'.Net'}
          multiSearchValue={''}
          setIsAccordionItemShow={jest.fn}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'View' })).toBeEnabled()
  })
  test('multi search button should enable only if we enter the value', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <CertificatesFilterOptions
          selectTechnology={'.Net'}
          setSelectTechnology={jest.fn()}
          setFilterByTechnology={jest.fn()}
          setFilterByCertificate={jest.fn()}
          setMultiSearchValue={jest.fn()}
          filterByTechnology={'.Net'}
          filterByCertificate={'.Net'}
          multiSearchValue={''}
          setIsAccordionItemShow={jest.fn}
        />
      </ReduxProvider>,
    )
    expect(screen.getByTestId('multi-search-btn')).not.toBeEnabled()
    userEvent.type(screen.getByPlaceholderText('Multiple Search'), 'Java')
    expect(screen.getByTestId('multi-search-btn')).toBeEnabled()
  })
})
