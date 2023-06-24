import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AssetHistory from './AssetTimelineHistory'
import { render, screen, fireEvent, cleanup } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'
import { ManufacturerList } from '../../../../types/Assets/ManufacturerList/ManufacturerType'

const mockSetTogglePage = jest.fn()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AssetHistory setToggle={mockSetTogglePage} />
  </div>
)

describe('Asset Timeline History Table without data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        assetList: {
          asset: [],
          isLoading: ApiLoadingState.idle,
          manufacturerList: {} as ManufacturerList,
          allAssetList: [],
          assetHistoryList: [],
          listSize: 0,
          currentPage: 1,
          pageSize: 20,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Asset timeline back button', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should render click on back button ', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(1)
  })
  test('updates search input value on change', () => {
    const searchInput = screen.getByTestId('multi-search-btn')

    fireEvent.change(searchInput, { target: { value: 'search input value' } })
  })
})
describe('Asset Timeline History Component Testing', () => {
  test('should render Asset Timeline History component without data', () => {
    render(toRender, {
      preloadedState: {},
    })
    expect(screen.getByText('Asset History')).toBeInTheDocument()
  })

  test('renders search input and search button', () => {
    render(toRender, {
      preloadedState: {},
    })
    const searchInput = screen.getByTestId('searchField')
    const searchButton = screen.getByTestId('multi-search-btn')

    expect(searchInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  })

  test('updates search input value on change', () => {
    render(toRender, {
      preloadedState: {},
    })
    const searchInput = screen.getByTestId('searchField')

    fireEvent.change(searchInput, { target: { value: 'search input' } })
  })
})
