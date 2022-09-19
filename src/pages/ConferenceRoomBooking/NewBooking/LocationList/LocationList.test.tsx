import '@testing-library/jest-dom'
import React from 'react'
import { cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LocationList from './LocationList'
import { render, screen } from '../../../../test/testUtils'
import { mockLocationNames } from '../../../../test/data/addLocationListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

describe('Add Location List without data', () => {
  beforeEach(() => {
    render(<LocationList />, {
      preloadedState: {
        addLocationList: {
          meetingLocations: mockLocationNames,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should able to select values for options for respective select element', () => {
    const location = screen.getByTestId('locationName')
    userEvent.type(location, 'testing')
    expect(location).toHaveValue('testing')

    const addBtnElement = screen.getByRole('button', { name: 'Add' })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })
  test('should display error message, when user enters already existing location', async () => {
    const inputElement = screen.getByTestId('locationName')
    userEvent.type(inputElement, 'Skype')
    await waitFor(() => {
      // const errorMsg = screen.getByTestId('LocationNameAlreadyExist')
      expect(
        screen.getByText('Location name already exist'),
      ).toBeInTheDocument()
    })
  })
})

describe('Add Location List without data', () => {
  beforeEach(() => {
    render(<LocationList />)
  })
  test('should be able to render  Location List  Title', () => {
    expect(screen.getByText('Location List')).toBeInTheDocument()
  })

  test('should render Add button as disabled  initially', () => {
    expect(screen.getByTestId('designationButton')).toBeDisabled()
  })
})
