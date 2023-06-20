import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CandidateList from './CandidateList'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  country,
  CandidateLists,
} from '../../../types/Recruitment/CandidateList/CandidateListTypes'
import {
  mockGetEmpCountries,
  mockGetTechnology,
} from '../../../test/data/candidateListData'

describe('candidate List without data', () => {
  beforeEach(() => {
    render(<CandidateList />, {
      preloadedState: {
        candidateList: {
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          candidateDetails: {} as CandidateLists,
          allCandidateDetails: [],
          allCountryDetails: {} as country,
          empCountries: mockGetEmpCountries,
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
