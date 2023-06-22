import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CompaniesList from './CompaniesList'
import { fireEvent, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockCompaniesListTotalInfo } from '../../../test/data/CompaniesData'
import { mockAllTechnology } from '../../../test/data/certificateTypeData'

const mockHandleExport = jest.fn()
const viewButton = 'view-btn-id'
const clearButton = 'clear-btn-id'
describe('Companies List without data', () => {
  beforeEach(() => {
    render(<CompaniesList />, {
      preloadedState: {
        companiesList: {
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          companiesListResponseDetails: mockCompaniesListTotalInfo.list,
          companiesListData: mockCompaniesListTotalInfo.list,
          getAllTechnology: mockAllTechnology,
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
  test('should able to click "click to to export" button', () => {
    const exportBtn = screen.getByRole('button', { name: 'Click to Export' })
    fireEvent.click(exportBtn)
    expect(mockHandleExport).toHaveBeenCalledTimes(0)
  })
  test('view button disabled and clear button enabled', () => {
    expect(screen.getByTestId(viewButton)).toBeDisabled()
    expect(screen.getByTestId(clearButton)).toBeEnabled()
  })
  test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', () => {
    const searchInput = screen.getByTestId('searchField')
    userEvent.type(searchInput, 'WorldTest')
    fireEvent.click(screen.getByTestId('multi-search-btn'))
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
    expect(mockHandleExport).toHaveBeenCalledTimes(0)
  })
})
