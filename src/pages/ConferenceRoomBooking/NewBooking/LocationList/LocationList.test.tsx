import '@testing-library/jest-dom'
import React from 'react'
import { cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LocationList from './LocationList'
import { render, screen } from '../../../../test/testUtils'
import { mockLocationNames } from '../../../../test/data/addLocationListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const mockSetToggle = jest.fn()
describe('Add Location List without data', () => {
  beforeEach(() => {
    render(<LocationList setToggle={jest.fn()} />, {
      preloadedState: {
        addLocationList: {
          meetingLocations: mockLocationNames,
          isLoading: ApiLoadingState.succeeded,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should able to select values for options for respective select element', () => {
    const location = screen.getByTestId('LocationName')
    userEvent.type(location, 'testing')
    expect(location).toHaveValue('testing')

    const addBtnElement = screen.getByRole('button', { name: 'Add' })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })
  test('should display error message, when user enters already existing location', async () => {
    const inputElement = screen.getByTestId('LocationName')
    userEvent.type(inputElement, 'Skype')
    await waitFor(() => {
      expect(
        screen.getByText('Location name already exist'),
      ).toBeInTheDocument()
    })
  })
})

describe('Add Location List without data', () => {
  beforeEach(() => {
    render(<LocationList setToggle={jest.fn()} />, {
      preloadedState: {
        addLocationList: {
          meetingLocations: mockLocationNames,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should be able to render  Location List  Title', () => {
    expect(screen.getByText('Location List')).toBeInTheDocument()
  })

  test('should render Add button as disabled  initially', () => {
    expect(screen.getByTestId('designationButton')).toBeDisabled()
  })
  test('should render click on back button', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
  })
})
