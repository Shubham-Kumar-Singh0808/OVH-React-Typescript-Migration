import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CompaniesList from './CompaniesList'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockGetEmpCountries,
  mockGetTechnology,
} from '../../../test/data/candidateListData'
import { CompaniesListResponse } from '../../../types/Recruitment/CompaniesList/CompaniesListTypes'

describe('candidate List without data', () => {
  beforeEach(() => {
    render(<CompaniesList />, {
      preloadedState: {
        companiesList: {
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          companiesListResponseDetails: {} as CompaniesListResponse,
          companiesListData: [],
          getAllTechnology: mockGetTechnology,
        },
      },
    })
  })
  test('should be able to render  Candidate List Title', () => {
    expect(screen.getByText('Candidate List')).toBeInTheDocument()
  })
  test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', () => {
    const searchInput = screen.getByTestId('searchField')
    userEvent.type(searchInput, 'Admin  Rbt')
    userEvent.click(screen.getByTestId('multi-search-btn'))
  })
  test('should select selectStatus Name', () => {
    const selectStatus = screen.getByTestId('selectStatus')
    userEvent.selectOptions(selectStatus, ['All'])
    expect(selectStatus).toHaveValue('ALL')
  })
  test('should select selectTechnology Name', () => {
    const selectTechnology = screen.getByTestId('selectTechnology')
    userEvent.selectOptions(selectTechnology, ['ReactJs'])
    expect(selectTechnology).toHaveValue('53')
  })
  test('should select selectCountry Name', () => {
    const selectCountry = screen.getByTestId('selectCountry')
    userEvent.selectOptions(selectCountry, ['AUSTRALIA'])
    expect(selectCountry).toHaveValue('1')
  })
})
