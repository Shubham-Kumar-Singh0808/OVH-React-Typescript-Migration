import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CompaniesList from './CompaniesList'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockCompaniesListTotalInfo } from '../../../test/data/CompaniesData'

describe('Companies List without data', () => {
  beforeEach(() => {
    render(<CompaniesList />, {
      preloadedState: {
        companiesList: {
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          companiesListResponseDetails: mockCompaniesListTotalInfo.list,
          companiesListData: mockCompaniesListTotalInfo.list,
        },
      },
    })
  })
  test('should be able to render  Companies List Title', () => {
    expect(screen.getByText('Companies List')).toBeInTheDocument()
  })
  test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', () => {
    const searchInput = screen.getByTestId('searchField')
    userEvent.type(searchInput, 'Admin  Rbt')
    userEvent.click(screen.getByTestId('multi-search-btn'))
  })
  test('should select selectTechnology Name', () => {
    const selectTechnology = screen.getByTestId('selectTechnology')
    userEvent.selectOptions(selectTechnology, ['ReactJs'])
    expect(selectTechnology).toHaveValue('53')
  })
})
