import '@testing-library/jest-dom'
import React from 'react'
import { cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddLocationList from './AddLocationList'
import { render, screen } from '../../../../test/testUtils'
import { mockLocationNames } from '../../../../test/data/addLocationListData'

describe('Add Location List without data', () => {
  beforeEach(() => {
    render(<AddLocationList />, {
      preloadedState: {
        addLocationList: {
          meetingLocations: mockLocationNames,
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
})
describe('Add Location List without data', () => {
  beforeEach(() => {
    render(<AddLocationList />)
  })
  test('should be able to render  Location List  Title', () => {
    expect(screen.getByText('Location List')).toBeInTheDocument()
  })

  test('should render Add button as disabled  initially', () => {
    expect(screen.getByTestId('designationButton')).toBeDisabled()
  })
})
