import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CandidateList from './CandidateList'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  country,
  CandidateLists,
} from '../../../types/Recruitment/CandidateList/CandidateListTypes'
import {
  mockGetEmpCountries,
  mockGetTechnology,
} from '../../../test/data/candidateListData'

const mockSetTicketApprovalParams = jest.fn()

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
    expect(selectTechnology).toHaveValue('ReactJs')
  })
  test('should select selectCountry Name', () => {
    const selectCountry = screen.getByTestId('selectCountry')
    userEvent.selectOptions(selectCountry, ['AUSTRALIA'])
    expect(selectCountry).toHaveValue('1')
  })
  test('should render search input', () => {
    const searchField = screen.getByTestId('searchField')
    userEvent.type(searchField, 'testing')
    expect(searchField).toHaveValue('testing')
    fireEvent.keyDown(searchField, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })
    expect(mockSetTicketApprovalParams).toHaveBeenCalledTimes(0)
  })
  test('should render  Configuration  screen and Allocate button without crashing', () => {
    const Button = screen.getByTestId('view-btn')
    expect(Button).toBeInTheDocument()
    userEvent.click(Button)
    expect(mockSetTicketApprovalParams).toHaveBeenCalledTimes(0)
  })
  test('should render on every input of AllocateEmployee', async () => {
    const selectTechnology = screen.getByTestId('selectTechnology')
    userEvent.selectOptions(selectTechnology, ['ReactJs'])
    expect(selectTechnology).toHaveValue('ReactJs')

    const selectCountry = screen.getByTestId('selectCountry')
    userEvent.selectOptions(selectCountry, ['AUSTRALIA'])
    expect(selectCountry).toHaveValue('1')

    const selectStatus = screen.getByTestId('selectStatus')
    userEvent.selectOptions(selectStatus, ['All'])
    expect(selectStatus).toHaveValue('ALL')

    userEvent.click(screen.getByTestId('clear-btn'))
    await waitFor(() => {
      expect(selectStatus).toHaveValue('')
      expect(selectCountry).toHaveValue('')
      expect(selectTechnology).toHaveValue('')
    })
  })
})
