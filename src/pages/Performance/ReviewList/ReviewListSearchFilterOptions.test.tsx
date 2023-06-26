import '@testing-library/jest-dom'

import React from 'react'
import ReviewListSearchFilterOptions from './ReviewListSearchFilterOptions'
import { render, screen } from '../../../test/testUtils'

const mockSetSearchValue = jest.fn()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ReviewListSearchFilterOptions
      setSelectRadio={jest.fn()}
      selectRadio={'true'}
      searchValue={'sai'}
      setSearchValue={mockSetSearchValue}
      searchButtonOnKeyDown={jest.fn()}
      searchBtnHandler={jest.fn()}
      isChecked={false}
      setIsChecked={mockSetSearchValue}
    />
  </div>
)

describe('Review List Search Filter Options Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should render Review List search filter options component with out crashing', () => {
    expect(screen.getByTestId('searchByEmployeeName')).toBeInTheDocument()
    expect(screen.getByTestId('searchByManagerName')).toBeInTheDocument()
    expect(screen.getByTestId('multi-search-input')).toBeInTheDocument()
    expect(screen.getByTestId('multi-search-btn')).toBeInTheDocument()
  })
})
